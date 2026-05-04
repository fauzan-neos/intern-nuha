"use client";

import Navbar from "./../components/navbar";
import { getDashboardData } from "./utils/helper";
import UpcomingAppointment from "./components/upcomingAppointment";
import Stats from "./components/stats";
import QuickAccess from "./components/quickAcces";
import HospitalUpdates from "./components/hospitalUpdates";
import { useAuthUser } from "../auth/hooks/useAuthUser";
import Footer from "./../components/footer";

export default function HomePage() {
  const { data: user, isLoading } = useAuthUser();
  
  // patientId dummy 1 as fallback or based on user data if available
  const data = getDashboardData(1, user?.fullname || "Patient");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 animate-pulse">Loading dashboard...</p>
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
          <p className="text-slate-500">Bagaimana perasaan anda hari ini?</p>
        </header>

        <div className="grid grid-cols-2 gap-8">
          <div className="">
            <UpcomingAppointment appointment={data.upcomingAppointment} />
          </div>
          
          <aside className="space-y-10">
            <Stats activeAppointments={data.stats.activeAppointments} />
          </aside>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="">
            <QuickAccess items={data.quickAccess} />
          </div>
          
          <aside className="space-y-10">
            <HospitalUpdates updates={data.updates} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}