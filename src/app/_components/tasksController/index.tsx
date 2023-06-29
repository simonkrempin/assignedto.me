"use client";

import React from "react";

import useSWR from "swr";

import styling from "./index.module.css";
import { TaskContainer } from "./components/task";
import { Button } from "@components";
import { useCurrentlyFocusedCard } from "@contexts/cardClickContext";
import { CreatedTask } from "@interfaces/requestResponse";
import { useCache } from "@hooks/useCache";
import { AssigneProvider } from "./components/task/context/assigneContext";

interface TasksControllerProps {
    currentlySelected: "todo" | "assigned" | null;
    cache: any;
    setCache: any;
}

export default function TasksController({ currentlySelected, cache, setCache }: TasksControllerProps) {
    const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
    
    const { isLoading } = useSWR(shouldFetch ? (`/api/tasks?filter=${currentlySelected}` as string) : null, (url) =>
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

    const onAddTaskClicked = () => {
        if (!currentlySelected && currentlySelected === "todo") {
            return;
        }

        setCache({
            type: "add",
            payload: {
                id: "0",
                title: "",
                description: "",
                deadline: new Date(),
                completed: false,
                users: [],
                newlyCreated: true,
            },
        });
    };

    React.useEffect(() => {
        if (currentlySelected === null || cache[currentlySelected]) {
            return;
        }

        setShouldFetch(true);
    }, [currentlySelected]);

    if (isLoading) {
        return (
            <div className={styling.loading__container}>
                <div className="loader"></div>
            </div>
        );
    }

    if (!currentlySelected) {
        return <p>Tasks auswählen</p>;
    }

    return (
        <div className={styling.tasks}>
            {currentlySelected === "assigned" && (
                <div className={styling.add_task}>
                    <Button mode="large" label="Aufgabe hinzufügen" onClick={onAddTaskClicked} />
                </div>
            )}
            <Tasks cache={cache} currentlySelected={currentlySelected} />
        </div>
    );
}

const Tasks = ({
    cache,
    currentlySelected,
}: {
    cache: Record<string, CreatedTask[]>;
    currentlySelected: string | null;
}) => {
    const { currentlyFocusedCard } = useCurrentlyFocusedCard();

    if (!currentlySelected || !cache[currentlySelected]) {
        return <p>Ein Fehler ist aufgetreten beim Laden der Aufgaben</p>;
    }

    if (cache[currentlySelected].length === 0) {
        return <p style={{ textAlign: "center", width: "100%" }}>Keine Aufgaben</p>;
    }

    return (
        <>
            {cache[currentlySelected].map((task: CreatedTask) => {
                return (
                    <AssigneProvider defaultAssignees={task.users ?? []} key={task.id}>
                        <TaskContainer
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description ?? ""}
                            date={task.deadline ? new Date(task.deadline) : new Date()}
                            completed={task.completed}
                            assignees={task.users ?? []}
                            created={currentlySelected === "assigned"}
                            focused={currentlyFocusedCard}
                            newlyCreated={task.newlyCreated}
                        />
                    </AssigneProvider>
                );
            })}
        </>
    );
};
