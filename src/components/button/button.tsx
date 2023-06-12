import React from "react";

import styling from "./style.module.css";

interface inputProps {
    mode: "large" | "small" | "link";
    onClick: () => void;
    label: string;
}

const Button = ({label, mode, onClick,}: inputProps ) => {
    return <button className={styling.large} onClick={onClick}>{label}</button>
}

export { Button };
