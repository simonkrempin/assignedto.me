import { Task } from "./task";
import { User } from "./user";

export interface Assigned {
    id: string;
    user: User;
    task: Task;
    completed: boolean;
}
