import { BookingHistoryRow } from "@/src/lib/types";

export function getUpcomingAppointment(bookings: BookingHistoryRow[], patientId: number) {
  const now = new Date();
  console.log("DATA:", bookings);
  return bookings
    .filter(
      (b) =>
        b.patientId === patientId &&
        b.bookingStatus === "BOOKED" &&
        new Date(b.appointmentDate + "T" + b.appointmentStartTime) >= now
    )
    .sort(
      (a, b) =>
        new Date(a.appointmentDate + "T" + a.appointmentStartTime).getTime() -
        new Date(b.appointmentDate + "T" + b.appointmentStartTime).getTime()
    )[0];
}

export function getActiveAppointmentsCount(bookings: BookingHistoryRow[],patientId: number) {
  const now = new Date();
  return bookings.filter(
    (b) => 
      b.patientId === patientId && 
      b.bookingStatus === "BOOKED" &&
      new Date(b.appointmentDate + "T" + b.appointmentStartTime) >= now
  ).length;
}
