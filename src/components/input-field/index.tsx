import react from "react";

import styles from "./style.module.css";

type InputMode = "large" | "small";

interface inputProps {
    label?: string;
    text: string;
    changeText: (text: string) => void;
    inputMode: InputMode;
}

const InputField = ({ text, inputMode, label, changeText }: inputProps) => {
    const onChange = (event: react.ChangeEvent<HTMLInputElement>) => {
        changeText(event.target.value);
    }

    switch (inputMode) {
        case "large":
            return (
                <div>
                    <label>{label}</label>
                    <input className={styles.input} type="text" value={text} onChange={onChange}></input>
                </div>
            );
        case "small":
            return (
                <p className={styles.p} contentEditable={true} onChange={onChange}>{text}</p>
            );
        default:
            throw new Error("not implemented");
    }
};

export { InputField };
