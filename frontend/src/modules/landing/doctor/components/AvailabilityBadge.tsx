import { UpcomingScheduleItem } from "@/src/lib/dummy";

type Availability = {
  label: string;
  tone: "available" | "next" | "off";
};

type Props = {
  availability: Availability;
  isAvailableToday: boolean;
};

export function getAvailabilityLabel(
  schedule: UpcomingScheduleItem[],
): Availability {
  const availableIndex = schedule.findIndex((item) => item.status === "available");

  if (availableIndex === 0) {
    return {
      label: "Available Today",
      tone: "available",
    };
  }

  if (availableIndex === 1) {
    return {
      label: "Next Avail: Tomorrow",
      tone: "next",
    };
  }

  if (availableIndex > 1) {
    return {
      label: `Next Avail: ${schedule[availableIndex].dayLabel}`,
      tone: "next",
    };
  }

  return {
    label: "No Schedule",
    tone: "off",
  };
}

export default function AvailabilityBadge({
  availability,
  isAvailableToday,
}: Props) {
  return (
    <span
      className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        isAvailableToday
          ? "bg-emerald-50 text-emerald-700"
          : "bg-blue-50 text-gray-600"
      }`}
    >
      <span
        className={`size-2 rounded-full ${
          isAvailableToday ? "bg-emerald-600" : "bg-gray-400"
        }`}
      />
      {availability.label}
    </span>
  );
}
