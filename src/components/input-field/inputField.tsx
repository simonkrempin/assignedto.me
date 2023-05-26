"use client";

import react from "react";

import "./style.css";

type InputMode = "user" | "keineAhnung";

interface inputProps {
    children: React.ReactNode;
    InputMode: "inputMode";
}

const InputField = () => {
    return <div>
        <input type="text"></input>
    </div>; 
};

export { InputField };
