import react from "react";

import "./style.css";

type Mode = "large" | "small" | "link";

interface ButtonProps {
    mode: Mode;
    text: string;
    onClick: () => void;
}

const Button = ({ text, mode, onClick }: ButtonProps) => {
    return <button className={mode} onClick={onClick}>{text}</button>;
};

export { Button };
