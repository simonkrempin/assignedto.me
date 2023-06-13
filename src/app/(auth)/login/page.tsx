"use client";

import React, { useEffect } from "react";
import styling from "./page.module.css";
import { Button, InputField } from "@components";
import { useRouter } from "next/navigation";
import { useAuth, useAuthDispatch } from "@contexts/authContext";
import { useError } from "@hooks/useError";
import useSWR from "swr";

export default function Login(): React.ReactElement {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
    const { errorMessage, setErrorMessage } = useError(3000);

    const { token } = useAuth();
    const { setToken } = useAuthDispatch();

    const router = useRouter();

    const { data, isLoading, error } = useSWR(shouldFetch ? "/api/user/login" : null, async (url) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = new Error(await response.json()) as any;
            error.status = response.status;
            throw error;
        }

        return response.json();
    });

    if (token) {
        router.push("/");
    }

    const login = async () => {
        if (isLoading) return;

        if (!email || !password) {
            setErrorMessage("Bitte fülle alle Felder aus");
            return;
        }

        setShouldFetch(true);
    };

    useEffect(() => {
        if (error) {
            setErrorMessage(error.status === 400 ? "Email oder Passwort falsch" : "Ein Fehler ist aufgetreten");
            setShouldFetch(false);
            return;
        }

        if (data) {
            console.log(data);
            setToken(data.token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error]);

    return (
        <div className={styling.container}>
            <h1>Willkommen</h1>
            <div className={styling.inputFields}>
                <InputField fieldStyle="large" text={email} changeText={setEmail} label="Email" />
                <InputField
                    fieldStyle="large"
                    text={password}
                    changeText={setPassword}
                    label="Passwort"
                    inputMode="password"
                />
            </div>
            <p className={styling.errorText}>{errorMessage}</p>
            <div>
                <Button mode="large" onClick={login} label="ANMELDEN" loading={isLoading} />
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
