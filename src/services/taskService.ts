import { Task, UpdateTask } from "@models/task";
import pb from "./databaseConnection";

export const getCompletedTasks = async (token: string) => {
    console.log("reading completed tasks from database");
}

export const getToDoTasks = async (userId: string, filter: { onlyCompleted: boolean }) => {
    const assignedTasks = (await pb.collection("assigned").getList(1, 50, {
        filter: `user.id = "${userId}" && completed = false`,
        expand: "task"
    })).items as any;

    return assignedTasks.map((assignedTask: any) => {
        return {
            id: assignedTask.expand.task.id,
            title: assignedTask.expand.task.title,
            description: assignedTask.expand.task.description,
            deadline: assignedTask.expand.task.deadline,
            completed: false
        };
    })
}

export const createTask = async (task: Task) => {
    await pb.collection("tasks").create(task);
}

export const updateTask = async (task: UpdateTask) => {
    await pb.collection("tasks").delete(task.id);

    const updateTask = pb.collection("tasks").create({
        id: task.id,
        title: task.title,
        creator: task.creator,
        description: task.description,
        deadline: task.deadline
    });

    const addAssignedTasks = task.asignees.map(async (asignee) => {
        return pb.collection("assigned").create({
            user: asignee.email,
            task: task.id,
            completed: asignee.completed
        });
    });
    
    await Promise.all([ updateTask, addAssignedTasks]);
}

export const deleteTask = async (taskId: string) => {
   await pb.collection("tasks").delete(taskId);
}

export const completeTask = async (userId: string, taskId: string, completed: boolean) => {
    const assignedTask = await pb.collection("assigned").getFirstListItem(`user = "${userId}" && task = "${taskId}"`);
    await pb.collection("assigned").update(assignedTask.id, { completed });
}

export const getAssignedTasks = async (userId: string) => {
    const assigendTasks = (await pb.collection("assigned").getList(1, 50, {
        filter: `task.creator.id = "${userId}"`,
        expand: "task,user"
    })).items as any;

    if (assigendTasks.length === 0) {
        return [ await pb.collection("tasks").getFirstListItem(`creator = "${userId}"`)];
    }

    const filteredTasks: Record<string, {
        id: string;
        title: string;
        description: string;
        deadline: string;
        users: {
            id: string;
            email: string;
            completed: boolean;
        }[];
    }> = {};


    for (const assignedTask of assigendTasks) {
        if (!filteredTasks[assignedTask.task.id]) {
            filteredTasks[assignedTask.task.id] = {
                id: assignedTask.expand.task.id,
                title: assignedTask.expand.task.title,
                description: assignedTask.expand.task.description,
                deadline: assignedTask.expand.task.deadline,
                users: [{
                    id: assignedTask.expand.user.id,
                    email: assignedTask.expand.user.email,
                    completed: assignedTask.completed
                }]
            };
        } else {
            filteredTasks[assignedTask.task.id].users.push({
                id: assigendTasks.expand.user.id,
                email: assignedTask.expand.user.email,
                completed: assignedTask.completed
            });
        }
    }

    return Object.values(filteredTasks);
}