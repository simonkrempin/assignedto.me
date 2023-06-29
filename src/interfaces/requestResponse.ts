export interface CreatedTask {
    completed: boolean;
    id: string;
    title: string;
    deadline: Date;
    description: string;
    users: {
        email: string;
        completed: boolean;
    }[];
    newlyCreated?: boolean;
}