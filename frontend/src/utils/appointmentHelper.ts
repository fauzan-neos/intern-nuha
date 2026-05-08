import { 
    AppointmentSlot, 
    Booking, 
    Doctor, 
    Weekday, 
    AppointmentSession 
} from "../lib/types";
import { formatDateValue } from "./dateHelper";
import { formatTimeRange, timeToMinutes } from "./timeHelper";

// Ambil slot appointment untuk tanggal tertentu
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

export function groupSlotsIntoSessions(slots: AppointmentSlot[]): AppointmentSession[] {
  const pagiSlots = slots.filter(s => parseInt(s.start) < 12);
  const soreSlots = slots.filter(s => parseInt(s.start) >= 13);

  const sessions: AppointmentSession[] = [];

  if (pagiSlots.length > 0) {
    const lastPagiSlot = pagiSlots[pagiSlots.length - 1];
    sessions.push({
      sessionName: "Sesi Pagi",
      timeRange: `${pagiSlots[0].start} - ${lastPagiSlot.end}`,
      slots: pagiSlots,
      totalRemaining: pagiSlots.reduce((acc, curr) => acc + curr.remaining, 0),
      startTime: pagiSlots[0].start,
      endTime: lastPagiSlot.end
    });
  }

  if (soreSlots.length > 0) {
    const lastSoreSlot = soreSlots[soreSlots.length - 1];
    sessions.push({
      sessionName: "Sesi Sore",
      timeRange: `${soreSlots[0].start} - ${lastSoreSlot.end}`,
      slots: soreSlots,
      totalRemaining: soreSlots.reduce((acc, curr) => acc + curr.remaining, 0),
      startTime: soreSlots[0].start,
      endTime: lastSoreSlot.end
    });
  }

  return sessions;
}