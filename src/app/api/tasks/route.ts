import { createTask, getTasks } from "@services/taskService";
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
    const onlyCompleted = !!searchParams.get("completed");

    const tasks = await getTasks(userId, {
        onlyCompleted,
    });

    return NextResponse.json(tasks, { status: 200 });    
}

export async function POST(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = (jwt.decode(token) as { id: string }).id;
    const task = await request.json() as Task;
    task.creator = userId;

    try {
        await createTask(task);
        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response((error as ClientResponseError).response.message, { status: 500 });
    }
}
