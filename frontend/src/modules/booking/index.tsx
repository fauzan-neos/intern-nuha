"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/modules/components/navbar";
import { getBookingHistoryRows } from "@/src/lib/dummy";
import { useAuthUser } from "@/src/modules/auth/hooks/useAuthUser";
import BookingTable from "./components/BookingTable";

export default function Booking() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useAuthUser();

  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 pt-28 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl">Loading...</div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-5 pb-12 pt-28 text-gray-900">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <p className="text-sm font-medium text-teal-700">Portal Pasien</p>
            <h1 className="mt-1 text-3xl font-semibold">Booking Saya</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Lihat riwayat booking konsultasi dokter Anda.
            </p>
          </div>

          <BookingTable bookings={getBookingHistoryRows()} />
        </div>
      </main>
    </>
  );
}
