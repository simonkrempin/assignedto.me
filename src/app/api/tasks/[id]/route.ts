import { Task, UpdateTask } from "@models/task";
import { completeTask, deleteTask, updateTask } from "@services/taskService";
import { ClientResponseError } from "pocketbase";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    const task = (await request.json()) as UpdateTask;
    task.id = params.id;
    task.creator = (jwt.decode(token) as { id: string }).id;

    try {
        await updateTask(task);
        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response((error as ClientResponseError).response?.message, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        await deleteTask(params.id);
        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response((error as ClientResponseError).response.message, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    let completed = false;
    try {
        completed = (await request.json()).completed;
    } catch (error) {
        return new Response("Invalid request body", { status: 400 });
    }
    
    const userId = (jwt.decode(token) as { id: string }).id;

    try {
        await completeTask(userId, params.id, completed);
        return new Response("OK", { status: 200 });
    } catch (err) {
        const error = err as ClientResponseError;
        return new Response(error.response.message, { status: error.status });
    }
}
