"use client";

import "./style.css"
import { Button, InputField } from "@/components";
import React from "react";

export default function Settings() {
    const [username, setUsername] = React.useState<string>("");
    return (
        <main className="main">
            <h1>Einstellungen</h1>
            <div className="container">
            <InputField text={username} label="Nutzername" inputMode="large" changeText={setUsername}></InputField>
            <InputField text={username} label="Email" inputMode="large" changeText={setUsername}></InputField>
            <InputField text={username} label="Passwort" inputMode="large" changeText={setUsername}></InputField>
            <InputField text={username} label="Passwort Wiederholen" inputMode="large" changeText={setUsername}></InputField>
            <Button mode="large" text="Account Löschen"></Button>
            </div>
            <div className="save">
            <Button mode="small" text="Speichern"></Button>
            </div>
        </main>
    )
}