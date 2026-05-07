import { CalendarClock, UserRound } from "lucide-react";
import { BookingHistoryRow } from "@/src/lib/types";

type Props = {
  booking: BookingHistoryRow;
  type: "schedule" | "patient";
};

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function BookingInfoCard({ booking, type }: Props) {
  const isSchedule = type === "schedule";
  const Icon = isSchedule ? CalendarClock : UserRound;

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
        <Icon className="size-5 text-teal-700" />
        <h2 className="font-semibold">
          {isSchedule ? "Jadwal & Lokasi" : "Informasi Pasien"}
        </h2>
      </div>
      <dl className="space-y-4 text-sm">
        {isSchedule ? (
          <>
            <div>
              <dt className="font-semibold uppercase text-gray-900">
                Tanggal & Waktu
              </dt>
              <dd className="mt-1 font-semibold text-teal-700">
                {formatLongDate(booking.appointmentDate)}
              </dd>
              <dd className="text-gray-700">
                {booking.appointmentStartTime} - {booking.appointmentEndTime}
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-900">
                Departemen
              </dt>
              <dd className="mt-1 text-teal-700">{booking.department}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-900">Ruangan</dt>
              <dd className="mt-1 text-teal-700">{booking.room}</dd>
            </div>
          </>
        ) : (
          <>
            <div>
              <dt className="font-semibold uppercase text-gray-900">
                Nama Pasien
              </dt>
              <dd className="mt-1 font-semibold text-teal-700">{booking.patientName}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-900">
                ID Pasien
              </dt>
              <dd className="mt-1 text-teal-700">{booking.patientCode}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-900">
                Alasan Kunjungan
              </dt>
              <dd className="mt-1 text-teal-700">{booking.complaint}</dd>
            </div>
          </>
        )}
      </dl>
    </section>
  );
}
