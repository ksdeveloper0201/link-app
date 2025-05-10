import * as z from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required!",
    }),
    image: z.string().min(1, {
        message: "Images is required!",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});
