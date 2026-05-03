import { z } from "zod";

export const RegisterSchema = z.object({
    fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
    email: z.email({ message: "Email tidak valid" }),
    password: z.string().min(8, { message: "Password harus minimal 8 karakter" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;