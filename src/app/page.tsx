"use client";

import styling from "./page.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, useAuthDispatch } from "@contexts/authContext";
import { Button, Calendar, TaskContainer } from "@components";
import { Task } from "@models/task";

export default function Main() {
    const { token } = useAuth();
    const { deleteToken } = useAuthDispatch();
    const tasks: Task[] = [
        {
            id: "1",
            title: "Test",
            description: "Test",
            deadline: new Date(),
        },
    ];
    const router = useRouter();

    React.useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, []);

    if (!token) {
        return <div></div>;
    }

    const onSignOutClicked = () => {
        deleteToken();
        router.push("/login");
    };

    const onSettingsClicked = () => {
        router.push("/settings");
    };

    const onToDoClicked = () => {};

    const onAssignedClicked = () => {};

    return (
        <section className={styling.main}>
            <div className={styling.sidebar}>
                <div className={styling.right_align}>
                    <h1>username</h1>
                    <div className={styling.buttons}>
                        <Button mode="large" onClick={onToDoClicked} label="To Do" />
                        <Button mode="large" onClick={onAssignedClicked} label="Zugewiesen" />
                        <Calendar />
                    </div>
                    <div className={styling.buttons}>
                        <Button mode="link" onClick={onSettingsClicked} label="Einstellungen" />
                        <Button mode="link" onClick={onSignOutClicked} label="Abmelden" />
                    </div>
                </div>
            </div>
            <div className={styling.task_container}>
                <div className={styling.left_align}>
                    <Button mode="small" onClick={() => {}} label="Sortieren" />
                    <hr />
                    <div className={styling.tasks}>
                        {tasks.map((task) => {
                            return (
                                <TaskContainer
                                    id={task.id}
                                    title={task.title}
                                    description={task.description ?? ""}
                                    date={task.deadline ?? new Date()}
                                    completed={false}
                                    assignees={""}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
