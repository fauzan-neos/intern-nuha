import { 
  DoctorSchedule, 
  Weekday, 
  UpcomingScheduleItem, 
  AppointmentSlot, 
  Booking, 
  BookingHistoryRow, 
  Doctor,
} from "../lib/types";

// 1. Konversi waktu (09:00 -> menit)
export function timeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

// 2. Konversi menit -> waktu (540 -> 09:00)
export function minutesToTime(minutes: number) {
  const hour = Math.floor(minutes / 60).toString().padStart(2, "0");
  const minute = (minutes % 60).toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

// 3. Mengubah jam (09:00) ke format 24 jam (tetap 09:00)
export function formatTimeRange(start: string, end: string) {
  return `${start} - ${end}`;
}

// 4. Menambah hari
export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

// 5. Format tanggal (YYYY-MM-DD)
export function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 6. Ambil jadwal 5 hari kedepan (Skip Hari Minggu)
export function getUpcomingSchedule(
  doctorSchedules: DoctorSchedule[] = [], 
  startDate = new Date()
): UpcomingScheduleItem[] {
  const weekdays: Weekday[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  // const weekdaysIndo: Record<Weekday, string> = {
  //   SUN: "Minggu",
  //   MON: "Senin",
  //   TUE: "Selasa",
  //   WED: "Rabu",
  //   THU: "Kamis",
  //   FRI: "Jumat",
  //   SAT: "Sabtu"
  // };

  const scheduleItems: UpcomingScheduleItem[] = [];
  let currentOffset = 0;

  while (scheduleItems.length < 5) {
    const date = addDays(startDate, currentOffset);
    const dayName = weekdays[date.getDay()];

    // Skip Hari Minggu
    if (dayName === "SUN") {
      currentOffset++;
      continue;
    }
    
    const schedule = doctorSchedules.find((item) => item.day === dayName);
    const status = schedule?.status || "OFF";
    const hasTime = status === "AVAILABLE" && schedule?.start && schedule?.end;

    scheduleItems.push({
      date: formatDateValue(date),
      day: dayName,
      dayLabel: currentOffset === 0 ? "Hari Ini" : date.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }),
      timeLabel: hasTime
        ? formatTimeRange(schedule.start!, schedule.end!)
        : (schedule?.note ?? "Tidak ada jadwal"),
      status,
      isToday: currentOffset === 0,
    });
    
    currentOffset++;
  }

  return scheduleItems;
}

// 7. Ambil slot appointment untuk tanggal tertentu
export function getAppointmentSlots(
  doctor: Doctor,
  date = new Date(),
  bookingHistories: Booking[] = []
): AppointmentSlot[] {
  const weekdays: Weekday[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const day = weekdays[date.getDay()];
  const dateValue = formatDateValue(date);
  const schedule = doctor.schedules?.find((item) => item.day === day);

  if (
    !schedule ||
    schedule.status !== "AVAILABLE" ||
    !schedule.start ||
    !schedule.end ||
    !schedule.maxPatient
  ) {
    return [];
  }

  const startHour = Math.floor(timeToMinutes(schedule.start) / 60);
  const endHour = Math.floor(timeToMinutes(schedule.end) / 60);

  // Hitung jam kerja efektif (skip jam 12)
  let workingHours = endHour - startHour;
  const hasBreak = startHour < 12 && endHour > 13;
  if (hasBreak) workingHours -= 1;

  if (workingHours <= 0) return [];

  const capacityPerSlot = Math.floor(schedule.maxPatient / workingHours);

  const now = new Date();
  const isToday = dateValue === formatDateValue(now);
  const currentHour = now.getHours();

  const slots: AppointmentSlot[] = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    // Skip jam istirahat 12:00 - 13:00
    if (hour === 12) continue;

    const slotStart = `${hour.toString().padStart(2, "0")}:00`;
    const slotEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;
    
    // Pengecekan apakah waktu sudah lewat (untuk hari ini)
    const isPast = isToday && hour <= currentHour;

    // Filter booking yang sudah ada
    const booked = bookingHistories.filter(
      (booking) =>
        booking.doctorId === doctor.id &&
        booking.appointmentDate === dateValue &&
        booking.appointmentStartTime === slotStart &&
        booking.bookingStatus === "BOOKED"
    ).length;

    // Jika sudah lewat, set remaining ke 0 agar disabled di UI
    const remaining = isPast ? 0 : Math.max(0, capacityPerSlot - booked);

    slots.push({
      date: dateValue,
      start: slotStart,
      end: slotEnd,
      label: formatTimeRange(slotStart, slotEnd),
      capacity: capacityPerSlot,
      booked,
      remaining,
    });
  }

  return slots;
}

export type AppointmentSession = {
  sessionName: "Sesi Pagi" | "Sesi Sore";
  timeRange: string;
  slots: AppointmentSlot[];
  totalRemaining: number;
  startTime: string; // Waktu awal sesi untuk disimpan di DB
  endTime?: string; // Opsional, bisa dihitung dari slot terakhir jika diperlukan
};

export function groupSlotsIntoSessions(slots: AppointmentSlot[]): AppointmentSession[] {
  const pagiSlots = slots.filter(s => parseInt(s.start) < 12);
  const soreSlots = slots.filter(s => parseInt(s.start) >= 13);

  const sessions: AppointmentSession[] = [];

  if (pagiSlots.length > 0) {
    sessions.push({
      sessionName: "Sesi Pagi",
      timeRange: `${pagiSlots[0].start} - 12:00`,
      slots: pagiSlots,
      totalRemaining: pagiSlots.reduce((acc, curr) => acc + curr.remaining, 0),
      startTime: pagiSlots[0].start
    });
  }

  if (soreSlots.length > 0) {
    const lastSlot = soreSlots[soreSlots.length - 1];
    sessions.push({
      sessionName: "Sesi Sore",
      timeRange: `${soreSlots[0].start} - ${lastSlot.end || (parseInt(lastSlot.start) + 1).toString().padStart(2, "0") + ":00"}`,
      slots: soreSlots,
      totalRemaining: soreSlots.reduce((acc, curr) => acc + curr.remaining, 0),
      startTime: soreSlots[0].start
    });
  }

  return sessions;
}

// 8. Format baris history booking
export function formatBookingHistoryRows(
  bookingHistories: Booking[],
  doctors: Doctor[]
): BookingHistoryRow[] {
  return bookingHistories.map((booking) => {
    const doctor = doctors.find((item) => item.id === booking.doctorId);
    
    return {
      ...booking,
      doctorName: doctor?.name ?? "Unknown Doctor",
      doctorImage: doctor?.image ?? "/doc_sarah.jpg",
      specialization: doctor?.specialization?.name ?? "General Medicine",
      appointmentEndTime: booking.appointmentEndTime,
      // Tampilkan sebagai range di UI jika dibutuhkan
      patientName: booking.patientName ?? "Patient Name",
      patientCode: booking.patientId == null ? "Pasien Baru" : `${booking.patientId}`,
      department: doctor?.department ?? booking.doctor?.department ?? `${doctor?.specialization?.name ?? "General"} Department`,
      room: doctor?.room ?? booking.doctor?.room ?? "Consultation Room",
      location: doctor?.location ?? booking.doctor?.location ?? "MedCare Main Clinic",
      instructions: (booking.instructions as unknown as string[]) ?? [
        "Datang 15 menit lebih awal untuk proses administrasi.",
        "Bawa kartu identitas dan dokumen pendukung.",
        "Bawa daftar obat yang sedang dikonsumsi.",
      ],
    };
  });
}

export const getAvailableDates = (schedules: DoctorSchedule[]) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const availableDates: {
    dateString: string;
    label: string;
    scheduleId: number;
  }[] = [];
  
  let currentOffset = 0;
  while (availableDates.length < 5 && currentOffset < 14) { // Cek maksimal 2 minggu kedepan
    const date = new Date();
    date.setDate(date.getDate() + currentOffset);
    const dayName = days[date.getDay()];
    
    // Skip Hari Minggu
    if (dayName === "SUN") {
      currentOffset++;
      continue;
    }

    // Cek apakah ada jadwal dokter untuk hari tersebut
    const hasSchedule = schedules.find(s => s.day === dayName && s.status === "AVAILABLE");
    if (hasSchedule) {
      availableDates.push({
        dateString: date.toISOString().split('T')[0],
        label: currentOffset === 0 ? "Hari Ini" : date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' }),
        scheduleId: hasSchedule.id
      });
    }
    currentOffset++;
  }
  return availableDates;
};