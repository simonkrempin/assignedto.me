"use client";

import React from "react";

import { TaskContainerProps } from "@interfaces/components";
import { InputField, DatePicker, PeoplePicker, Button } from "@components";

import { useTask } from "./hook";

import styles from "./styles.module.css";

const TaskContainer = ({ id, title, description, date, completed }: TaskContainerProps) => {
    const { state, setFocused, setTitle, setDescription } = useTask({
        title,
        description,
        date,
        completed,
        isFocused: false,
    });
    const focusRef = React.useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setFocused(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (focusRef.current?.contains(event.relatedTarget as Node)) {
            return;
        }

        setFocused(false);
    };

    return (
        <div
            ref={focusRef}
            className={`${styles.root} vertical-container`}
            onClick={handleClick}
            onBlur={handleBlur}
            tabIndex={0}
        >
            <div className="horizontal-container">
                <input type="checkbox" className={styles.checkbox} />
                <div className="vertical-container">
                    <div className="horizontal-container">
                        <InputField text={title} changeText={setTitle} inputMode="small" />
                        <DatePicker date={date} />
                    </div>
                    <InputField text={description} changeText={setDescription} inputMode="small" />
                </div>
            </div>
            {state.isFocused ? <PeoplePicker /> : null}
        </div>
    );
};

export { TaskContainer };
