import Link from "next/link";
import { BookingHistoryRow } from "@/src/lib/types";
import BookingStatusBadge from "./BookingStatusBadge";

type Props = {
  bookings: BookingHistoryRow[];
};

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function BookingTable({ bookings }: Props) {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="grid grid-cols-6 border-b border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-600">
        <span>Nomor Antrian</span>
        <span>Dokter</span>
        <span>Spesialisasi</span>
        <span>Jadwal</span>
        <span>Status</span>
        <span>Aksi</span>
      </div>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="grid grid-cols-6 items-center border-b border-gray-100 px-5 py-4 text-sm last:border-b-0"
        >
          <span className="font-medium text-gray-900">
            {booking.bookingCode}
          </span>
          <span>{booking.doctorName}</span>
          <span>{booking.specialization}</span>
          <span>
            {formatLongDate(booking.appointmentDate)}, {booking.appointmentStartTime} - {booking.appointmentEndTime}
          </span>
          <span>
            <BookingStatusBadge status={booking.bookingStatus} />
          </span>
          <Link
            href={`/booking/${booking.uuid}`}
            className="font-semibold text-teal-700 hover:text-teal-900"
          >
            Lihat detail booking
          </Link>
        </div>
      ))}
    </div>
  );
}
