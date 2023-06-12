"use client";

import styling from "./page.module.css";
import { Button, InputField } from "@components";
import { register } from "@services/authService";
import React from "react";
import { useRouter } from "next/navigation";

export default function Register(): React.ReactElement {
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const router = useRouter();

    const registerUser = () => {
        if (password !== confirmPassword) {
            return;
        }

        register({
            username,
            email,
            password,
            confirmPassword,
        })
            .then((res) => {
                console.log(res);
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styling.container}>
            <h2>Willkommen</h2>
            <div className={styling.s1}>
                <InputField fieldStyle="large" text={username} changeText={setUsername} label="Nutzername" />
                <InputField fieldStyle="large" text={email} changeText={setEmail} label="Email" />
                <InputField
                    fieldStyle="large"
                    text={password}
                    changeText={setPassword}
                    label="Passwort"
                    inputMode="password"
                />
                <InputField
                    fieldStyle="large"
                    text={confirmPassword}
                    changeText={setConfirmPassword}
                    label="Passwort Wiederholen"
                    inputMode="password"
                />
            </div>
            <div className={styling.s2}>
                <Button mode="large" label="Registrieren" onClick={registerUser} />
                <div className={styling.seperator}>
                    <div className={styling.hr}>
                        <span className={styling.span}>oder</span>
                    </div>
                </div>
                <div className={styling.anmelden}>
                    <a href="/login">Anmelden</a>
                </div>
            </div>
        </div>
    );
}
