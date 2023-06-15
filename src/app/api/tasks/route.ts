import { createTask, getTasks, getAssignedTasks } from "@services/taskService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import jwt from "jsonwebtoken";
import { Task } from "@models/task";

export async function GET(request: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (jwt.decode(token) as { id: string }).id;

    const { searchParams } = new URL(request.nextUrl);

    const filter = searchParams.get("filter");

    if (filter === "todo") {
        const todoTasks = await getTasks(userId, {
            onlyCompleted: false,
        });
        return NextResponse.json(todoTasks, { status: 200 });
    }

    if (filter === "assigned") {
        const assignedTasks = await getAssignedTasks(userId);
        return NextResponse.json(assignedTasks, { status: 200 });
    }

    return new Response("invalid query", { status: 400 });
}

export async function POST(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = (jwt.decode(token) as { id: string }).id;
    const task = (await request.json()) as Task;
    task.creator = userId;

    try {
        await createTask(task);
        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response((error as ClientResponseError).response.message, { status: 500 });
    }
}
