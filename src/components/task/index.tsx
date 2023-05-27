"use client";

import React from "react";

import { TaskContainerProps } from "@interfaces/components";
import { InputField, DatePicker, PeoplePicker, Button } from "@components";

import { useTask } from "./hook";

import "./styles.css";

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
        <div className="root" onClick={handleClick} onBlur={handleBlur} tabIndex={0}>
            <div ref={focusRef} className="focused-container horizontal-container">
                <input type="checkbox" />
                <div className="vertical-container">
                    <div className="horizontal-container">
                        <InputField text={title} changeText={setTitle} inputMode="small" />
                        <DatePicker date={date} />
                    </div>
                    <InputField text={description} changeText={setDescription} inputMode="small" />
                    {state.isFocused ? <PeoplePicker /> : null}
                </div>
            </div>
        </div>
    );
};

export { TaskContainer };
