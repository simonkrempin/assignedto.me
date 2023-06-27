import React from "react";

import styling from "./style.module.css";
import Image from "next/image";

interface inputProps {
    mode: "large" | "small" | "link";
    onClick: () => void;
    label?: string;
    loading?: boolean;
    icon?: any;
}

const Button = ({ label, mode, onClick, loading = false, icon }: inputProps) => {
    return (
        <button className={styling[mode]} onClick={onClick}>
            {icon ? <Image className={styling.icon} src={icon} alt="icon" /> : null}
            {loading ? <div className="loader" /> : label}
        </button>
    );
};

export { Button };
