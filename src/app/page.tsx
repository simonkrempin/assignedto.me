"use client";

import styling from "./page.module.css";
import React from "react";
import { usePrivateRoute } from "@hooks/usePrivateRoute";
import Sidebar from "./_components/sidebar";
import TasksController from "./_components/tasksController";

export default function Main() {
    const [currentlySelected, setCurrentlySelected] = React.useState<"todo" | "assigned" | null>(null);
    usePrivateRoute();

    return (
        <section className={styling.main}>
            <Sidebar setCurrentlySelected={setCurrentlySelected} />
            <div className={styling.task_container}>
                <div className={styling.left_align}>
                    <TasksController currentlySelected={currentlySelected} />
                </div>
            </div>
        </section>
    );
}
