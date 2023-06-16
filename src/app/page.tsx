"use client";

import styling from "./page.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, useAuthDispatch } from "@contexts/authContext";
import { Button, Calendar, TaskContainer } from "@components";
import useSWR from "swr";
import logoutIcon from "@icons/logout_black_24dp.svg";
import settingsIcon from "@icons/settings_black_24dp.svg";

const cacheReducer = (state: any, action: any) => {
    switch (action.type) {
        case "todo":
            return { ...state, todo: action.payload };
        case "assigned":
            return { ...state, assigned: action.payload };
    }
};

export default function Main() {
    const [currentlySelected, setCurrentlySelected] = React.useState<"todo" | "assigned" | null>(null);
    const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
    const [cache, setCache] = React.useReducer(cacheReducer, {});
    const { token } = useAuth();
    const { deleteToken } = useAuthDispatch();
    const router = useRouter();

    const { data, error, isLoading } = useSWR(
        shouldFetch ? (`/api/tasks?filter=${currentlySelected}` as string) : null,
        (url) =>
            fetch(url).then(async (response) => {
                if (!response.ok) {
                    const error = new Error(await response.json()) as any;
                    error.status = response.status;
                    throw error;
                }

                setShouldFetch(false);

                setCache({ type: currentlySelected, payload: await response.json() });
            })
    );

    React.useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, []);

    React.useEffect(() => {
        if (currentlySelected === null || cache[currentlySelected]) {
            return;
        }

        setShouldFetch(true);
    }, [currentlySelected]);

    const onSignOutClicked = () => {
        deleteToken();
        router.push("/login");
    };

    const onSettingsClicked = () => {
        router.push("/settings");
    };

    const onToDoClicked = () => {
        setCurrentlySelected("todo");
    };

    const onAssignedClicked = () => {
        setCurrentlySelected("assigned");
    };

    console.log(cache);

    return (
        <section className={styling.main}>
            <div className={styling.sidebar}>
                <div className={styling.right_align}>
                    <h1>username</h1>
                    <div className={styling.buttons}>
                        <Button mode="large" onClick={onToDoClicked} label="To Do" />
                        <Button mode="large" onClick={onAssignedClicked} label="Erstellt" />
                        <Calendar />
                    </div>
                    <div className={styling.buttons}>
                        <Button mode="link" onClick={onSettingsClicked} label="Einstellungen" icon={settingsIcon} />
                        <Button mode="link" onClick={onSignOutClicked} label="Abmelden" icon={logoutIcon} />
                    </div>
                </div>
            </div>
            <div className={styling.task_container}>
                <div className={styling.left_align}>
                    <div className={styling.tasks}>
                        {currentlySelected && cache[currentlySelected]
                            ? cache[currentlySelected].map((task: any) => {
                                  return (
                                      <TaskContainer
                                          key={task.id}
                                          id={task.id}
                                          title={task.title}
                                          description={task.description ?? ""}
                                          date={task.deadline ? new Date(task.deadline) : new Date()}
                                          completed={task.completed}
                                          assignees={task.users ?? []}
                                          created={currentlySelected === "assigned"}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
