import { z } from "zod";

export const bookingSchema = z.object({
  patientName: z.string().min(2, { message: "Nama pasien minimal 2 karakter" }),
  nik: z
    .string()
    .regex(/^\d{16}$/, { message: "NIK harus berisi 16 digit angka" }),
  birthDate: z.string().min(1, { message: "Tanggal lahir wajib diisi" }),
  gender: z.enum(["male", "female"], {
    message: "Jenis kelamin wajib dipilih",
  }),
  phone: z
    .string()
    .regex(/^[0-9+\-\s]{8,15}$/, { message: "Nomor telepon tidak valid" }),
  email: z.email({ message: "Email tidak valid" }),
  address: z.string().min(5, { message: "Alamat minimal 5 karakter" }),
  paymentMethod: z.enum(["insurance", "bpjs"], {
    message: "Asuransi wajib dipilih",
  }),
  complaint: z.string().min(5, { message: "Keluhan utama minimal 5 karakter" }),
  slotStart: z.string().min(1, { message: "Pilih jadwal konsultasi" }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
