"use client";

import React from "react";
import "./page.css";
import { InputField } from "@components";

export default function Login(): React.ReactElement {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    return (
        <main className="main">
            <div className="container">
                <h1>Willkommen</h1>
                   <div className="eingabe"> 
                    <InputField inputMode="large" text= {email} changeText={setEmail}  label="Email" />
                    </div>
                    <div className="eingabe">
                    <InputField inputMode="large" text= {password} changeText={setPassword}  label="Passwort" />
                    </div>
                    <div className="eingabe">
                    <button mode= "large" text="Anmelden"></button>
                    </div>

                    <div>
                    <hr/>
                    </div>
                    
                    <div className="eingabe">
                    <button mode= "large" text="Regristrieren"></button>
                    </div>
                
            </div>

        </main>
    );
}

