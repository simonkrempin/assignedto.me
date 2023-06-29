"use client";

import React from "react";

import { InputField, DatePicker, Checkbox, Button } from "@components";
import styles from "./styles.module.css";
import { dateToString } from "@lib/dataFormater";
import { useCurrentlyFocusedCardDispatch } from "@contexts/cardClickContext";
import { Assignee } from "./interfaces/assignee";
import AssigneeEditMask from "./components/assignee";
import { AssigneProvider, useAssigneeContext } from "./context/assigneContext";

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
    focused?: React.ReactNode;
    newlyCreated?: boolean;
}

const TaskContainer = React.memo(function TaskContainer(props: TaskContainerProps) {
    const [completed, setCompleted] = React.useState<boolean>(props.completed);
    const [title, setTitle] = React.useState<string>(props.title);
    const [description, setDescription] = React.useState<string>(props.description);
    const [date, setDate] = React.useState<Date>(props.date);
    const { setCurrentlyFocusedCard } = useCurrentlyFocusedCardDispatch();
    const cardRef = React.useRef<HTMLDivElement>(null);
    const { assignees, addAssignee } = useAssigneeContext();

    const onSaveClicked = () => {
        const fetchOptions = props.newlyCreated
            ? { method: "POST", endpoint: "/api/tasks" }
            : {
                  method: "PUT",
                  endpoint: `/api/tasks/${props.id}`,
              };

        fetch(fetchOptions.endpoint, {
            method: fetchOptions.method,
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
            setCurrentlyFocusedCard(undefined);
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
        addAssignee("");
    };

    if (props.created) {
        return (
            <div key={props.id} ref={cardRef} className={`${styles.root} vertical-container`}>
                <div className="horizontal-container">
                    <InputField text={title} changeText={setTitle} fieldStyle="small" placeholder="Titel" />
                    <DatePicker date={date} />
                </div>
                <InputField
                    text={description}
                    changeText={setDescription}
                    fieldStyle="small"
                    placeholder="Beschreibung"
                />
                {isFocused(props.focused, cardRef.current) ? (
                    <div className="vertical-container">
                        {assignees.map((assignee: Assignee, index: number) => (
                            <AssigneeEditMask index={index} />
                        ))}
                        <Button mode="link" onClick={onAddClicked} label="+" />
                        <Button mode="link" onClick={onSaveClicked} label="speichern" />
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div key={props.id} ref={cardRef} className={`${styles.root} vertical-container`}>
            <div className="horizontal-container">
                <Checkbox checked={completed} setChecked={onCheckedClicked} />
                <div className="vertical-container">
                    <div className={`${styles.primary_bar} horizontal-container`}>
                        <p className={styles.title}>{props.title}</p>
                        <p>{dateToString(props.date)}</p>
                    </div>
                    <p className={styles.description}>{props.description}</p>
                </div>
            </div>
        </div>
    );
});

const isFocused = (currentlyClickedCard: React.ReactNode | null, cardRef: HTMLDivElement | null) => {
    if (!cardRef || !currentlyClickedCard) {
        return false;
    }

    try {
        return cardRef.contains(currentlyClickedCard as any);
    } catch (error) {
        return false;
    }
};

export { TaskContainer };
