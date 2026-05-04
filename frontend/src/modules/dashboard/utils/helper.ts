import { getBookingHistoryRows, hospitalUpdates, quickAccess } from "@/src/lib/dummy";

export function getUpcomingAppointment(patientId: number) {
  const now = new Date();
  console.log("DATA:", getBookingHistoryRows());
  return getBookingHistoryRows()
    .filter(
      (b) =>
        b.patientId === patientId &&
        b.status === "confirmed" &&
        new Date(b.appointmentDate + "T" + b.appointmentTime) >= now
    )
    .sort(
      (a, b) =>
        new Date(a.appointmentDate + "T" + a.appointmentTime).getTime() -
        new Date(b.appointmentDate + "T" + b.appointmentTime).getTime()
    )[0];
}

export function getActiveAppointmentsCount(patientId: number) {
  const now = new Date();
  return getBookingHistoryRows().filter(
    (b) => 
      b.patientId === patientId && 
      b.status === "confirmed" &&
      new Date(b.appointmentDate + "T" + b.appointmentTime) >= now
  ).length;
}

// console.log(getBookingHistoryRows());
// console.log(getUpcomingAppointment(1));
// console.log(getActiveAppointmentsCount(1));

export function getDashboardData(patientId: number, userName: string = "Patient") {
  return {
    user: { name: userName },
    upcomingAppointment: getUpcomingAppointment(patientId),
    stats: {
      activeAppointments: getActiveAppointmentsCount(patientId),
    },
    quickAccess: quickAccess,
    updates: hospitalUpdates,
  };
}