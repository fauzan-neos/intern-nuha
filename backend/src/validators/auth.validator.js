const { z } = require("zod");

const createUserSchema = z.object({
    fullname: z.string().min(1, "Nama lengkap harus diisi"),
    email: z.string().email("Email tidak Valid"),
    password: z.string().min(8, "Password harus minimal 8 karakter")
});

const loginUserSchema = z.object({
    email: z.string().email("Email tidak Valid"),
    password: z.string().min(1, "Password harus diisi")
});

module.exports = { createUserSchema, loginUserSchema };