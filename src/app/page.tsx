import { Inter } from "next/font/google";
import styles from "./page.module.css";
import React from "react";
import { User } from "@/interfaces/auth";
import { getUserFromCookies } from "@/lib/cookies";

const inter = Inter({ subsets: ["latin"] });
const UserContext = React.createContext({});

export default function Main() {
    const [user, setUser] = React.useState(getUserFromCookies());

    return (
        <UserContext.Provider value={user}>
            <main className={styles.main}></main>
        </UserContext.Provider>
    );
}
