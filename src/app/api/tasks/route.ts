import { getTasks } from "@services/taskService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const { searchParams } = new URL(request.nextUrl);
    const onlyCompleted = !!searchParams.get("completed");

    const tasks = await getTasks(token, {
        onlyCompleted,
    });

    return NextResponse.json(tasks, { status: 200 });    
}

export async function POST(request: Request) {
    console.log("creating task");
    return new Response();
}
