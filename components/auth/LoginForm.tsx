"use client";

import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { LOGIN_SUCCESS_REDIRECT } from "@/routes";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "./FormError";

export const LoginForm = () => {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const { onOpen } = useRegisterModal();

    const searchParams = useSearchParams();
    const urlError =
        searchParams?.get("error") === "CredentialsSignin"
            ? "Email, Passwordが正しくありません"
            : "";

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");

        startTransition(async () => {
            try {
                const res = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    callbackUrl: LOGIN_SUCCESS_REDIRECT,
                });
                if (res?.error) {
                    setError(res.error);
                }
            } catch (error) {
                console.error(error);
                setError("アプリエラー！");
            }
        });
    };

    return (
        <Card className="w-[400px] shadow-sm space-y-6 py-0 mt-16 relative">
            <CardHeader className="flex flex-col items-center bg-emerald-400/80 rounded-t-xl h-16 justify-center">
                <h1 className="text-2xl font-bold text-white">ログイン</h1>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="user@example.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-8 space-y-4 w-full">
                            <FormError message={error || urlError} />
                            <Button
                                type="submit"
                                className="w-full space-x-2"
                                disabled={isPending}
                            >
                                {isPending && (
                                    <Loader2 className="animate-spin" />
                                )}
                                <span>Login</span>
                            </Button>
                        </div>
                    </form>
                </Form>
                <Button
                    onClick={() => onOpen()}
                    variant="link"
                    className="font-normal w-full pt-12 md:pt-0"
                >
                    新規登録
                </Button>
            </CardContent>
        </Card>
    );
};
