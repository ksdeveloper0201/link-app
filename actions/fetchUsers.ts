"use server";

import { auth } from "@/lib/nextauth";
import { getSafeUsersByName } from "@/store/user";

export const fetchUsersByName = async (name?: string) => {
    const currentUser = await auth();
    if (!currentUser) {
        return { error: "セッション情報がありません" };
    }

    const safeUsers = await getSafeUsersByName(name, currentUser.id);
    return { users: safeUsers };
};
