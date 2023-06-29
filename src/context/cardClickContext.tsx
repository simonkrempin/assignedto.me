import React from "react";

interface CardClickContext {
    currentlyFocusedCard: React.ReactNode | undefined;
}

interface CardClickDispatchContext {
    setCurrentlyFocusedCard: (currentlyFocusedCard: React.ReactNode | undefined) => void;
}

const CardClickContext = React.createContext<CardClickContext>({
    currentlyFocusedCard: undefined,
});

const CardClickDispatchContext = React.createContext<CardClickDispatchContext>({
    setCurrentlyFocusedCard: (currentlyFocusedCard: React.ReactNode | undefined) => {
        throw new Error("setCurrentlyFocusedCard not implemented");
    },
});

interface CardClickProviderProps {
    children: React.ReactNode;
}

export const CardClickProvider = ({ children }: CardClickProviderProps) => {
    const [currentlyFocusedCard, setCurrentlyFocusedCard] = React.useState<React.ReactNode | undefined>(undefined);

    React.useEffect(() => {
        window.addEventListener("mousedown", (event) => {
            setCurrentlyFocusedCard(event.target as React.ReactNode);
        });

        return () => {
            window.removeEventListener("mousedown", () => {});
        };
    }, []);

    return (
        <CardClickContext.Provider value={{ currentlyFocusedCard }}>
            <CardClickDispatchContext.Provider value={{ setCurrentlyFocusedCard }}>
                {children}
            </CardClickDispatchContext.Provider>
        </CardClickContext.Provider>
    );
};

export const useCurrentlyFocusedCard = () => {
    return React.useContext(CardClickContext);
};

/**
 * Number is the index of the task that is currently clicked
 * -1 means no task is clicked
 */
export const useCurrentlyFocusedCardDispatch = () => {
    return React.useContext(CardClickDispatchContext);
};
