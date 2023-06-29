"use client";

import styling from "./page.module.css";
import React from "react";
import { usePrivateRoute } from "@hooks/usePrivateRoute";
import Sidebar from "./_components/sidebar";
import TasksController from "./_components/tasksController";
import { useCache } from "@hooks/useCache";

export default function Main() {
    const [currentlySelected, setCurrentlySelected] = React.useState<"todo" | "assigned" | null>(null);
    const [cache, setCache] = useCache();

    usePrivateRoute();

    return (
        <section className={styling.main}>
            <Sidebar setCurrentlySelected={setCurrentlySelected} setCache={setCache}/>
            <div className={styling.task_container}>
                <div className={styling.left_align}>
                    <TasksController currentlySelected={currentlySelected} cache={cache} setCache={setCache} />
                </div>
            </div>
        </section>
    );
}
