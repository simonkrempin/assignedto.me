"use client";

import styling from "./page.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/authContext";

export default function Main() {
    const { token } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [])
    
    if (!token) {
        return <div></div>;
    }

    return (
        <main className={styling.main}>
            <div className={styling.sidebar}></div>
            <div className={styling.tasks}></div>
        </main>
    );
}
