"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/prisma";
import { ResisterSchema } from "@/schemas";
import { getUserByEmail } from "@/store/user";

export const registerUser = async (values: z.infer<typeof ResisterSchema>) => {
    const validatedField = ResisterSchema.safeParse(values);

    if (!validatedField.success) {
        return { error: "不正な値です" };
    }

    const { email, password, image, name } = validatedField.data;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return { error: "不正な値です" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                name,
                email,
                image,
                password: hashedPassword,
            },
        });
        return { success: "ユーザー作成に成功しました" };
    } catch (error: any) {
        console.error("[REGISTER_USER]", error);
        return { error: "サーバーエラー" };
    }
};
