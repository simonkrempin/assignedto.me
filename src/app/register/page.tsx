"use client";

import "./page.css";
import { InputField } from "@/components";
import React from "react";

export default function Register(): React.ReactElement {
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    console.log(username);

    return (
        <main className="main">
            <div className="container">
                    <h2>Willkommen</h2>
                    <div className="input">
                    <InputField inputMode="large" text={username} changeText={setUsername} label="Nutzername" />
                    </div>
                    <div className="input">
                        <InputField inputMode="large" text={email} changeText={setEmail} label="Email" />
                    </div>
                    <div className="input">
                        <InputField inputMode="large" text={password} changeText={setPassword} label="Passwort" />
                    </div>
                    <div className="input">
                        <InputField inputMode="large" text={confirmPassword} changeText={setConfirmPassword} label="Passwort Wiederholen" />
                    </div>
            </div>
        </main>
    );
}
