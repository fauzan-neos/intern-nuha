"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, XCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BookingDetailDoctorCard from "./components/BookingDetailDoctorCard";
import BookingDetailHeader from "./components/BookingDetailHeader";
import BookingDetailSummary from "./components/BookingDetailSummary";
import BookingInfoCard from "./components/BookingInfoCard";
import PreAppointmentInstructions from "./components/PreAppointmentInstructions";
import { fetchBookingDetail, fetchDoctors, cancelBooking } from "@/src/lib/api";
import { formatBookingHistoryRows } from "@/src/utils/bookingHelper";
import { useState } from "react";
import NotificationModal from "../../components/NotificationModal";
import { BOOKING_PAGE_URL } from "@/src/constants/constants";

export default function BookingDetail() {
  const params = useParams<{ bookingCode: string }>();
  const queryClient = useQueryClient();
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });
  
  const { data: rawBooking, isLoading: bookingLoading } = useQuery({
    queryKey: ["booking", params.bookingCode],
    queryFn: () => fetchBookingDetail(params.bookingCode),
    enabled: !!params.bookingCode,
  });

  const { data: doctorsData } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelBooking(params.bookingCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking", params.bookingCode] });
      setShowConfirmCancel(false);
      setModal({
        isOpen: true,
        type: "success",
        title: "Booking Dibatalkan",
        message: "Janji temu Anda telah berhasil dibatalkan.",
      });
    },
    onError: (error: Error) => {
      setShowConfirmCancel(false);
      setModal({
        isOpen: true,
        type: "error",
        title: "Gagal Membatalkan",
        message: error.message || "Terjadi kesalahan saat membatalkan booking.",
      });
    }
  });

  const handleCancel = () => {
    setShowConfirmCancel(true);
  };

  const confirmCancel = () => {
    cancelMutation.mutate();
  };

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
            href={BOOKING_PAGE_URL}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Booking Saya
          </Link>
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h1 className="text-2xl font-semibold">Booking tidak ditemukan</h1>
            <p className="mt-2 text-sm text-gray-600">
              Data booking tidak ditemukan di sistem.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900">
      <NotificationModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {/* Confirmation Modal for Cancellation */}
      {showConfirmCancel && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Batalkan Booking?</h3>
              <p className="mt-2 text-gray-600">
                Apakah Anda yakin ingin membatalkan janji temu ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowConfirmCancel(false)}
                  className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Tidak, Kembali
                </button>
                <button
                  onClick={confirmCancel}
                  disabled={cancelMutation.isPending}
                  className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {cancelMutation.isPending ? "Proses..." : "Ya, Batalkan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 py-8">
        <BookingDetailHeader 
          status={booking.bookingStatus} 
          onCancel={handleCancel}
          isCancelling={cancelMutation.isPending}
        />

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
