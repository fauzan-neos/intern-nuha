"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBookingHistoryByCode } from "@/src/lib/dummy";
import BookingDetailDoctorCard from "./components/BookingDetailDoctorCard";
import BookingDetailHeader from "./components/BookingDetailHeader";
import BookingDetailSummary from "./components/BookingDetailSummary";
import BookingInfoCard from "./components/BookingInfoCard";
import PreAppointmentInstructions from "./components/PreAppointmentInstructions";

export default function BookingDetail() {
  const params = useParams<{ bookingCode: string }>();
  const booking = getBookingHistoryByCode(params.bookingCode);

  if (!booking) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-gray-900">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowLeft className="size-4" />
            Back to My Bookings
          </Link>
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h1 className="text-2xl font-semibold">Booking tidak ditemukan</h1>
            <p className="mt-2 text-sm text-gray-600">
              Kode booking tidak tersedia di data dummy saat ini.
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
