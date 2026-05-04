import { Clock3 } from "lucide-react";
import { UpcomingScheduleItem } from "@/src/lib/dummy";

type Props = {
  upcomingSchedule: UpcomingScheduleItem[];
};

function getScheduleTextColor(status: UpcomingScheduleItem["status"]) {
  if (status === "available") return "text-gray-700";
  if (status === "blocked") return "text-gray-500";
  return "text-gray-400";
}

export default function DoctorSchedulePreview({ upcomingSchedule }: Props) {
  return (
    <div className="flex-1 border-y border-blue-50 bg-slate-50 px-6 py-5">
      <div className="mb-4 flex items-center gap-3 text-gray-600">
        <Clock3 className="size-5" />
        <h4 className="font-semibold">Jadwal Terdekat</h4>
      </div>

      <div className="space-y-3">
        {upcomingSchedule.map((schedule) => (
          <div
            key={schedule.date}
            className={`grid grid-cols-[6.5rem_1fr] gap-4 text-sm ${getScheduleTextColor(
              schedule.status,
            )}`}
          >
            <span className="font-medium text-gray-800">
              {schedule.dayLabel}
            </span>
            <span className="text-right font-medium">{schedule.timeLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
