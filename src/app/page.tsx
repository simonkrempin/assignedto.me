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
            <main className={styles.main}>
            </main>
        </UserContext.Provider>
    );
}
