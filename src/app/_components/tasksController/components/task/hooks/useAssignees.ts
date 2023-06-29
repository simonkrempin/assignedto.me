import { useState } from 'react';

interface Assignee {
    email: string;
    completed: boolean;
}

const useAssignees = (defaultAssignees: any) => {
    const [assignees, setAssignees] = useState<Assignee[]>(defaultAssignees);

    const addAssignee = (email: string): void => {
        setAssignees([...assignees, { email, completed: false }]);
    };

    const removeAssignee = (email: string): void => {
        setAssignees(assignees.filter((assignee: Assignee) => assignee.email !== email));
    };

    const removeAssigneeByIndex = (index: number): void => {
        assignees.splice(index, 1);
        setAssignees([...assignees]);
    };

    const editEmail = (index: number, email: string): void => {
        assignees[index].email = email;
        setAssignees([...assignees]);
    };

    return { assignees, addAssignee, removeAssignee, removeAssigneeByIndex, editEmail};
}

export { useAssignees };
