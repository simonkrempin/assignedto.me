import { Task, UpdateTask } from "@models/task";
import pb from "./databaseConnection";

export const getCompletedTasks = async (token: string) => {
    console.log("reading completed tasks from database");
};

export const getToDoTasks = async (userId: string, filter: { onlyCompleted: boolean }) => {
    const assignedTasks = (
        await pb.collection("assigned").getList(1, 50, {
            filter: `user.id = "${userId}" && completed = false`,
            expand: "task",
        })
    ).items as any;

    if (!assignedTasks || assignedTasks.length === 0) {
        return [];
    }

    return assignedTasks.map((assignedTask: any) => {
        return {
            id: assignedTask.expand.task.id,
            title: assignedTask.expand.task.title,
            description: assignedTask.expand.task.description,
            deadline: assignedTask.expand.task.deadline,
            completed: false,
        };
    });
};

export const createTask = async (task: Task) => {
    await pb.collection("tasks").create(task);
};

export const updateTask = async (task: UpdateTask) => {
    await pb.collection("tasks").delete(task.id);

    await pb.collection("tasks").create({
        id: task.id,
        title: task.title,
        creator: task.creator,
        description: task.description,
        deadline: task.deadline
    });

    // find all the id's for the assignees emails
    const validatedAssignees = await Promise.all(
        task.assignees.map(async (assignee) => {
            const user = await pb.collection("users").getFirstListItem(`email = "${assignee.email}"`);
            return {
                completed: assignee.completed,
                id: user.id
            };
        })
    );

    const addAssignedTasks = validatedAssignees.map(async (assignee) => {
        return pb.collection("assigned").create({
            "user": assignee.id,
            "task": task.id,
            "completed": assignee.completed
        });
    });

    await Promise.all(addAssignedTasks);
};

export const deleteTask = async (taskId: string) => {
    await pb.collection("tasks").delete(taskId);
};

export const completeTask = async (userId: string, taskId: string, completed: boolean) => {
    const assignedTask = await pb.collection("assigned").getFirstListItem(`user = "${userId}" && task = "${taskId}"`);
    await pb.collection("assigned").update(assignedTask.id, { completed });
};

interface FilteredTasks {
    id: string;
    title: string;
    description: string;
    deadline: string;
    users: {
        id: string;
        email: string;
        completed: boolean;
    }[];
}

export const getCreatedTasks = async (userId: string) => {
    const createdTasks = (
        await pb.collection("tasks").getList(1, 50, {
            filter: `creator = "${userId}"`,
        })
    ).items as any;

    if (createdTasks.length === 0) {
        return [];
    }

    const assignedTasks = (
        await pb.collection("assigned").getList(1, 50, {
            filter: `task.creator.id = "${userId}"`,
            expand: "task,user",
        })
    ).items as any;

    const filteredTasks: FilteredTasks[] = [];

    console.log(createdTasks);

    for (const createdTask of createdTasks) {
        filteredTasks[createdTask.id] = {
            id: createdTask.id,
                title: createdTask.title,
                description: createdTask.description,
                deadline: createdTask.deadline,
            users: []
        };
    }

    console.log(assignedTasks);

    for (const assignedTask of assignedTasks) {
        filteredTasks[assignedTask.expand.task.id].users.push({
            id: assignedTask.expand.user.id,
            email: assignedTask.expand.user.email,
            completed: assignedTask.completed
        });
    }

    return Object.values(filteredTasks);
};
