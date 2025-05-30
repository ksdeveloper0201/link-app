import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s | LinkApp",
        default: "LinkApp",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={cn(inter.className, "bg-gray-100/30")}>
                <QueryProvider>
                    <AuthProvider>
                        <Toaster />
                        <ModalProvider />
                        {children}
                    </AuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
