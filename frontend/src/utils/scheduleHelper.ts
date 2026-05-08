import {
    DoctorSchedule,  
    UpcomingScheduleItem, 
    Weekday, 
} from "../lib/types";
import { addDays, formatDateValue } from "./dateHelper";
import { formatTimeRange } from "./timeHelper";

// Ambil jadwal 5 hari kedepan (Skip Hari Minggu)
export function getUpcomingSchedule(
  doctorSchedules: DoctorSchedule[] = [], 
  startDate = new Date()
): UpcomingScheduleItem[] {
  const weekdays: Weekday[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const scheduleItems: UpcomingScheduleItem[] = [];
  let currentOffset = 0;

  while (scheduleItems.length < 5) {
    const date = addDays(startDate, currentOffset);
    const dayName = weekdays[date.getDay()];

    // Skip Hari Minggu
    if (dayName === "SUN") {
      currentOffset++;
      continue;
    }
    
    const schedule = doctorSchedules.find((item) => item.day === dayName);
    const status = schedule?.status || "OFF";
    const hasTime = status === "AVAILABLE" && schedule?.start && schedule?.end;

    scheduleItems.push({
      date: formatDateValue(date),
      day: dayName,
      dayLabel: currentOffset === 0 ? "Hari Ini" : date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" }),
      timeLabel: hasTime
        ? formatTimeRange(schedule.start!, schedule.end!)
        : (schedule?.note ?? "Tidak ada jadwal"),
      status,
      isToday: currentOffset === 0,
    });
    
    currentOffset++;
  }

  return scheduleItems;
}

export const getAvailableDates = (schedules: DoctorSchedule[]) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const availableDates: {
    dateString: string;
    label: string;
    scheduleId: number;
  }[] = [];
  
  let currentOffset = 0;
  while (availableDates.length < 5 && currentOffset < 14) { // Cek maksimal 2 minggu kedepan
    const date = new Date();
    date.setDate(date.getDate() + currentOffset);
    const dayName = days[date.getDay()];
    
    // Skip Hari Minggu
    if (dayName === "SUN") {
      currentOffset++;
      continue;
    }

    // Cek apakah ada jadwal dokter untuk hari tersebut
    const hasSchedule = schedules.find(s => s.day === dayName && s.status === "AVAILABLE");
    if (hasSchedule) {
      availableDates.push({
        dateString: date.toISOString().split('T')[0],
        label: currentOffset === 0 ? "Hari Ini" : date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' }),
        scheduleId: hasSchedule.id
      });
    }
    currentOffset++;
  }
  return availableDates;
};