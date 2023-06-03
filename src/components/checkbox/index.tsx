import React from "react";

import styles from "./style.module.css";

interface CheckboxProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

const Checkbox = ({ checked, setChecked }: CheckboxProps) => {
    const toggleChecked = () => {
        setChecked(!checked);
    }

    return (
        <label className={styles.container}>
            <input type="checkbox" onClick={toggleChecked}/>
            <div className={styles.checkmark}/>
        </label>
    );
};

export { Checkbox };
