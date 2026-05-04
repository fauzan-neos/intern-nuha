import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { BookingHistoryRow } from "@/src/lib/dummy";

type Props = {
  booking: BookingHistoryRow;
};

export default function BookingDetailDoctorCard({ booking }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="relative mx-auto size-28 overflow-hidden rounded-full bg-teal-50 ring-2 ring-teal-100">
        <Image
          src={booking.doctorImage}
          alt={booking.doctorName}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <h2 className="mt-5 font-semibold">{booking.doctorName}</h2>
      <p className="mt-1 text-sm text-gray-500">
        {booking.specialization} Specialist
      </p>
      <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
        <BadgeCheck className="size-3.5" />
        Board Certified
      </span>
    </section>
  );
}
