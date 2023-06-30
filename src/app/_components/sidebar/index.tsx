"use client";

import React from "react";

import { Button, Calendar } from "@components";

import { useAuth, useAuthDispatch } from "@contexts/authContext";
import { useRouter } from "next/navigation";

import logoutIcon from "@icons/logout_black_24dp.svg";
import settingsIcon from "@icons/settings_black_24dp.svg";
import styling from "./index.module.css";

interface SidebarProps {
    setCurrentlySelected: (value: "todo" | "assigned" | null) => void;
    setCache: any; 
}

export default function Sidebar({ setCurrentlySelected, setCache }: SidebarProps) {
    const { username } = useAuth();
    const { deleteUser } = useAuthDispatch();

    const router = useRouter();

    const onSignOutClicked = () => {
        deleteUser();
        setCache({ type: "reset" });
        router.push("/login");
    };

    const onSettingsClicked = () => {
        router.push("/settings");
    };

    const onToDoClicked = () => {
        setCurrentlySelected("todo");
    };

    const onAssignedClicked = () => {
        setCurrentlySelected("assigned");
    };

    return (
        <div className={styling.sidebar}>
            <div className={styling.right_align}>
                <h1>{username}</h1>
                <div className={styling.buttons}>
                    <Button mode="large" onClick={onToDoClicked} label="To Do" />
                    <Button mode="large" onClick={onAssignedClicked} label="Erstellt" />
                    <Calendar />
                </div>
                <div className={styling.buttons}>
                    <Button mode="link" onClick={onSettingsClicked} label="Einstellungen" icon={settingsIcon} />
                    <Button mode="link" onClick={onSignOutClicked} label="Abmelden" icon={logoutIcon} />
                </div>
            </div>
        </div>
    );
}
