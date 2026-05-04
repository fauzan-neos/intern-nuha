import { CalendarClock, UserRound } from "lucide-react";
import { BookingHistoryRow } from "@/src/lib/dummy";

type Props = {
  booking: BookingHistoryRow;
  type: "schedule" | "patient";
};

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
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
          {isSchedule ? "Schedule & Location" : "Patient Information"}
        </h2>
      </div>
      <dl className="space-y-4 text-sm">
        {isSchedule ? (
          <>
            <div>
              <dt className="font-semibold uppercase text-gray-400">
                Date & Time
              </dt>
              <dd className="mt-1 font-semibold">
                {formatLongDate(booking.appointmentDate)}
              </dd>
              <dd className="text-gray-600">
                {booking.appointmentTime} - {booking.appointmentEndTime}
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-400">
                Department
              </dt>
              <dd className="mt-1 text-gray-700">{booking.department}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-400">Room</dt>
              <dd className="mt-1 text-gray-700">{booking.room}</dd>
            </div>
          </>
        ) : (
          <>
            <div>
              <dt className="font-semibold uppercase text-gray-400">
                Patient Name
              </dt>
              <dd className="mt-1 font-semibold">{booking.patientName}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-400">
                Patient ID
              </dt>
              <dd className="mt-1 text-gray-700">{booking.patientCode}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase text-gray-400">
                Reason for Visit
              </dt>
              <dd className="mt-1 text-gray-700">{booking.complaint}</dd>
            </div>
          </>
        )}
      </dl>
    </section>
  );
}
