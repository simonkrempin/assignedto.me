"use client";

import styling from "./page.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/authContext";

export default function Main() {
    const { token } = useAuth();
    const router = useRouter();

    if (!token) {
        router.push("/login");
    }

    if (!token) {
        return null;
    }

    return (
        <main className={styling.main}>
            <div className={styling.sidebar}></div>
            <div className={styling.tasks}></div>
        </main>
    );
}
