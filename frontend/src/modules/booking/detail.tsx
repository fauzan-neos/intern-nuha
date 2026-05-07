"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import BookingDetailDoctorCard from "./components/BookingDetailDoctorCard";
import BookingDetailHeader from "./components/BookingDetailHeader";
import BookingDetailSummary from "./components/BookingDetailSummary";
import BookingInfoCard from "./components/BookingInfoCard";
import PreAppointmentInstructions from "./components/PreAppointmentInstructions";
import { fetchBookingDetail, fetchDoctors } from "@/src/lib/api";
import { formatBookingHistoryRows } from "@/src/utils/doctorHelper";

export default function BookingDetail() {
  const params = useParams<{ bookingCode: string }>();
  
  const { data: rawBooking, isLoading: bookingLoading } = useQuery({
    queryKey: ["booking", params.bookingCode],
    queryFn: () => fetchBookingDetail(params.bookingCode),
    enabled: !!params.bookingCode,
  });

  const { data: doctorsData } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  if (bookingLoading || !doctorsData) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-gray-900">
        <div className="mx-auto max-w-6xl text-center py-20 text-teal-600 animate-pulse font-medium">
          Memuat detail booking...
        </div>
      </main>
    );
  }

  // Transform ke format UI (BookingHistoryRow)
  const booking = rawBooking ? formatBookingHistoryRows([rawBooking], doctorsData)[0] : null;

  if (!booking) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-gray-900">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Booking Saya
          </Link>
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h1 className="text-2xl font-semibold">Booking tidak ditemukan</h1>
            <p className="mt-2 text-sm text-gray-600">
              Kode booking {params.bookingCode} tidak ditemukan di sistem.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <BookingDetailHeader />

        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-6">
            <BookingDetailDoctorCard booking={booking} />
          </aside>

          <section className="space-y-6">
            <BookingDetailSummary booking={booking} />

            <div className="grid gap-6 md:grid-cols-2">
              <BookingInfoCard booking={booking} type="schedule" />
              <BookingInfoCard booking={booking} type="patient" />
            </div>

            <PreAppointmentInstructions instructions={booking.instructions} />
          </section>
        </div>
      </div>

      <footer className="mt-10 border-t border-gray-200 bg-white px-6 py-6 text-xs text-gray-400">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span>© 2026 MedCare. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
