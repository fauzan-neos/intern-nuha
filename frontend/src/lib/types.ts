export type Role = "USER" | "ADMIN";

export type Weekday = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export type ScheduleStatus = "AVAILABLE" | "BLOCKED" | "OFF";

export type BookingStatus = "BOOKED" | "REGISTERED" | "COMPLETED" | "CANCELED";

export interface User {
  id: number;
  uuid: string;
  fullname: string;
  email: string;
  role: Role;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Specialization {
  id: number;
  uuid: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: number;
  uuid: string;
  name: string;
  isActive: boolean;
  employeeCode: string;
  email: string;
  image?: string | null;
  experienceYears: number;
  weeklyBooking: number;
  rating: number;
  specializationId: number;
  department?: string;
  room?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relasi (Opsional tergantung include di backend)
  specialization?: Specialization;
  schedules?: DoctorSchedule[];
}

export interface DoctorSchedule {
  id: number;
  uuid: string;
  day: Weekday;
  date?: string | null;
  status: ScheduleStatus;
  maxPatient: number;
  start: string;
  end: string;
  note?: string | null;
  doctorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: number;
  uuid: string;
  rekamMedisId: string;
  nik: string;
  userId: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;
  uuid: string;
  bookingCode: string;
  bookingStatus: BookingStatus;
  
  // Data Identitas
  patientName: string;
  nik: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
  paymentMethod: string;
  complaint: string;
  
  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  instructions?: string[];
  
  userId: number;
  doctorId: number;
  scheduleId: number;
  patientId?: number | null;
  
  // Relasi
  user?: User;
  doctor?: Doctor;
  schedule?: DoctorSchedule;
  patient?: Patient;
  
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  doctorId: number;
  patientName: string;
  patientId?: number;
  nik: string;
  birthDate: string;
  gender: "male" | "female";
  phone: string;
  email: string;
  address: string;
  paymentMethod: "umum" | "bpjs";
  complaint: string;

  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;

  scheduleId: number;
}

export interface Access {
  id: number;
  title: string;
}

export interface BookingHistory {
  id: number;
  uuid: string;
  bookingCode: string;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  status: BookingStatus;
  complaint: string;
  patientName?: string;
  patientCode?: string;
  department?: string;
  room?: string;
  location?: string;
  instructions?: string[];
  createdAt: string;
  updatedAt: string;
}

export type BookingHistoryRow = Booking & {
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

export interface HospitalUpdate {
  id: number;
  uuid: string;
  title: string;
  description: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}


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

export type AppointmentSession = {
  sessionName: "Sesi Pagi" | "Sesi Sore";
  timeRange: string;
  slots: AppointmentSlot[];
  totalRemaining: number;
  startTime: string; // Waktu awal sesi untuk disimpan di DB
  endTime: string; // Waktu akhir sesi
};


