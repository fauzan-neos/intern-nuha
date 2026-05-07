"use client";

import { useQuery } from "@tanstack/react-query";
import Navbar from "./../components/navbar";
import UpcomingAppointment from "./components/upcomingAppointment";
import Stats from "./components/stats";
import QuickAccess from "./components/quickAcces";
import HospitalUpdates from "./components/hospitalUpdates";
import { useAuthUser } from "../auth/hooks/useAuthUser";
import Footer from "./../components/footer";
import { fetchMyBookings, fetchHospitalUpdates, fetchDoctors } from "@/src/lib/api";
import { quickAccess } from "@/src/lib/constants";
import { formatBookingHistoryRows } from "@/src/utils/doctorHelper";

export default function HomePage() {
  const { data: user, isLoading: userLoading } = useAuthUser();
  
  const { data: rawBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: fetchMyBookings,
    enabled: !!user,
  });

  const { data: doctorsData } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  const { data: updates, isLoading: updatesLoading } = useQuery({
    queryKey: ["hospital-updates"],
    queryFn: fetchHospitalUpdates,
  });

  // Gabungkan data booking dengan data dokter
  const bookings = (rawBookings && doctorsData) 
    ? formatBookingHistoryRows(rawBookings, doctorsData) 
    : [];

  // Hitung data untuk dashboard secara presisi
  const now = new Date();
  const upcomingAppointment = bookings
    .filter(b => {
      const appointmentDateTime = new Date(`${b.appointmentDate}T${b.appointmentStartTime}`);
      return b.bookingStatus === "BOOKED" && appointmentDateTime > now;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.appointmentDate}T${a.appointmentStartTime}`).getTime();
      const dateB = new Date(`${b.appointmentDate}T${b.appointmentStartTime}`).getTime();
      return dateA - dateB;
    })[0];

  const activeAppointmentsCount = bookings.filter(b => {
    const appointmentDateTime = new Date(`${b.appointmentDate}T${b.appointmentStartTime}`);
    // Masih dianggap aktif jika hari ini dan jam belum lewat
    return b.bookingStatus === "BOOKED" && appointmentDateTime > now;
  }).length;

  if (userLoading || bookingsLoading || updatesLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-teal-600 font-medium animate-pulse text-lg">Memuat Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        <div className="h-10"></div>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Selamat Datang Kembali, {user?.fullname || "Patient"}
          </h1>
          <p className="text-slate-500">Bagaimana perasaan Anda hari ini?</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <UpcomingAppointment appointment={upcomingAppointment} />
          </div>
          
          <div className="w-full">
            <Stats activeAppointments={activeAppointmentsCount} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <QuickAccess items={quickAccess} />
          </div>
          
          <div className="w-full">
            <HospitalUpdates updates={updates || []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
