const prisma = require("../config/prisma");

async function createBooking(data) {
    return await prisma.booking.create({
        data: {
            bookingCode: data.bookingCode,
            patientName: data.patientName,
            nik: data.nik,
            birthDate: data.birthDate,
            gender: data.gender,
            phone: data.phone,
            address: data.address,
            paymentMethod: data.paymentMethod,
            complaint: data.complaint,
            appointmentDate: data.appointmentDate,
            appointmentStartTime: data.appointmentStartTime,
            appointmentEndTime: data.appointmentEndTime,
            userId: data.userId,
            doctorId: data.doctorId,
            scheduleId: data.scheduleId,
            bookingStatus: "BOOKED"
        }
    });
}

async function getBookingsByUserId(userId) {
    return await prisma.booking.findMany({
        where: { userId: userId },
        include: {
            doctor: {
                include: {
                    specialization: true
                }
            },
            schedule: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

async function getBookingByCode(bookingCode) {
    return await prisma.booking.findUnique({
        where: { bookingCode: bookingCode },
        include: {
            doctor: {
                include: {
                    specialization: true
                }
            },
            schedule: true,
            user: true
        }
    });
}

async function countBookingsBySchedule(scheduleId, date, time) {
    return await prisma.booking.count({
        where: {
            scheduleId: scheduleId,
            appointmentDate: date,
            appointmentStartTime: time,
            bookingStatus: {
                not: "COMPLETED" // Sesuaikan jika ada status cancelled
            }
        }
    });
}

module.exports = {
    createBooking,
    getBookingsByUserId,
    getBookingByCode,
    countBookingsBySchedule
};
