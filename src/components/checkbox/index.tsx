import React from "react";

import styles from "./style.module.css";

interface CheckboxProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
    disabled?: boolean;
}

const Checkbox = ({ checked, setChecked, disabled = false }: CheckboxProps) => {
    const toggleChecked = () => {
        setChecked(!checked);
    };

    return (
        <label className={styles.container}>
            <input type="checkbox" onChange={toggleChecked} disabled={disabled} checked={checked}/>
            <div className={styles.checkmark} />
        </label>
    );
};

export { Checkbox };
