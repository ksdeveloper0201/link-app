"use client";

import React, { useEffect, useState } from "react";

import { ResisterModal } from "@/components/modals/ResisterModal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return <ResisterModal />;
};
