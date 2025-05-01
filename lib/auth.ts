import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/lib/prisma";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials);
                return null;
            },
        }),
    ],
    adapter: PrismaAdapter(db),
    callbacks: {},
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
    },
} satisfies NextAuthOptions;
