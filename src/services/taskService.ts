import { Task } from "@models/task";
import pb from "./databaseConnection";

export const getCompletedTasks = async (token: string) => {
    console.log("reading completed tasks from database");
}

export const getTasks = async (token: string) => {
    console.log("reading tasks from database");
    const tasks = await pb.collection("tasks").getList();
    return tasks;
}

export const createTask = async (token: string, task: Task) => {
    console.log("creating task in database");
}

export const updateTask = async (token: string, task: Task) => {
    console.log("updating task in database");
}

export const deleteTask = async (token: string, task: Task) => {
    console.log("deleting task from database");
}