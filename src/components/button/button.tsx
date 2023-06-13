import React from "react";

import styling from "./style.module.css";

interface inputProps {
    mode: "large" | "small" | "link";
    onClick: () => void;
    label?: string;
    loading?: boolean;
}

const Button = ({ label, mode, onClick, loading = false }: inputProps) => {
    return (
        <button className={styling.large} onClick={onClick}>
            {loading ? <div className={styling.loader} /> : label}
        </button>
    );
};

export { Button };
