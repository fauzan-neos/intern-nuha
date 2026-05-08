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
  const getStyles = () => {
    switch (status) {
      case "BOOKED":
        return "bg-teal-50 text-teal-700 border-teal-100";
      case "REGISTERED":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "CANCELED":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStyles()}`}>
      {formatBookingStatus(status)}
    </span>
  );
}
