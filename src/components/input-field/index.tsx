import react from "react";

import styles from "./style.module.css";

type FieldStyle = "large" | "small";

interface inputProps {
    label?: string;
    text: string;
    changeText: (text: string) => void;
    fieldStyle: FieldStyle;
    inputMode?: "text" | "password";
    placeholder?: string;
}

const InputField = ({ text, fieldStyle, label, changeText, inputMode = "text", placeholder }: inputProps) => {
    const onInput = (event: react.ChangeEvent<HTMLInputElement>) => {
        changeText(event.target.value);
    };

    switch (fieldStyle) {
        case "large":
            return (
                <div>
                    <label>{label}</label>
                    <input className={styles.input} value={text} onInput={onInput} type={inputMode}></input>
                </div>
            );
        case "small":
            return (
                <input value={text} className={styles.p} onInput={onInput} placeholder={placeholder}/>
            );
        default:
            throw new Error("not implemented");
    }
};

export { InputField };
