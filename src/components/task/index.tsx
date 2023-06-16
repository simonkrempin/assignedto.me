"use client";

import React from "react";

import { InputField, DatePicker, PeoplePicker, Checkbox, Button } from "@components";
import styles from "./styles.module.css";
import { dateToString } from "@lib/dataFormater";

export interface TaskContainerProps {
    id: string;
    title: string;
    description: string;
    date: Date;
    completed: boolean;
    assignees: {
        email: string;
        completed: boolean;
    }[];
    created: boolean;
}

const assigneesReducer = (state: any, action: any) => {
    switch (action.type) {
        case "remove":
            state.splice(action.positon, 1);
            return [...state];
        case "add":
            return [...state, action.payload];
        default:
            state[action.position] = action.payload;
            return [...state];
    }
};

const TaskContainer = React.memo(function TaskContainer(props: TaskContainerProps) {
    const [completed, setCompleted] = React.useState(props.completed);
    const [title, setTitle] = React.useState(props.title);
    const [description, setDescription] = React.useState(props.description);
    const [date, setDate] = React.useState(props.date);
    const [assignees, dispatchAssignees] = React.useReducer(assigneesReducer, [...props.assignees]);

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

    const onSaveClicked = () => {
        fetch(`/api/tasks/${props.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: title,
                description: description,
                date: date,
                assignees: assignees,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((_) => {
            setFocused(false);
        });
    };

    const onCheckedClicked = (checked: boolean) => {
        fetch(`/api/tasks/${props.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                completed: checked,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            setCompleted(checked);
        });
    };

    const onAddClicked = () => {
        dispatchAssignees({ type: "add", payload: "" });
    };

    const onDeleteClicked = (assigneeToDelete: number) => {
        dispatchAssignees({ type: "remove", position: assigneeToDelete });
    };

    return (
        <div
            key={props.id}
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
                            {assignees.map(
                                (
                                    assignee: {
                                        email: string;
                                        completed: boolean;
                                    },
                                    index: number
                                ) => (
                                    <div key={`${assignee.email}+${index}`} className="horizontal-container">
                                        <Checkbox checked={assignee?.completed} setChecked={() => {}} />
                                        <InputField
                                            text={assignee?.email}
                                            changeText={(text: string) => {
                                                console.log(text);
                                                dispatchAssignees({ position: index, payload: text });
                                            }}
                                            fieldStyle="small"
                                            placeholder="E-Mail"
                                        />
                                        <Button
                                            mode="link"
                                            onClick={() => onDeleteClicked(index)}
                                            label="löschen"
                                        />
                                    </div>
                                )
                            )}
                            <Button mode="link" onClick={onAddClicked} label="+" />
                            <Button mode="link" onClick={onSaveClicked} label="speichern" />
                        </div>
                    ) : null}
                </>
            ) : (
                <div className="horizontal-container">
                    <Checkbox checked={completed} setChecked={onCheckedClicked} />
                    <div className="vertical-container">
                        <div className={`${styles.primary_bar} horizontal-container`}>
                            <p className={styles.title}>{props.title}</p>
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
