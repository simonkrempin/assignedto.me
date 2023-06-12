"use client";

import "./page.css";
import { Button, InputField } from "@/components";
import React from "react";

export default function Register(): React.ReactElement {
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    console.log(username);

    return (
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
                    <div className="input">
                        <Button mode="large" text="Registrieren"></Button>
                    </div>
                    <div>
                        <hr />
                    </div>
                    <div className="input linkButton">
                        <Button mode="link" text="Anmelden"></Button>
                    </div>
            </div>
    );
}
