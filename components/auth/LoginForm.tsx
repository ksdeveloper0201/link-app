"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useResisterModal } from "@/hooks/useResisterModal";

export const LoginForm = () => {
    const { onOpen } = useResisterModal();

    return (
        <Button
            onClick={() => onOpen()}
            variant="link"
            className="font-normal w-full"
        >
            新規登録
        </Button>
    );
};
