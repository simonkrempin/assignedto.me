export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
    created?: Date;
    updated?: Date;
}