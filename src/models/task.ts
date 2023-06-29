export interface Task {
    id: string;
    title: string;
    creator: string;
    description?: string;
    deadline?: string;
    created?: string;
    updated?: string;
}

export interface UpdateTask {
    id: string;
    title: string;
    creator: string;
    description?: string;
    deadline?: string;
    assignees: {
        id: string;
        email: string;
        completed: boolean;
    }[];
}