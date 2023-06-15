export interface Task {
    id: string;
    title: string;
    creator: string;
    description?: string;
    deadline?: Date;
    created?: Date;
    updated?: Date;
}