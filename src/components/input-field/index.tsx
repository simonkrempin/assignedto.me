import react from "react";

import styles from "./style.module.css";

type FieldStyle = "large" | "small";

interface inputProps {
    label?: string;
    text: string;
    changeText: (text: string) => void;
    fieldStyle: FieldStyle;
    inputMode?: "text" | "password";
}

const InputField = ({ text, fieldStyle, label, changeText, inputMode = "text" }: inputProps) => {
    const onInput = (event: react.ChangeEvent<HTMLInputElement>) => {
        changeText(event.target.value);
    };

    switch (fieldStyle) {
        case "large":
            return (
                <div>
                    <label>{label}</label>
                    <input  className={styles.input} value={text} onInput={onInput} type={inputMode}></input>
                </div>
            );
        case "small":
            return (
                <p className={styles.p} contentEditable={true} suppressContentEditableWarning={true} onInput={onInput}>
                    {text}
                </p>
            );
        default:
            throw new Error("not implemented");
    }
};

export { InputField };
