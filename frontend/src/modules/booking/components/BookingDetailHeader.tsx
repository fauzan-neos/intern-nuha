import Link from "next/link";
import { ArrowLeft, Download, XCircle } from "lucide-react";
import { BOOKING_PAGE_URL } from "@/src/constants/constants";

type Props = {
  status?: string;
  onCancel?: () => void;
  isCancelling?: boolean;
};

export default function BookingDetailHeader({ status, onCancel, isCancelling }: Props) {
  const canCancel = status === "BOOKED";

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={BOOKING_PAGE_URL}
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Daftar Booking
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        {canCancel && (
          <button
            onClick={onCancel}
            disabled={isCancelling}
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 shadow-sm transition-colors hover:bg-red-100 disabled:opacity-50"
          >
            <XCircle className="size-4" />
            {isCancelling ? "Membatalkan..." : "Cancel Booking"}
          </button>
        )}

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
        >
          <Download className="size-4" />
          Download Receipt
        </button>
      </div>
    </div>
  );
}
