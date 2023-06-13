import React from "react";

export const useError = (timeout = 1000) => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!errorMessage) return;

        const timer = setTimeout(() => {
            setErrorMessage(null);
        }, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [errorMessage]);

    return { errorMessage, setErrorMessage };
};
