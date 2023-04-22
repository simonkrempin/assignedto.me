import { RegisterUser } from "@/models/user";
import { BadRequest, Forbidden, UserAuthenticated, UserCreated } from "@/models/dbResponse";
// import { BadRequest, Forbidden, UserCreated } from "@/models/dbResponse";

/**
 * @return a user?
 */
export const auth = async (email: string, password: string): Promise<UserAuthenticated | BadRequest> => {
    // const user = await db.collection("users").authWithPassword(email, password);
    const user = await fetch("http://localhost:8090/api/collections/users/auth-with-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identity: email,
            password,
        }),
    });
    return await user.json();
};

export const register = async (userinformation: RegisterUser): Promise<UserCreated | BadRequest | Forbidden> => {
    // const user = await db.collection("users").create(userinformation);
    const user = await fetch("http://localhost:8090/api/collections/users/records", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userinformation),
    });
    return await user.json();
};
