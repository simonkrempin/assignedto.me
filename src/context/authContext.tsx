import React from "react";
import pb from "@services/databaseConnection";
import { Admin, Record } from "pocketbase";
import { deleteCookie, getCookie, setCookie } from "@lib/cookies";

interface AuthContext {
    username: string;
    token: string | null;
}

interface AuthContextDispatch {
    saveUser: any;
    deleteUser: any;
}

const AuthContext = React.createContext<AuthContext>({
    username: "",
    token: null,
});

const AuthContextDispatch = React.createContext<AuthContextDispatch>({
    saveUser: () => {},
    deleteUser: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [username, setUsername] = React.useState(getCookie("username"));
    const [token, _setToken] = React.useState(getCookie("token"));

    const setToken = (token: string) => {
        setCookie("token", token, {
            expiresInDays: 7,
        });
        _setToken(token);
    }

    const saveUser = (token: string, username: string) => {
        setCookie("token", token, {
            expiresInDays: 7,
        });
        setCookie("username", username, {
            expiresInDays: 7,
        });
        _setToken(token);
        setUsername(username);
    }

    const deleteUser = () => {
        deleteCookie("token");
        deleteCookie("username");
        _setToken("");
        setUsername("");
    }

    return (
        <AuthContext.Provider value={{ username, token }}>
            <AuthContextDispatch.Provider value={{ saveUser, deleteUser }}>{children}</AuthContextDispatch.Provider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};

export const useAuthDispatch = () => {
    return React.useContext(AuthContextDispatch);
};
