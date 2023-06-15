import React from "react";
import pb from "@services/databaseConnection";
import { Admin, Record } from "pocketbase";
import { deleteCookie, getCookie, setCookie } from "@lib/cookies";

interface AuthContext {
    user: Record | Admin | null;
    token: string | null;
}

interface AuthContextDispatch {
    setUser: any;
    setToken: any;
    deleteToken: any;
}

const AuthContext = React.createContext<AuthContext>({
    user: null,
    token: null,
});

const AuthContextDispatch = React.createContext<AuthContextDispatch>({
    setUser: () => {},
    setToken: () => {},
    deleteToken: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = React.useState(null);
    const [token, _setToken] = React.useState(getCookie("token"));

    const setToken = (token: string) => {
        setCookie("token", token, {
            expiresInDays: 7,
        });
        _setToken(token);
    }

    const deleteToken = () => {
        deleteCookie("token");
        _setToken("");
    }

    return (
        <AuthContext.Provider value={{ user, token }}>
            <AuthContextDispatch.Provider value={{ setUser, setToken, deleteToken }}>{children}</AuthContextDispatch.Provider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};

export const useAuthDispatch = () => {
    return React.useContext(AuthContextDispatch);
};
