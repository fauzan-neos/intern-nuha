type Schedule = {
  day: "mon" | "tue" | "wed" | "thu" | "fri";
  start: string | null;
  end: string | null;
};

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  image: string;
  schedules: Schedule[];
  weeklyBooking: number;
};

type Specialization = {
  id: number;
  name: string;
  description: string;
};

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Drs. Sarah",
    specialization: "Cardiology",
    image: "/doc_sarah.jpg",
    weeklyBooking: 52,
    schedules: [
      { day: "mon", start: "09:00", end: "14:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "13:00", end: "18:00" },
      { day: "thu", start: "09:00", end: "14:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 2,
    name: "Dr. Marcus",
    specialization: "Neurology",
    image: "/doc_marcus.jpg",
    weeklyBooking: 50,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "08:00", end: "13:00" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "10:00", end: "16:00" },
      { day: "fri", start: "08:00", end: "13:00" },
    ],
  },
  {
    id: 3,
    name: "Dr. Eko",
    specialization: "Neurology",
    image: "/doc_eko.jpg",
    weeklyBooking: 40,
    schedules: [
      { day: "mon", start: "09:00", end: "15:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "08:00", end: "13:00" },
      { day: "thu", start: "10:00", end: "16:00" },
      { day: "fri", start: "08:00", end: "13:00" },
    ],
  },
  {
    id: 4,
    name: "Dr. Amanda Lee",
    specialization: "Dermatology",
    image: "/doctors/doctor4.jpg",
    weeklyBooking: 30,
    schedules: [
      { day: "mon", start: "09:00", end: "12:00" },
      { day: "tue", start: "10:00", end: "14:00" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "13:00", end: "17:00" },
      { day: "fri", start: "09:00", end: "12:00" },
    ],
  },
  {
    id: 5,
    name: "Dr. Kevin Patel",
    specialization: "Oncology",
    image: "/doctors/doctor5.jpg",
    weeklyBooking: 32,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "08:00", end: "13:00" },
      { day: "wed", start: "09:00", end: "15:00" },
      { day: "thu", start: null, end: null },
      { day: "fri", start: "10:00", end: "14:00" },
    ],
  },
  {
    id: 6,
    name: "Dr. Sofia Martinez",
    specialization: "Gynecology",
    image: "/doctors/doctor6.jpg",
    weeklyBooking: 33,
    schedules: [
      { day: "mon", start: "09:00", end: "13:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "10:00", end: "16:00" },
      { day: "thu", start: "08:00", end: "12:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 7,
    name: "Dr. James Carter",
    specialization: "Orthopedic Surgery",
    image: "/doctors/doctor7.jpg",
    weeklyBooking: 20,
    schedules: [
      { day: "mon", start: "10:00", end: "15:00" },
      { day: "tue", start: "09:00", end: "12:00" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "13:00", end: "17:00" },
      { day: "fri", start: "09:00", end: "14:00" },
    ],
  },
  {
    id: 8,
    name: "Dr. Lina Wong",
    specialization: "Endocrinology",
    image: "/doctors/doctor8.jpg",
    weeklyBooking: 21,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "08:00", end: "12:00" },
      { day: "wed", start: "09:00", end: "13:00" },
      { day: "thu", start: null, end: null },
      { day: "fri", start: "10:00", end: "15:00" },
    ],
  },
  {
    id: 9,
    name: "Dr. Michael Brown",
    specialization: "Gastroenterology",
    image: "/doctors/doctor9.jpg",
    weeklyBooking: 20,
    schedules: [
      { day: "mon", start: "08:00", end: "12:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "10:00", end: "14:00" },
      { day: "thu", start: "09:00", end: "13:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 10,
    name: "Dr. Aisha Khan",
    specialization: "Pulmonology",
    image: "/doctors/doctor10.jpg",
    weeklyBooking: 22,
    schedules: [
      { day: "mon", start: "09:00", end: "13:00" },
      { day: "tue", start: "10:00", end: "15:00" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "08:00", end: "12:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 11,
    name: "Dr. Daniel Kim",
    specialization: "Urology",
    image: "/doctors/doctor11.jpg",
    weeklyBooking: 18,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "09:00", end: "14:00" },
      { day: "wed", start: "08:00", end: "12:00" },
      { day: "thu", start: null, end: null },
      { day: "fri", start: "10:00", end: "16:00" },
    ],
  },
  {
    id: 12,
    name: "Dr. Emily Davis",
    specialization: "Psychiatry",
    image: "/doctors/doctor12.jpg",
    weeklyBooking: 29,
    schedules: [
      { day: "mon", start: "10:00", end: "16:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "09:00", end: "13:00" },
      { day: "thu", start: "11:00", end: "15:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 13,
    name: "Dr. Ahmed Hassan",
    specialization: "Radiology",
    image: "/doctors/doctor13.jpg",
    weeklyBooking: 12,
    schedules: [
      { day: "mon", start: "08:00", end: "12:00" },
      { day: "tue", start: "09:00", end: "13:00" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "10:00", end: "14:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 14,
    name: "Dr. Olivia Green",
    specialization: "Nephrology",
    image: "/doctors/doctor14.jpg",
    weeklyBooking: 10,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "08:00", end: "12:00" },
      { day: "wed", start: "09:00", end: "14:00" },
      { day: "thu", start: null, end: null },
      { day: "fri", start: "10:00", end: "13:00" },
    ],
  },
  {
    id: 15,
    name: "Dr. Lucas Silva",
    specialization: "Ophthalmology",
    image: "/doctors/doctor15.jpg",
    weeklyBooking: 26,
    schedules: [
      { day: "mon", start: "09:00", end: "13:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "10:00", end: "15:00" },
      { day: "thu", start: "08:00", end: "12:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 16,
    name: "Dr. Nina Petrova",
    specialization: "Rheumatology",
    image: "/doctors/doctor16.jpg",
    weeklyBooking: 14,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "09:00", end: "13:00" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "10:00", end: "15:00" },
      { day: "fri", start: "08:00", end: "12:00" },
    ],
  },
  {
    id: 17,
    name: "Dr. Ethan Walker",
    specialization: "Emergency Medicine",
    image: "/doctors/doctor17.jpg",
    weeklyBooking: 27,
    schedules: [
      { day: "mon", start: "00:00", end: "23:59" },
      { day: "tue", start: "00:00", end: "23:59" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "00:00", end: "23:59" },
      { day: "fri", start: "00:00", end: "23:59" },
    ],
  },
  {
    id: 18,
    name: "Dr. Grace Tan",
    specialization: "Anesthesiology",
    image: "/doctors/doctor18.jpg",
    weeklyBooking: 21,
    schedules: [
      { day: "mon", start: "08:00", end: "12:00" },
      { day: "tue", start: "08:00", end: "12:00" },
      { day: "wed", start: null, end: null },
      { day: "thu", start: "08:00", end: "12:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 19,
    name: "Dr. Robert King",
    specialization: "Pathology",
    image: "/doctors/doctor19.jpg",
    weeklyBooking: 19,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "09:00", end: "13:00" },
      { day: "wed", start: "09:00", end: "13:00" },
      { day: "thu", start: null, end: null },
      { day: "fri", start: "10:00", end: "14:00" },
    ],
  },
  {
    id: 20,
    name: "Dr. Chloe Dubois",
    specialization: "Plastic Surgery",
    image: "/doctors/doctor20.jpg",
    weeklyBooking: 7,
    schedules: [
      { day: "mon", start: "10:00", end: "14:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "09:00", end: "13:00" },
      { day: "thu", start: null, end: null },
      { day: "fri", start: "11:00", end: "15:00" },
    ],
  },
  {
    id: 21,
    name: "Dr. Victor Ivanov",
    specialization: "Hematology",
    image: "/doctors/doctor21.jpg",
    weeklyBooking: 8,
    schedules: [
      { day: "mon", start: null, end: null },
      { day: "tue", start: "08:00", end: "12:00" },
      { day: "wed", start: "10:00", end: "15:00" },
      { day: "thu", start: null, end: null },
      { day: "fri", start: "09:00", end: "13:00" },
    ],
  },
  {
    id: 22,
    name: "Dr. Sophia Rossi",
    specialization: "Infectious Disease",
    image: "/doctors/doctor22.jpg",
    weeklyBooking: 31,
    schedules: [
      { day: "mon", start: "09:00", end: "13:00" },
      { day: "tue", start: null, end: null },
      { day: "wed", start: "10:00", end: "14:00" },
      { day: "thu", start: "09:00", end: "13:00" },
      { day: "fri", start: null, end: null },
    ],
  },
  {
    id: 23,
    name: "Dr. David Johnson",
    specialization: "Family Medicine",
    image: "/doctors/doctor23.jpg",
    weeklyBooking: 8,
    schedules: [
      { day: "mon", start: "08:00", end: "12:00" },
      { day: "tue", start: "08:00", end: "12:00" },
      { day: "wed", start: "08:00", end: "12:00" },
      { day: "thu", start: "08:00", end: "12:00" },
      { day: "fri", start: "08:00", end: "12:00" },
    ],
  },
];

export const specializations: Specialization[] = [
  { id: 1, name: "Cardiology", description: "Perawatan dan diagnosis jantung" },
  { id: 2, name: "Pediatrics", description: "Perawatan anak-anak" },
  { id: 3, name: "Neurology", description: "Perawatan otak & saraf" },
  { id: 4, name: "Orthopedics", description: "Perawatan tulang & otot" },
  { id: 5, name: "Dermatology", description: "Perawatan kulit" },
  { id: 6, name: "Oncology", description: "Perawatan kanker" },
  { id: 7, name: "Gynecology", description: "Kesehatan reproduksi wanita" },
  { id: 8, name: "Endocrinology", description: "Gangguan hormon" },
  { id: 9, name: "Gastroenterology", description: "Sistem pencernaan" },
  { id: 10, name: "Pulmonology", description: "Kesehatan paru-paru" },
  { id: 11, name: "Urology", description: "Saluran kemih & reproduksi pria" },
  { id: 12, name: "Psychiatry", description: "Kesehatan mental" },
  { id: 13, name: "Radiology", description: "Diagnosa pencitraan medis" },
  { id: 14, name: "Nephrology", description: "Kesehatan ginjal" },
  { id: 15, name: "Ophthalmology", description: "Kesehatan mata" },
  { id: 16, name: "Rheumatology", description: "Penyakit sendi & autoimun" },
  { id: 17, name: "Emergency Medicine", description: "Penanganan darurat" },
  { id: 18, name: "Anesthesiology", description: "Anestesi & manajemen nyeri" },
  { id: 19, name: "Pathology", description: "Analisis penyakit" },
  { id: 20, name: "Plastic Surgery", description: "Bedah estetika & rekonstruksi" },
  { id: 21, name: "Hematology", description: "Gangguan darah" },
  { id: 22, name: "Infectious Disease", description: "Penyakit infeksi" },
  { id: 23, name: "Family Medicine", description: "Layanan kesehatan umum" },
];

export function getTopDoctors(doctors: Doctor[]) {
  return [...doctors]
    .sort((a, b) => b.weeklyBooking - a.weeklyBooking)
    .slice(0, 3);
}