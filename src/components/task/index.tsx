"use client";

import React from "react";

import { InputField, DatePicker, PeoplePicker, Checkbox, Button } from "@components";

import { useTask } from "./hook";

import styles from "./styles.module.css";
import { dateToString } from "@lib/dataFormater";

export interface TaskContainerProps {
    id: string;
    title: string;
    description: string;
    date: Date;
    completed: boolean;
    assignees: string;
    created: boolean;
}

const TaskContainer = React.memo(function TaskContainer(props: TaskContainerProps) {
    const [completed, setCompleted] = React.useState(props.completed);
    const [title, setTitle] = React.useState(props.title);
    const [description, setDescription] = React.useState(props.description);
    const [date, setDate] = React.useState(props.date);
    const [assignees, setAssignees] = React.useState(props.assignees);

    const [focused, setFocused] = React.useState(false);
    const focusRef = React.useRef<HTMLDivElement>(null);

    const startFocus = () => {
        setFocused(true);
    };

    const dontBlurOnChildClicked = (event: React.FocusEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (focusRef.current?.contains(event.relatedTarget as Node)) {
            return;
        }

        setFocused(false);
    };

    const onSaveClicked = () => {};

    const onCheckedClicked = (checked: boolean) => {
        fetch(`/api/tasks/${props.id}`, {
            method: "PUT",
            body: JSON.stringify({
                completed: checked,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);
        });
    };

    return (
        <div
            ref={focusRef}
            className={`${styles.root} vertical-container`}
            onClick={startFocus}
            onBlur={dontBlurOnChildClicked}
        >
            {props.created ? (
                <>
                    <div className="horizontal-container">
                        <InputField text={title} changeText={setTitle} fieldStyle="small" />
                        <DatePicker date={date} />
                    </div>
                    <InputField text={description} changeText={setDescription} fieldStyle="small" />
                    {focused ? (
                        <div className="vertical-container">
                            <div>
                                <Button mode="large" onClick={() => {}} />
                            </div>
                            <Button mode="large" onClick={onSaveClicked} />
                        </div>
                    ) : null}
                </>
            ) : (
                <div className="vertical-container">
                    <Checkbox checked={true} setChecked={() => {}} />
                    <div className="horizontal-container">
                        <div>
                            <p>{props.title}</p>
                            <p>{dateToString(props.date)}</p>
                        </div>
                        <p>{props.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
});

export { TaskContainer };
