import { db } from "@/lib/prisma";
import { SafeUser } from "@/types/prisma";
import { User } from "@prisma/client";
import { createSecureServer } from "http2";

export const getUserByEmail = async (email: string) => {
    const user = await db.user.findUnique({ where: { email } });
    return user;
};

export const getSafeUserById = async (id: string): Promise<SafeUser | null> => {
    const user = await db.user.findUnique({
        where: { id },
    });
    if (!user) return null;
    return convertSafeUser(user);
};

export const getSafeUsersByName = async (
    name?: string,
    ignoreId?: string
): Promise<SafeUser[]> => {
    const users = await db.user.findMany({
        where: {
            name: {
                contains: name,
            },
            id: { not: ignoreId },
        },
    });
    const safeUsers = users.map((user) => convertSafeUser(user));
    return safeUsers;
};

export const convertSafeUser = (user: User): SafeUser => {
    const { password, ...safeUser } = user;
    return safeUser;
};
