import { db } from "@/lib/prisma";
import { SafeUser } from "@/types/prisma";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
    const user = await db.user.findUnique({ where: { email } });
    return user;
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
