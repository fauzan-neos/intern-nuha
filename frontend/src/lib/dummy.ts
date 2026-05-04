export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
export type ScheduleStatus = "available" | "blocked" | "off";

export type Schedule = {
  day: Weekday;
  start: string | null;
  end: string | null;
  status: ScheduleStatus;
  note: string | null;
  maxPatients: number | null;
};

export type Appointment = {
  patientName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
};

export type Access = {
  id: number;
  title: string;
}

export type HospitalUpdate = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type Specialization = {
  id: number;
  code: string;
  name: string;
  description: string;
};

export type Doctor = {
  id: number;
  employeeCode: string;
  name: string;
  specializationId: number;
  image: string;
  experienceYears: number;
  rating: number;
  weeklyBooking: number;
  schedules: Schedule[];
};

export type DoctorWithSpecialization = Doctor & {
  specialization: string;
  specializationDescription: string;
};

export type UpcomingScheduleItem = {
  date: string;
  day: Weekday;
  dayLabel: string;
  timeLabel: string;
  status: ScheduleStatus;
  isToday: boolean;
};

export type AppointmentSlot = {
  date: string;
  start: string;
  end: string;
  label: string;
  capacity: number;
  booked: number;
  remaining: number;
};

export type BookingStatus = "confirmed" | "completed" | "cancelled";

export type BookingHistory = {
  id: number;
  bookingCode: string;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentEndTime?: string;
  status: BookingStatus;
  complaint: string;
  patientName?: string;
  patientCode?: string;
  department?: string;
  room?: string;
  location?: string;
  instructions?: string[];
  createdAt: string;
};

export type BookingHistoryRow = BookingHistory & {
  doctorName: string;
  doctorImage: string;
  specialization: string;
  appointmentEndTime: string;
  patientName: string;
  patientCode: string;
  department: string;
  room: string;
  location: string;
  instructions: string[];
};

const weekdays: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const defaultSchedules: Record<Weekday, Schedule> = {
  sun: { day: "sun", start: null, end: null, status: "off", note: "Off Duty", maxPatients: null },
  mon: { day: "mon", start: null, end: null, status: "off", note: "Off Duty", maxPatients: null },
  tue: { day: "tue", start: null, end: null, status: "off", note: "Off Duty", maxPatients: null },
  wed: { day: "wed", start: null, end: null, status: "off", note: "Off Duty", maxPatients: null },
  thu: { day: "thu", start: null, end: null, status: "off", note: "Off Duty", maxPatients: null },
  fri: { day: "fri", start: null, end: null, status: "off", note: "Off Duty", maxPatients: null },
  sat: { day: "sat", start: null, end: null, status: "off", note: "Off Duty", maxPatients: null },
};

function createSchedule(
  schedules: Partial<Record<Weekday, Partial<Omit<Schedule, "day">>>>,
): Schedule[] {
  return weekdays.map((day) => {
    const schedule = schedules[day];
    const status =
      schedule?.status ??
      (schedule?.start && schedule?.end ? "available" : defaultSchedules[day].status);

    return {
      ...defaultSchedules[day],
      ...schedule,
      status,
      note: schedule?.note ?? (status === "available" ? null : defaultSchedules[day].note),
      maxPatients:
        schedule?.maxPatients ?? (status === "available" ? 12 : defaultSchedules[day].maxPatients),
    };
  });
}

function timeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToTime(minutes: number) {
  const hour = Math.floor(minutes / 60).toString().padStart(2, "0");
  const minute = (minutes % 60).toString().padStart(2, "0");

  return `${hour}:${minute}`;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDayLabel(date: Date, isToday: boolean) {
  if (isToday) return "Today";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTimeRange(start: string, end: string) {
  const formatTime = (time: string) => {
    const [hourValue, minute] = time.split(":");
    const hour = Number(hourValue);
    const period = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 || 12;

    return `${normalizedHour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
}

export const quickAccess: Access[] = [
  { id: 1, title: "Vitals History" },
  { id: 2, title: "Billing & Payments" },
  { id: 3, title: "Pharmacy Refill" },
  { id: 4, title: "Message Nurse" },
];

export const hospitalUpdates: HospitalUpdate[] = [
  {
    id: 1,
    title: "New MRI Facility Opened",
    description: "New MRI wing now available with advanced imaging technology.",
    image: "/hospital.jpg",
  },
  {
    id: 2,
    title: "Flu Vaccination Drive",
    description: "Book your seasonal flu shot today at the main lobby.",
    image: "/hospital-building.jpg",
  },
];

export const specializations: Specialization[] = [
  {
    id: 1,
    code: "CARD",
    name: "Cardiology",
    description:
      "Spesialis jantung menangani keluhan seperti nyeri dada, tekanan darah tinggi, gangguan irama jantung, dan risiko penyakit jantung. Pasien biasanya datang untuk pemeriksaan fungsi jantung, kontrol obat, atau konsultasi pencegahan agar kondisi jantung tetap stabil.",
  },
  {
    id: 2,
    code: "PED",
    name: "Pediatrics",
    description:
      "Spesialis anak membantu memantau tumbuh kembang bayi, anak, dan remaja. Layanan ini mencakup pemeriksaan rutin, imunisasi, demam, batuk pilek, masalah nutrisi, serta keluhan kesehatan anak yang perlu penanganan sesuai usia.",
  },
  {
    id: 3,
    code: "NEURO",
    name: "Neurology",
    description:
      "Spesialis saraf menangani gangguan pada otak, saraf, dan otot. Keluhan yang umum diperiksa antara lain sakit kepala berulang, kesemutan, kejang, gangguan tidur, stroke, atau kelemahan anggota gerak.",
  },
  {
    id: 4,
    code: "ORTHO",
    name: "Orthopedics",
    description:
      "Spesialis ortopedi menangani masalah tulang, sendi, otot, dan cedera gerak tubuh. Pasien dapat berkonsultasi untuk nyeri lutut, patah tulang, cedera olahraga, nyeri punggung, atau pemulihan setelah operasi tulang.",
  },
  {
    id: 5,
    code: "DERM",
    name: "Dermatology",
    description:
      "Spesialis kulit menangani keluhan kulit, rambut, dan kuku. Layanan ini mencakup jerawat, alergi kulit, eksim, infeksi kulit, kerontokan rambut, serta evaluasi perubahan pada tahi lalat atau bercak kulit.",
  },
  {
    id: 6,
    code: "ONC",
    name: "Oncology",
    description:
      "Spesialis onkologi berfokus pada diagnosis, perawatan, dan pemantauan kanker. Dokter membantu pasien memahami pilihan terapi, efek samping pengobatan, serta rencana kontrol yang sesuai dengan kondisi tubuh.",
  },
  {
    id: 7,
    code: "GYN",
    name: "Gynecology",
    description:
      "Spesialis kandungan menangani kesehatan reproduksi wanita, termasuk siklus menstruasi, kehamilan, kontrasepsi, dan keluhan area kewanitaan. Konsultasi juga dapat dilakukan untuk pemeriksaan rutin dan persiapan kehamilan.",
  },
  {
    id: 8,
    code: "ENDO",
    name: "Endocrinology",
    description:
      "Spesialis endokrin menangani gangguan hormon dan metabolisme. Keluhan yang sering ditangani meliputi diabetes, gangguan tiroid, perubahan berat badan yang tidak biasa, serta masalah hormon lain yang memengaruhi tubuh.",
  },
  {
    id: 9,
    code: "GASTRO",
    name: "Gastroenterology",
    description:
      "Spesialis pencernaan menangani keluhan lambung, usus, hati, dan organ pencernaan lain. Pasien biasanya datang untuk nyeri perut, maag, diare berkepanjangan, sembelit, gangguan hati, atau evaluasi pola makan.",
  },
  {
    id: 10,
    code: "PULM",
    name: "Pulmonology",
    description:
      "Spesialis paru menangani gangguan pernapasan dan kesehatan paru-paru. Layanan ini mencakup batuk lama, sesak napas, asma, infeksi paru, alergi pernapasan, serta kontrol penyakit paru kronis.",
  },
  {
    id: 11,
    code: "URO",
    name: "Urology",
    description:
      "Spesialis urologi menangani saluran kemih pada pria dan wanita, serta kesehatan reproduksi pria. Keluhan umum meliputi nyeri saat buang air kecil, batu ginjal, infeksi saluran kemih, dan gangguan prostat.",
  },
  {
    id: 12,
    code: "PSY",
    name: "Psychiatry",
    description:
      "Spesialis kejiwaan membantu menangani kesehatan mental dan emosi. Pasien dapat berkonsultasi untuk kecemasan, depresi, gangguan tidur, stres berkepanjangan, perubahan suasana hati, atau kebutuhan evaluasi terapi.",
  },
  {
    id: 13,
    code: "RAD",
    name: "Radiology",
    description:
      "Spesialis radiologi membantu membaca dan menilai hasil pemeriksaan pencitraan medis seperti rontgen, USG, CT scan, atau MRI. Hasil interpretasi ini membantu dokter lain menentukan diagnosis dan langkah perawatan.",
  },
  {
    id: 14,
    code: "NEPH",
    name: "Nephrology",
    description:
      "Spesialis ginjal menangani gangguan fungsi ginjal dan tekanan darah yang berkaitan dengan ginjal. Pasien dapat berkonsultasi untuk batu ginjal, infeksi ginjal, penyakit ginjal kronis, atau pemantauan hasil laboratorium.",
  },
  {
    id: 15,
    code: "OPHTH",
    name: "Ophthalmology",
    description:
      "Spesialis mata menangani keluhan penglihatan dan kesehatan mata. Layanan ini mencakup mata merah, penglihatan kabur, katarak, glaukoma, mata kering, serta pemeriksaan mata rutin untuk berbagai usia.",
  },
  {
    id: 16,
    code: "RHEUM",
    name: "Rheumatology",
    description:
      "Spesialis reumatologi menangani penyakit sendi, otot, dan autoimun. Pasien biasanya datang karena nyeri sendi berulang, kaku pagi hari, bengkak pada sendi, lupus, atau keluhan imun yang memengaruhi banyak organ.",
  },
  {
    id: 17,
    code: "EMER",
    name: "Emergency Medicine",
    description:
      "Dokter emergensi menangani kondisi gawat darurat yang membutuhkan penilaian cepat. Layanan ini berfokus pada stabilisasi awal untuk cedera, sesak berat, nyeri dada mendadak, pingsan, atau kondisi akut lainnya.",
  },
  {
    id: 18,
    code: "ANES",
    name: "Anesthesiology",
    description:
      "Spesialis anestesi membantu persiapan pembiusan, pemantauan selama tindakan, dan manajemen nyeri. Pasien biasanya bertemu dokter anestesi sebelum operasi atau saat membutuhkan penanganan nyeri tertentu.",
  },
  {
    id: 19,
    code: "PATH",
    name: "Pathology",
    description:
      "Spesialis patologi menganalisis sampel darah, jaringan, atau cairan tubuh untuk membantu diagnosis penyakit. Pemeriksaan ini penting untuk memastikan penyebab keluhan dan menentukan arah terapi yang tepat.",
  },
  {
    id: 20,
    code: "PLAST",
    name: "Plastic Surgery",
    description:
      "Spesialis bedah plastik menangani tindakan rekonstruksi dan estetika. Layanan dapat mencakup perbaikan bekas luka, kelainan bentuk akibat cedera, luka bakar, rekonstruksi setelah operasi, atau konsultasi estetika medis.",
  },
  {
    id: 21,
    code: "HEMA",
    name: "Hematology",
    description:
      "Spesialis hematologi menangani penyakit darah dan gangguan pembekuan. Pasien dapat berkonsultasi untuk anemia, gangguan trombosit, kelainan sel darah putih, pembekuan darah, atau evaluasi hasil laboratorium darah.",
  },
  {
    id: 22,
    code: "INF",
    name: "Infectious Disease",
    description:
      "Spesialis penyakit infeksi menangani infeksi yang kompleks, berulang, atau membutuhkan pemantauan khusus. Keluhan dapat berupa demam lama, infeksi tropis, infeksi berat, atau evaluasi terapi antibiotik.",
  },
  {
    id: 23,
    code: "FAM",
    name: "Family Medicine",
    description:
      "Dokter keluarga memberikan layanan kesehatan umum untuk berbagai usia. Konsultasi dapat mencakup keluhan ringan, kontrol penyakit kronis, pemeriksaan kesehatan berkala, edukasi gaya hidup, dan rujukan ke spesialis bila diperlukan.",
  },
];

export const doctorTable: Doctor[] = [
  {
    id: 1,
    employeeCode: "DOC-0001",
    name: "Dr. Sarah Wijaya",
    specializationId: 1,
    image: "/doc_sarah.jpg",
    experienceYears: 12,
    rating: 4.9,
    weeklyBooking: 52,
    schedules: createSchedule({
      mon: { start: "09:00", end: "14:00" },
      wed: { start: "13:00", end: "18:00" },
      thu: { start: "09:00", end: "14:00" },
    }),
  },
  {
    id: 2,
    employeeCode: "DOC-0002",
    name: "Dr. Marcus Tan",
    specializationId: 3,
    image: "/doc_marcus.jpg",
    experienceYears: 10,
    rating: 4.8,
    weeklyBooking: 50,
    schedules: createSchedule({
      mon: { start: null, end: null, status: "blocked", note: "Surgery Day" },
      tue: { start: "08:00", end: "13:00" },
      thu: { start: "10:00", end: "16:00" },
      fri: { start: "08:00", end: "13:00" },
    }),
  },
  {
    id: 3,
    employeeCode: "DOC-0003",
    name: "Dr. Eko Prasetyo",
    specializationId: 2,
    image: "/doc_eko.jpg",
    experienceYears: 9,
    rating: 4.7,
    weeklyBooking: 40,
    schedules: createSchedule({
      sun: { start: "09:00", end: "12:00" },
      mon: { start: "09:00", end: "15:00" },
      wed: { start: "08:00", end: "13:00" },
      thu: { start: "10:00", end: "16:00" },
      fri: { start: "08:00", end: "13:00" },
    }),
  },
  {
    id: 4,
    employeeCode: "DOC-0004",
    name: "Dr. Amanda Lee",
    specializationId: 5,
    image: "/doc_sarah.jpg",
    experienceYears: 8,
    rating: 4.6,
    weeklyBooking: 30,
    schedules: createSchedule({
      mon: { start: "09:00", end: "12:00" },
      tue: { start: "10:00", end: "14:00" },
      thu: { start: "13:00", end: "17:00" },
      fri: { start: "09:00", end: "12:00" },
    }),
  },
  {
    id: 5,
    employeeCode: "DOC-0005",
    name: "Dr. Kevin Patel",
    specializationId: 6,
    image: "/doc_marcus.jpg",
    experienceYears: 11,
    rating: 4.8,
    weeklyBooking: 32,
    schedules: createSchedule({
      tue: { start: "08:00", end: "13:00" },
      wed: { start: "09:00", end: "15:00" },
      fri: { start: "10:00", end: "14:00" },
    }),
  },
  {
    id: 6,
    employeeCode: "DOC-0006",
    name: "Dr. Sofia Martinez",
    specializationId: 7,
    image: "/doc_sarah.jpg",
    experienceYears: 13,
    rating: 4.9,
    weeklyBooking: 33,
    schedules: createSchedule({
      mon: { start: "09:00", end: "13:00" },
      wed: { start: "10:00", end: "16:00" },
      thu: { start: "08:00", end: "12:00" },
    }),
  },
  {
    id: 7,
    employeeCode: "DOC-0007",
    name: "Dr. James Carter",
    specializationId: 4,
    image: "/doc_marcus.jpg",
    experienceYears: 15,
    rating: 4.7,
    weeklyBooking: 20,
    schedules: createSchedule({
      mon: { start: "10:00", end: "15:00" },
      tue: { start: "09:00", end: "12:00" },
      thu: { start: "13:00", end: "17:00" },
      fri: { start: "09:00", end: "14:00" },
    }),
  },
  {
    id: 8,
    employeeCode: "DOC-0008",
    name: "Dr. Lina Wong",
    specializationId: 8,
    image: "/doc_eko.jpg",
    experienceYears: 7,
    rating: 4.5,
    weeklyBooking: 21,
    schedules: createSchedule({
      tue: { start: "08:00", end: "12:00" },
      wed: { start: "09:00", end: "13:00" },
      fri: { start: "10:00", end: "15:00" },
    }),
  },
  {
    id: 9,
    employeeCode: "DOC-0009",
    name: "Dr. Michael Brown",
    specializationId: 9,
    image: "/doc_marcus.jpg",
    experienceYears: 10,
    rating: 4.6,
    weeklyBooking: 20,
    schedules: createSchedule({
      mon: { start: "08:00", end: "12:00" },
      wed: { start: "10:00", end: "14:00" },
      thu: { start: "09:00", end: "13:00" },
    }),
  },
  {
    id: 10,
    employeeCode: "DOC-0010",
    name: "Dr. Aisha Khan",
    specializationId: 10,
    image: "/doc_sarah.jpg",
    experienceYears: 9,
    rating: 4.7,
    weeklyBooking: 22,
    schedules: createSchedule({
      mon: { start: "09:00", end: "13:00" },
      tue: { start: "10:00", end: "15:00" },
      thu: { start: "08:00", end: "12:00" },
    }),
  },
  {
    id: 11,
    employeeCode: "DOC-0011",
    name: "Dr. Daniel Kim",
    specializationId: 11,
    image: "/doc_marcus.jpg",
    experienceYears: 8,
    rating: 4.4,
    weeklyBooking: 18,
    schedules: createSchedule({
      tue: { start: "09:00", end: "14:00" },
      wed: { start: "08:00", end: "12:00" },
      fri: { start: "10:00", end: "16:00" },
    }),
  },
  {
    id: 12,
    employeeCode: "DOC-0012",
    name: "Dr. Emily Davis",
    specializationId: 12,
    image: "/doc_sarah.jpg",
    experienceYears: 12,
    rating: 4.8,
    weeklyBooking: 29,
    schedules: createSchedule({
      mon: { start: "10:00", end: "16:00" },
      wed: { start: "09:00", end: "13:00" },
      thu: { start: "11:00", end: "15:00" },
    }),
  },
  {
    id: 13,
    employeeCode: "DOC-0013",
    name: "Dr. Ahmed Hassan",
    specializationId: 13,
    image: "/doc_marcus.jpg",
    experienceYears: 14,
    rating: 4.6,
    weeklyBooking: 12,
    schedules: createSchedule({
      mon: { start: "08:00", end: "12:00" },
      tue: { start: "09:00", end: "13:00" },
      thu: { start: "10:00", end: "14:00" },
    }),
  },
  {
    id: 14,
    employeeCode: "DOC-0014",
    name: "Dr. Olivia Green",
    specializationId: 14,
    image: "/doc_sarah.jpg",
    experienceYears: 10,
    rating: 4.5,
    weeklyBooking: 10,
    schedules: createSchedule({
      tue: { start: "08:00", end: "12:00" },
      wed: { start: "09:00", end: "14:00" },
      fri: { start: "10:00", end: "13:00" },
    }),
  },
  {
    id: 15,
    employeeCode: "DOC-0015",
    name: "Dr. Lucas Silva",
    specializationId: 15,
    image: "/doc_marcus.jpg",
    experienceYears: 9,
    rating: 4.7,
    weeklyBooking: 26,
    schedules: createSchedule({
      mon: { start: "09:00", end: "13:00" },
      wed: { start: "10:00", end: "15:00" },
      thu: { start: "08:00", end: "12:00" },
    }),
  },
  {
    id: 16,
    employeeCode: "DOC-0016",
    name: "Dr. Nina Petrova",
    specializationId: 16,
    image: "/doc_sarah.jpg",
    experienceYears: 11,
    rating: 4.6,
    weeklyBooking: 14,
    schedules: createSchedule({
      tue: { start: "09:00", end: "13:00" },
      thu: { start: "10:00", end: "15:00" },
      fri: { start: "08:00", end: "12:00" },
    }),
  },
  {
    id: 17,
    employeeCode: "DOC-0017",
    name: "Dr. Ethan Walker",
    specializationId: 17,
    image: "/doc_marcus.jpg",
    experienceYears: 16,
    rating: 4.9,
    weeklyBooking: 27,
    schedules: createSchedule({
      mon: { start: "00:00", end: "23:59" },
      tue: { start: "00:00", end: "23:59" },
      thu: { start: "00:00", end: "23:59" },
      fri: { start: "00:00", end: "23:59" },
    }),
  },
  {
    id: 18,
    employeeCode: "DOC-0018",
    name: "Dr. Grace Tan",
    specializationId: 18,
    image: "/doc_sarah.jpg",
    experienceYears: 13,
    rating: 4.8,
    weeklyBooking: 21,
    schedules: createSchedule({
      mon: { start: "08:00", end: "12:00" },
      tue: { start: "08:00", end: "12:00" },
      thu: { start: "08:00", end: "12:00" },
    }),
  },
  {
    id: 19,
    employeeCode: "DOC-0019",
    name: "Dr. Robert King",
    specializationId: 19,
    image: "/doc_marcus.jpg",
    experienceYears: 12,
    rating: 4.5,
    weeklyBooking: 19,
    schedules: createSchedule({
      tue: { start: "09:00", end: "13:00" },
      wed: { start: "09:00", end: "13:00" },
      fri: { start: "10:00", end: "14:00" },
    }),
  },
  {
    id: 20,
    employeeCode: "DOC-0020",
    name: "Dr. Chloe Dubois",
    specializationId: 20,
    image: "/doc_sarah.jpg",
    experienceYears: 8,
    rating: 4.4,
    weeklyBooking: 7,
    schedules: createSchedule({
      mon: { start: "10:00", end: "14:00" },
      wed: { start: "09:00", end: "13:00" },
      fri: { start: "11:00", end: "15:00" },
    }),
  },
  {
    id: 21,
    employeeCode: "DOC-0021",
    name: "Dr. Victor Ivanov",
    specializationId: 21,
    image: "/doc_marcus.jpg",
    experienceYears: 10,
    rating: 4.6,
    weeklyBooking: 8,
    schedules: createSchedule({
      tue: { start: "08:00", end: "12:00" },
      wed: { start: "10:00", end: "15:00" },
      fri: { start: "09:00", end: "13:00" },
    }),
  },
  {
    id: 22,
    employeeCode: "DOC-0022",
    name: "Dr. Sophia Rossi",
    specializationId: 22,
    image: "/doc_sarah.jpg",
    experienceYears: 11,
    rating: 4.7,
    weeklyBooking: 31,
    schedules: createSchedule({
      mon: { start: "09:00", end: "13:00" },
      wed: { start: "10:00", end: "14:00" },
      thu: { start: "09:00", end: "13:00" },
    }),
  },
  {
    id: 23,
    employeeCode: "DOC-0023",
    name: "Dr. David Johnson",
    specializationId: 23,
    image: "/doc_marcus.jpg",
    experienceYears: 18,
    rating: 4.8,
    weeklyBooking: 8,
    schedules: createSchedule({
      mon: { start: "08:00", end: "12:00" },
      tue: { start: "08:00", end: "12:00" },
      wed: { start: "08:00", end: "12:00" },
      thu: { start: "08:00", end: "12:00" },
      fri: { start: "08:00", end: "12:00" },
    }),
  },
];

export const bookingHistories: BookingHistory[] = [
  {
    id: 4,
    bookingCode: "BK-20260503-004",
    patientId: 1,
    doctorId: 3,
    appointmentDate: "2026-05-07",
    appointmentTime: "09:00",
    appointmentEndTime: "10:00",
    status: "confirmed",
    complaint: "Kontrol demam dan batuk anak.",
    patientName: "Raka Mahendra",
    patientCode: "PT-2401-02",
    department: "Pediatric Wing",
    room: "Consultation Room 2A",
    location: "MedCare Main Clinic, Level 2",
    instructions: [
      "Datang 15 menit lebih awal untuk proses verifikasi data.",
      "Bawa kartu identitas pasien dan kartu asuransi jika ada.",
      "Catat suhu tubuh dan obat yang sudah dikonsumsi sebelum konsultasi.",
    ],
    createdAt: "2026-05-02T19:30:00+07:00",
  },
  {
    id: 5,
    bookingCode: "BK-20260503-005",
    patientId: 1,
    doctorId: 3,
    appointmentDate: "2026-05-03",
    appointmentTime: "10:00",
    appointmentEndTime: "11:00",
    status: "confirmed",
    complaint: "Konsultasi alergi makanan pada anak.",
    patientName: "Nadia Putri",
    patientCode: "PT-2401-03",
    department: "Pediatric Wing",
    room: "Consultation Room 2A",
    location: "MedCare Main Clinic, Level 2",
    instructions: [
      "Bawa catatan makanan yang dikonsumsi dalam 3 hari terakhir.",
      "Bawa obat alergi yang pernah digunakan jika ada.",
      "Datang 15 menit sebelum jadwal konsultasi.",
    ],
    createdAt: "2026-05-02T20:05:00+07:00",
  },
  {
    id: 1,
    bookingCode: "BK-20260508-001",
    patientId: 1,
    doctorId: 1,
    appointmentDate: "2026-05-08",
    appointmentTime: "09:00",
    appointmentEndTime: "10:00",
    status: "confirmed",
    complaint: "Kontrol tekanan darah dan nyeri dada ringan.",
    patientName: "Eleanor Vance",
    patientCode: "PT-99283-CL",
    department: "Cardiology Wing",
    room: "Consultation Room 3B",
    location: "MedCare Heart Center, Level 3",
    instructions: [
      "Datang 15 menit lebih awal untuk melengkapi administrasi.",
      "Bawa daftar obat yang sedang dikonsumsi.",
      "Puasa tidak diperlukan untuk konsultasi ini.",
    ],
    createdAt: "2026-05-01T10:24:00+07:00",
  },
  {
    id: 2,
    bookingCode: "BK-20260424-002",
    patientId: 1,
    doctorId: 2,
    appointmentDate: "2026-04-24",
    appointmentTime: "13:30",
    appointmentEndTime: "14:30",
    status: "completed",
    complaint: "Sakit kepala berulang selama dua minggu.",
    patientName: "Bima Santoso",
    patientCode: "PT-2404-18",
    department: "Neurology Wing",
    room: "Consultation Room 4C",
    location: "MedCare Main Clinic, Level 4",
    instructions: [
      "Bawa hasil pemeriksaan sebelumnya jika ada.",
      "Catat frekuensi dan pemicu sakit kepala sebelum konsultasi.",
      "Hindari konsumsi kafein berlebihan sebelum pemeriksaan.",
    ],
    createdAt: "2026-04-20T08:15:00+07:00",
  },
  {
    id: 3,
    bookingCode: "BK-20260412-003",
    patientId: 1,
    doctorId: 3,
    appointmentDate: "2026-04-12",
    appointmentTime: "10:15",
    appointmentEndTime: "11:15",
    status: "completed",
    complaint: "Konsultasi demam anak dan penurunan nafsu makan.",
    patientName: "Siti Aulia",
    patientCode: "PT-2404-07",
    department: "Pediatric Wing",
    room: "Consultation Room 2A",
    location: "MedCare Main Clinic, Level 2",
    instructions: [
      "Bawa buku imunisasi anak jika tersedia.",
      "Catat suhu tubuh anak selama 24 jam terakhir.",
      "Bawa daftar obat yang sudah diberikan di rumah.",
    ],
    createdAt: "2026-04-10T16:42:00+07:00",
  },
];

export function getSpecializationById(id: number) {
  return specializations.find((specialization) => specialization.id === id);
}

export const doctors: DoctorWithSpecialization[] = doctorTable.map((doctor) => {
  const specialization = getSpecializationById(doctor.specializationId);

  return {
    ...doctor,
    specialization: specialization?.name ?? "General Medicine",
    specializationDescription: specialization?.description ?? "",
  };
});

export function getBookingHistoryRows(): BookingHistoryRow[] {
  return bookingHistories.map((booking) => {
    const doctor = doctors.find((item) => item.id === booking.doctorId);
    const appointmentEndTime =
      booking.appointmentEndTime ??
      minutesToTime(timeToMinutes(booking.appointmentTime) + 60);

    return {
      ...booking,
      doctorName: doctor?.name ?? "Unknown Doctor",
      doctorImage: doctor?.image ?? "/doc_sarah.jpg",
      specialization: doctor?.specialization ?? "General Medicine",
      appointmentEndTime,
      patientName: booking.patientName ?? "Patient Name",
      patientCode: booking.patientCode ?? `PT-${booking.patientId}`,
      department: booking.department ?? `${doctor?.specialization ?? "General"} Department`,
      room: booking.room ?? "Consultation Room",
      location: booking.location ?? "MedCare Main Clinic",
      instructions: booking.instructions ?? [
        "Datang 15 menit lebih awal untuk proses administrasi.",
        "Bawa kartu identitas dan dokumen pendukung.",
        "Bawa daftar obat yang sedang dikonsumsi.",
      ],
    };
  });
}

export function getBookingHistoryByCode(bookingCode: string) {
  return getBookingHistoryRows().find(
    (booking) => booking.bookingCode === bookingCode,
  );
}

export function getTopDoctors(items: DoctorWithSpecialization[]) {
  return [...items]
    .sort((a, b) => b.weeklyBooking - a.weeklyBooking)
    .slice(0, 3);
}

export function getUpcomingSchedule(
  doctor: DoctorWithSpecialization,
  startDate = new Date(),
  days = 5,
): UpcomingScheduleItem[] {
  return Array.from({ length: days }, (_, index) => {
    const date = addDays(startDate, index);
    const day = weekdays[date.getDay()];
    const schedule = doctor.schedules.find((item) => item.day === day);
    const status = schedule?.status ?? "off";
    const hasTime = status === "available" && schedule?.start && schedule?.end;

    return {
      date: formatDateValue(date),
      day,
      dayLabel: formatDayLabel(date, index === 0),
      timeLabel: hasTime
        ? formatTimeRange(schedule.start!, schedule.end!)
        : schedule?.note ?? "Off Duty",
      status,
      isToday: index === 0,
    };
  });
}

export function getAppointmentSlots(
  doctor: DoctorWithSpecialization,
  date = new Date(),
): AppointmentSlot[] {
  const day = weekdays[date.getDay()];
  const dateValue = formatDateValue(date);
  const schedule = doctor.schedules.find((item) => item.day === day);

  if (
    !schedule ||
    schedule.status !== "available" ||
    !schedule.start ||
    !schedule.end ||
    !schedule.maxPatients
  ) {
    return [];
  }

  const startMinutes = timeToMinutes(schedule.start);
  const endMinutes = timeToMinutes(schedule.end);
  const workingHours = Math.max(0, Math.floor((endMinutes - startMinutes) / 60));

  if (workingHours <= 0) return [];

  const baseCapacity = Math.floor(schedule.maxPatients / workingHours);
  const extraCapacitySlots = schedule.maxPatients % workingHours;

  return Array.from({ length: workingHours }, (_, index) => {
    const slotStart = minutesToTime(startMinutes + index * 60);
    const slotEnd = minutesToTime(startMinutes + (index + 1) * 60);
    const capacity = baseCapacity + (index < extraCapacitySlots ? 1 : 0);
    const booked = bookingHistories.filter(
      (booking) =>
        booking.doctorId === doctor.id &&
        booking.appointmentDate === dateValue &&
        booking.appointmentTime === slotStart &&
        booking.status === "confirmed",
    ).length;

    return {
      date: dateValue,
      start: slotStart,
      end: slotEnd,
      label: formatTimeRange(slotStart, slotEnd),
      capacity,
      booked,
      remaining: Math.max(0, capacity - booked),
    };
  });
}
