"use client";

import styling from "./page.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/authContext";
import { Button, Calendar } from "@components";
import { deleteCookie } from "@lib/cookies";

export default function Main() {
    const { token } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, []);

    if (!token) {
        return <div></div>;
    }

    const onSignOutClicked = () => {
        deleteCookie("token");
        router.push("/login");
    }

    const onSettingsClicked = () => {
        router.push("/settings");
    }

    const onToDoClicked = () => {

    }

    const onAssignedClicked = () => {
        
    }

    return (
        <main className={styling.main}>
            <div className={styling.sidebar}>
                <h1>username</h1>
                <Button mode="large" onClick={onToDoClicked} label="To Do" />
                <Button mode="large" onClick={onAssignedClicked} label="Zugewiesen" />
                <Calendar />
                <Button mode="link" onClick={onSettingsClicked} label="Einstellungen" />
                <Button mode="link" onClick={onSignOutClicked} label="Abmelden" />
            </div>
            <div className={styling.tasks}></div>
        </main>
    );
}
