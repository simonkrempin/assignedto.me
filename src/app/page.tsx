"use client";

import styles from "./page.module.css";
import React from "react";
import { getUserFromCookies } from "@/lib/cookies";
import { TaskContainer } from "@/components";

const UserContext = React.createContext({});

export default function Main() {
    const [user, setUser] = React.useState(getUserFromCookies());

    return (
        <UserContext.Provider value={user}>
            <main className={styles.main}>
                <TaskContainer title="Titel" description="Description" date="4.12.2003"/>
            </main>
        </UserContext.Provider>
    );
}
