import { BookingStatus } from "@/src/lib/dummy";

type Props = {
  status: BookingStatus;
};

export function formatBookingStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function BookingStatusBadge({ status }: Props) {
  return (
    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
      {status}
    </span>
  );
}
