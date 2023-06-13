import { RegisterUser } from "@models/user";
import db from "./databaseConnection";

interface AuthResponse {
    token: string;
    username: string;
}

export const auth = async (email: string, password: string): Promise<AuthResponse> => {
    const authData = await db.collection("users").authWithPassword(email, password);

    return {
        token: authData.token,
        username: authData.record["username"],
    };
};

export const register = async (userinformation: RegisterUser): Promise<AuthResponse> => {
    await db.collection("users").create(userinformation);

    const authData = await db.collection("users").authWithPassword(userinformation.email, userinformation.password);

    return {
        token: authData.token,
        username: authData.record["username"],
    };
};
