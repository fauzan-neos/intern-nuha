// Konversi waktu (09:00 -> menit)
export function timeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

// Konversi menit -> waktu (540 -> 09:00)
export function minutesToTime(minutes: number) {
  const hour = Math.floor(minutes / 60).toString().padStart(2, "0");
  const minute = (minutes % 60).toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

// Mengubah jam (09:00) ke format 24 jam (tetap 09:00)
export function formatTimeRange(start: string, end: string) {
  return `${start} - ${end}`;
}