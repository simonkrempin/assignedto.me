"use client";

import { Inter } from "next/font/google";
import styles from "./page.module.css";
import React from "react";
import { getUserFromCookies } from "@/lib/cookies";
import { Calender } from "@/components";

const inter = Inter({ subsets: ["latin"] });
const UserContext = React.createContext({});

export default function Main() {
    const [user, setUser] = React.useState(getUserFromCookies());

    return (
        <UserContext.Provider value={user}>
            <main className={styles.main}>
                <Calender/>
            </main>
        </UserContext.Provider>
    );
}
