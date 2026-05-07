import { BookingStatus } from "@/src/lib/types";

type Props = {
  status: BookingStatus;
};

export function formatBookingStatus(status?: string) {
  if (!status) return "Unknown";

  return status.toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function BookingStatusBadge({ status }: Props) {
  return (
    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
      {status}
    </span>
  );
}
