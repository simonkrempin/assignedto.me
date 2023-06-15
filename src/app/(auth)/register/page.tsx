"use client";

import styling from "./page.module.css";
import { Button, InputField } from "@components";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, useAuthDispatch } from "@contexts/authContext";
import { useError } from "@hooks/useError";
import useSWR from "swr";

export default function Register(): React.ReactElement {
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
    const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
    const { errorMessage, setErrorMessage } = useError(3000);
    const { setToken } = useAuthDispatch();
    const { token } = useAuth();
    const router = useRouter();

    const { data, isLoading, error } = useSWR(shouldFetch ? "/api/user/register" : null, async (url) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, passwordConfirm }),
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

    const register = async () => {
        if (isLoading) return;

        if (!email || !password || !passwordConfirm || !username) {
            setErrorMessage("Bitte fülle alle Felder aus");
            return;
        }

        if (password !== passwordConfirm) {
            setErrorMessage("Passwörter stimmen nicht überein");
            return;
        }

        setShouldFetch(true);
    };

    React.useEffect(() => {
        if (error) {
            setErrorMessage(error.status === 400 ? "E-Mail bereits registriert" : "Ein Fehler ist aufgetreten");
            setShouldFetch(false);
            return;
        }

        if (data) {
            setToken(data.token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error]);

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
                    text={passwordConfirm}
                    changeText={setPasswordConfirm}
                    label="Passwort Wiederholen"
                    inputMode="password"
                />
            </div>
            <p className={styling.errorText}>{errorMessage}</p>
            <div className={styling.s2}>
                <Button mode="large" label="Registrieren" onClick={register} loading={isLoading} />
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
