import React from "react";

import { useAssignees } from "../../hooks/useAssignees";
import { Assignee } from "../../interfaces/assignee";

interface AssigneeContext {
    assignees: Assignee[];
    addAssignee: (email: string) => void;
    removeAssigneeByIndex: (index: number) => void;
    editEmail: (index: number, email: string) => void;
}

interface AssigneeProviderProps {
    defaultAssignees: Assignee[];
    children: React.ReactNode;
}

const AssigneeContext = React.createContext<AssigneeContext>({
    assignees: [],
    addAssignee: (email: string): void => {},
    removeAssigneeByIndex: (index: number): void => {},
    editEmail: (index: number, email: string): void => {},
});

export function AssigneProvider({defaultAssignees, children}: AssigneeProviderProps) {
    const { assignees, addAssignee, removeAssigneeByIndex, editEmail } = useAssignees(defaultAssignees);

    return (
        <AssigneeContext.Provider value={{ assignees, addAssignee, removeAssigneeByIndex, editEmail }}>
            { children }
        </AssigneeContext.Provider>
    )
};

export function useAssigneeContext(): AssigneeContext {
    const context = React.useContext(AssigneeContext);

    if (context === undefined) {
        throw new Error("useAssigneeContext must be used within a AssigneeProvider");
    }

    return context;
}