"use client";

import styles from "./page.module.css";
import React from "react";
import { getUserFromCookies } from "@lib/cookies";
import { Calendar, TaskContainer } from "@components";

const UserContext = React.createContext({});

export default function Main() {
    const [user, setUser] = React.useState(getUserFromCookies());

    return (
        <UserContext.Provider value={user}>
            <main className={styles.main} style={{
                backgroundColor: "var(--primary)",
            }}>
                <TaskContainer key="1" id="1" title="Titel" description="Description" date={new Date()} completed={false} />
                <TaskContainer key="2" id="2" title="Titel" description="Description" date={new Date()} completed={false} />
            </main>
        </UserContext.Provider>
    );
}
