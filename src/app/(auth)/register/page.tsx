"use client";

import "./page.css";
import { Button, InputField } from "@components";
import { register } from "@src/service/authService";
import React from "react";
import { useRouter } from "next/navigation";

interface RegisterState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const registerReducer = (state: RegisterState, action: Partial<RegisterState>) => {
    return { ...state, ...action };
};

export default function Register(): React.ReactElement {
    const [state, dispatch] = React.useReducer(registerReducer, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();

    const registerUser = () => {
        register({
            username: state.username,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
        }).then((res) => {
            console.log(res);
            router.push("/");
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="container">
            <h2>Willkommen</h2>
            <InputField
                inputMode="large"
                text={state.username}
                changeText={(username) => dispatch({ username })}
                label="Nutzername"
            />
            <InputField
                inputMode="large"
                text={state.email}
                changeText={(email) => dispatch({ email })}
                label="Email"
            />
            <InputField
                inputMode="large"
                text={state.password}
                changeText={(password) => dispatch({ password })}
                label="Passwort"
            />
            <InputField
                inputMode="large"
                text={state.confirmPassword}
                changeText={(confirmPassword) => dispatch({ confirmPassword })}
                label="Passwort Wiederholen"
            />
            <Button mode="large" text="Registrieren" onClick={registerUser}></Button>
            <hr />
            <div className="anmelden">
                <a href="/login">Anmelden</a>
            </div>
        </div>
    );
}
