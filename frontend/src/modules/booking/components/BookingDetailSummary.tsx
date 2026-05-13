import { BadgeCheck } from "lucide-react";
import { BookingHistoryRow } from "@/src/lib/types";
import { formatBookingStatus } from "@/src/modules/booking/components/BookingStatusBadge";

type Props = {
  booking: BookingHistoryRow;
};

export default function BookingDetailSummary({ booking }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase text-gray-900">
          Nomor Antrian
        </p>
        <h1 className="mt-3 text-teal-700 text-lg font-bold">{booking.bookingCode}</h1>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
        <BadgeCheck className="size-4" />
        {formatBookingStatus(booking.bookingStatus)}
      </span>
    </div>
  );
}
