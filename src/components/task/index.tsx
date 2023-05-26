"use client";

import React from "react";

import { TaskContainerProps } from "@interfaces/components";
import { InputField, DatePicker, PeoplePicker, Button } from "@components";

import { useTask } from "./hook";

import "./styles.css";

const TaskContainer = ({ id, title, description, date, completed }: TaskContainerProps) => {
    const { state, setFocused } = useTask({
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
                        <p contentEditable={true}>{title}</p>
                        <div ref={focusRef}>
                            <DatePicker date={date} />
                        </div>
                    </div>
                    <InputField />
                    {state.isFocused ? (
                        <div className="horizontal-container">
                            <PeoplePicker />
                            <Button />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export { TaskContainer };
