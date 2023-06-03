"use client";

import React from "react";

import { InputField, DatePicker, PeoplePicker, Checkbox } from "@components";

import { useTask } from "./hook";

import styles from "./styles.module.css";

export interface TaskContainerProps {
    id: string;
    title: string;
    description: string;
    date: Date;
    completed: boolean;
    assignees: string;
}

const TaskContainer = React.memo(({ id, title, description, date, completed, assignees }: TaskContainerProps) => {
    const { state, setFocused, setTitle, setDescription, setAssignees } = useTask({
        title,
        description,
        date,
        completed,
        isFocused: false,
        assignees,
    });
    const focusRef = React.useRef<HTMLDivElement>(null);

    const startFocus = () => {
        setFocused(true);
    };

    const dontBlurOnChildClicked = (event: React.FocusEvent<HTMLDivElement>) => {
        if (focusRef.current?.contains(event.relatedTarget as Node)) {
            return;
        }

        setFocused(false);
    };

    console.log(state.assignees);

    return (
        <div
            ref={focusRef}
            className={`${styles.root} vertical-container`}
            onClick={startFocus}
            onBlur={dontBlurOnChildClicked}
            tabIndex={0}
        >
            <div className="horizontal-container">
                <Checkbox checked={false} setChecked={(checked: boolean) => {}}/>
                <div className="vertical-container">
                    <div className="horizontal-container">
                        <InputField text={title} changeText={setTitle} inputMode="small" />
                        <DatePicker date={date} />
                    </div>
                    <InputField text={description} changeText={setDescription} inputMode="small" />
                </div>
            </div>
            {state.isFocused ? <PeoplePicker selectedUsers={state.assignees} addUser={setAssignees}/> : null}
        </div>
    );
});

export { TaskContainer };
