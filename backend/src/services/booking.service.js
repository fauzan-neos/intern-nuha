const bookingRepository = require("../repositories/booking.repository");
const prisma = require("../config/prisma");

async function createBookingService(userId, bookingData) {
    // 1. Validasi Jadwal & Kuota
    const schedule = await prisma.doctorSchedule.findUnique({
        where: { id: bookingData.scheduleId }
    });

    if (!schedule || schedule.status === "OFF") {
        throw new Error("Jadwal dokter tidak tersedia");
    }

    // Pastikan tidak booking waktu yang sudah lewat untuk hari ini
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    if (bookingData.appointmentDate === todayStr) {
        const [slotHour] = bookingData.appointmentStartTime.split(':').map(Number);
        if (slotHour <= now.getHours()) {
            throw new Error("Waktu konsultasi sudah terlewati");
        }
    }

    const startHourNum = parseInt(schedule.start.split(":")[0]);
    const endHourNum = parseInt(schedule.end.split(":")[0]);

    // Cek jika jam yang dipilih adalah jam istirahat (12:00 - 13:00)
    const [bookingHour] = bookingData.appointmentStartTime.split(':').map(Number);
    if (bookingHour === 12) {
        throw new Error("Jam 12:00 - 13:00 adalah waktu istirahat");
    }

    // Hitung jam kerja efektif (dikurangi 1 jam istirahat jika rentang melewati jam 12)
    let workingHours = endHourNum - startHourNum;
    if (startHourNum <= 12 && endHourNum > 12) {
        workingHours -= 1;
    }

    const capacityPerSlot = Math.floor(schedule.maxPatient / workingHours);

    // Hitung slot yang sudah terisi
    const currentBooked = await bookingRepository.countBookingsBySchedule(
        bookingData.scheduleId,
        bookingData.appointmentDate,
        bookingData.appointmentStartTime
    );

    if (currentBooked >= capacityPerSlot) {
        throw new Error("Kuota untuk jam ini sudah penuh");
    }

    // 1. Ambil data dokter untuk mendapatkan employeeCode
    const doctor = await prisma.doctor.findUnique({
        where: { id: bookingData.doctorId }
    });

    // Cari booking terakhir untuk hari itu untuk menentukan sequence berikutnya
    const lastBooking = await prisma.booking.findFirst({
        where: {
            doctorId: bookingData.doctorId,
            appointmentDate: bookingData.appointmentDate
        },
        orderBy: {
            bookingCode: 'desc'
        }
    });

    let sequence = 1;
    if (lastBooking) {
        const lastCode = lastBooking.bookingCode;
        const lastSequence = parseInt(lastCode.split('-').pop());
        sequence = lastSequence + 1;
    }

    const paddedSequence = sequence.toString().padStart(3, '0');
    const bookingCode = `${doctor.employeeCode}-${paddedSequence}`;

    // 3. Simpan ke Database
    return await bookingRepository.createBooking({
        ...bookingData,
        userId,
        bookingCode
    });
}

async function getMyBookingsService(userId) {
    return await bookingRepository.getBookingsByUserId(userId);
}

async function getBookingDetailService(uuid) {
    const booking = await bookingRepository.getBookingByUuid(uuid);
    if (!booking) {
        throw new Error("Data booking tidak ditemukan");
    }
    return booking;
}

async function cancelBookingService(uuid, userId) {
    const booking = await bookingRepository.getBookingByUuid(uuid);
    if (!booking) {
        throw new Error("Data booking tidak ditemukan");
    }

    if (booking.userId !== userId) {
        throw new Error("Anda tidak memiliki akses untuk membatalkan booking ini");
    }

    if (booking.bookingStatus === "CANCELED") {
        throw new Error("Booking sudah dibatalkan sebelumnya");
    }

    if (booking.bookingStatus === "COMPLETED") {
        throw new Error("Booking yang sudah selesai tidak dapat dibatalkan");
    }

    return await bookingRepository.updateBookingStatus(uuid, "CANCELED");
}

async function generateAvailableSlots(doctorId, date, scheduleId) {
    const schedule = await prisma.doctorSchedule.findUnique({
        where: { id: parseInt(scheduleId) }
    });

    if (!schedule || schedule.doctorId !== doctorId || schedule.status === "OFF") {
        return [];
    }

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const isToday = date === todayStr;

    // Hitung slot (1 jam per pasien)
    const slots = [];
    const startHour = parseInt(schedule.start.split(":")[0]);
    const endHour = parseInt(schedule.end.split(":")[0]);
    
    // Hitung total jam kerja efektif untuk pembagi kapasitas
    let totalWorkingHours = endHour - startHour;
    const hasBreak = startHour < 12 && endHour > 13;
    if (hasBreak) {
        totalWorkingHours -= 1;
    }

    const capacityPerSlot = Math.floor(schedule.maxPatient / totalWorkingHours);

    for (let hour = startHour; hour < endHour; hour++) {
        // Skip jam istirahat 12:00 - 13:00
        if (hour === 12) continue;

        // Jika hari ini, jangan munculkan jam yang sudah lewat
        if (isToday && hour <= now.getHours()) continue;

        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        const endTimeString = `${(hour + 1).toString().padStart(2, '0')}:00`;
        
        // Cek berapa orang yang sudah booking di jam & tanggal ini
        const count = await prisma.booking.count({
            where: { 
                doctorId, 
                appointmentDate: date, 
                appointmentStartTime: timeString,
                bookingStatus: { not: "COMPLETED" } 
            }
        });
        
        slots.push({
            start: timeString,
            end: endTimeString,
            label: `${timeString} - ${endTimeString}`,
            remaining: Math.max(0, capacityPerSlot - count),
            date: date
        });
    }
    return slots;
}

function getDayName(date) {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[date.getDay()];
}



module.exports = {
    getDayName,
    generateAvailableSlots,
    createBookingService,
    getMyBookingsService,
    getBookingDetailService,
    cancelBookingService
};
