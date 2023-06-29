import React from "react";
import { useAuth } from "@contexts/authContext";
import { useRouter } from "next/navigation";

export const usePrivateRoute = () => {
    const { token } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, []);
}