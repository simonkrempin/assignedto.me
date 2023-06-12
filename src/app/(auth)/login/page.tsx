"use client";

import React from "react";
import styling from "./page.module.css";
import { Button, InputField } from "@components";
import { auth } from "@services/authService";
import { useRouter } from "next/navigation";

export default function Login(): React.ReactElement {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const router = useRouter();

    const _login = () => {
        auth(email, password)
            .then((res) => {
                router.push("/");
            })
            .catch(() => {});
    };

    return (
        <div className={styling.container}>
            <h1>Willkommen</h1>
            <div className={styling.inputFields}>
                <InputField fieldStyle="large" text={email} changeText={setEmail} label="Email" />
                <InputField fieldStyle="large" text={password} changeText={setPassword} label="Passwort" inputMode="password"/>
            </div>
            <div>
                <Button mode="large" onClick={_login} label="ANMELDEN" />
                <div className={styling.seperator}>
                    <div className={styling.hr}>
                        <span className={styling.span}>oder</span>
                    </div>
                </div>
                <div className={styling.anmelden}>
                    <a href="/register">Registrieren</a>
                </div>
            </div>
        </div>
    );
}
