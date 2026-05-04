import Link from "next/link";
import { BookingHistoryRow } from "@/src/lib/dummy";
import BookingStatusBadge from "./BookingStatusBadge";

type Props = {
  bookings: BookingHistoryRow[];
};

export default function BookingTable({ bookings }: Props) {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="grid grid-cols-6 border-b border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-600">
        <span>Kode</span>
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
            {booking.appointmentDate} at {booking.appointmentTime}
          </span>
          <span>
            <BookingStatusBadge status={booking.status} />
          </span>
          <Link
            href={`/booking/${booking.bookingCode}`}
            className="font-semibold text-teal-700 hover:text-teal-900"
          >
            Lihat detail booking
          </Link>
        </div>
      ))}
    </div>
  );
}
