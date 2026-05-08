import { z } from "zod";

export const bookingSchema = z.object({
  patientName: z.string().min(2, {
      message: "Nama pasien minimal 2 karakter",
    }),

  nik: z.string().length(16, {
      message: "NIK harus 16 digit",
    }).refine((val) => !isNaN(Number(val)),{
        message: "NIK hanya boleh angka",
      }
    ),

  birthDate: z.string().min(1, {
      message: "Tanggal lahir wajib diisi",
    }),

  gender: z.enum(["male", "female"], {
    message: "Jenis kelamin wajib dipilih",
  }),

  phone: z.string().min(8, {
      message: "Nomor telepon minimal 8 digit",
    }).max(15, {
      message: "Nomor telepon maksimal 15 digit",
    }).refine((val) => !isNaN(Number(val)),{
        message: "Nomor telepon hanya boleh angka",
      }
    ),

  email: z.email({
    message: "Email tidak valid",
  }),

  address: z.string().min(5, {
      message: "Alamat minimal 5 karakter",
    }),

  paymentMethod: z.enum(["umum", "bpjs"], {
    message: "Asuransi wajib dipilih",
  }),

  complaint: z.string().min(5, {
      message: "Keluhan utama minimal 5 karakter",
    }),

  appointmentDate: z.string().min(1, {
      message: "Silakan pilih tanggal kunjungan",
    }),

  scheduleId: z.number(),

  slotStart: z.string().min(1, {
      message: "Pilih jadwal konsultasi",
    }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;