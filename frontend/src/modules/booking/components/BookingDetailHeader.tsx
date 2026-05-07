import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function BookingDetailHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <Link
        href="/booking"
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Daftar Booking
      </Link>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
      >
        <Download className="size-4" />
        Download Receipt
      </button>
    </div>
  );
}
