"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { EmojiPicker } from "../inputs/EmojiPicker";
import { Button } from "../ui/button";
import { FormError } from "../auth/FormError";
import { toast } from "sonner";

import { useResisterModal } from "@/hooks/useResisterModal";
import { ResisterSchema } from "@/schemas";
import { registerUser } from "@/actions/registerUser";

export const ResisterModal = () => {
    const { isOpen, onClose } = useResisterModal();
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResisterSchema>>({
        resolver: zodResolver(ResisterSchema),
        defaultValues: {
            name: "",
            email: "",
            image: "😆",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof ResisterSchema>) => {
        console.log({ values });
        // TODO: 登録機能の実装

        setError("");

        startTransition(async () => {
            try {
                const res = await registerUser(values);
                if (res.error) {
                    setError(res.error);
                }
                if (res.success) {
                    toast(res.success);
                    handleClose();
                }
            } catch (error) {
                console.error(error);
                setError("アプリケーションエラー");
            }
        });
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ユーザ登録</DialogTitle>
                    <DialogDescription>ユーザー登録しよう！</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Alice"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <FormControl>
                                        <EmojiPicker
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <div>
                            <FormError message={error} />
                            <Button
                                type="submit"
                                className="w-full space-x-2"
                                disabled={isPending}
                            >
                                {isPending && (
                                    <Loader2 className="animate-spin" />
                                )}
                                <span>Resister</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
