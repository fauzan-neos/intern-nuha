import { Doctor } from "@/src/lib/types";

export function getTopDoctors(items: Doctor[]) {
  return [...items]
    .sort((a, b) => b.weeklyBooking - a.weeklyBooking)
    .slice(0, 3);
}