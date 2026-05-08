"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/navbar";
import { useAuthUser } from "@/src/modules/auth/hooks/useAuthUser";
import BookingTable from "./components/BookingTable";
import { fetchMyBookings, fetchDoctors } from "@/src/lib/api";
import { formatBookingHistoryRows } from "@/src/utils/bookingHelper";
import { LOGIN_PAGE_URL } from "@/src/constants/constants";

export default function Booking() {
  const router = useRouter();
  const { data: user, isLoading: userLoading, isError } = useAuthUser();

  const { data: rawBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: fetchMyBookings,
    enabled: !!user,
  });

  const { data: doctorsData } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  useEffect(() => {
    if (isError) {
      router.push(LOGIN_PAGE_URL);
    }
  }, [isError, router]);

  if (userLoading || bookingsLoading || !user) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 pt-28 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl text-center py-20 text-teal-600 animate-pulse">
          Memuat riwayat booking...
        </div>
      </main>
    );
  }

  const bookings =
  rawBookings && doctorsData
    ? formatBookingHistoryRows(rawBookings, doctorsData)
    : [];

    
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

          <BookingTable bookings={bookings} />
        </div>
      </main>
    </>
  );
}
