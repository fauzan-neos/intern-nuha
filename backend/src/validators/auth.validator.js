const { z } = require("zod");

const createUserSchema = z.object({
    fullname: z.string().min(1, "Fullname is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

const loginUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

module.exports = { createUserSchema, loginUserSchema };