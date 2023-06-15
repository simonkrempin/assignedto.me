"use client";

import React from "react";

import styling from "./page.module.css";

import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/authContext";
import { Button, InputField } from "@components";

export default function Settings() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

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

    const onSaveClicked = () => {};

    const onCancelClicked = () => {};

    return (
        <>
            <main className={styling.main}>
                <h1>Settings</h1>
                <div className={styling.fields}>
                    <InputField label="Nutzername" text={username} changeText={setUsername} fieldStyle="large" />
                    <InputField label="E-Mail" text={email} changeText={setEmail} fieldStyle="large" />
                    <InputField label="Passwort" text={password} changeText={setPassword} fieldStyle="large" />
                    <InputField
                        label="Password-Wiederholen"
                        text={passwordRepeat}
                        changeText={setPasswordRepeat}
                        fieldStyle="large"
                    />
                </div>
                <div className={styling.buttons}>
                    <Button mode="large" onClick={() => {}} label="Speichern" />
                    <Button mode="large" onClick={() => {}} label="Abbrechen" />
                </div>
            </main>
        </>
    );
}
