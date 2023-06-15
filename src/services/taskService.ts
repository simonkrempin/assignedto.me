import { Task } from "@models/task";
import pb from "./databaseConnection";
import { PartiallyRequired } from "@customTypes/utilityExtension";

export const getCompletedTasks = async (token: string) => {
    console.log("reading completed tasks from database");
}

export const getTasks = async (userId: string, filter: { onlyCompleted: boolean }) => {
    const tasks = await pb.collection("tasks").getList(1, 50, {
        filter: `creator = "${userId}"`
    });
    return tasks.items;
}

export const createTask = async (task: Task) => {
    await pb.collection("tasks").create(task);
}

export const updateTask = async (task: PartiallyRequired<Task, "id">) => {
    await pb.collection("tasks").update(task.id, task);
}

export const deleteTask = async (taskId: string) => {
   await pb.collection("tasks").delete(taskId);
}

export const completeTask = async (userId: string, taskId: string, completed: boolean) => {
    const assignedTask = await pb.collection("assigned").getFirstListItem(`user = "${userId}" && task = "${taskId}"`);
    await pb.collection("assigned").update(assignedTask.id, { completed });
}