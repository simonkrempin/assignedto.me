import React from "react";
import pb from "@/service/databaseConnection";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = React.useState(pb.authStore.model);
    const [token, setToken] = React.useState(pb.authStore.token);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);