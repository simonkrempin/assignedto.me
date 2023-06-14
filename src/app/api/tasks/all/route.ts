import { Task } from "@models/task";
import { getTasks } from "@services/taskService";
import { cookies } from "next/headers";
import { useSearchParams } from 'next/navigation';
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    console.log("Click1")
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    console.log("click");
    if (!token) {
        return new Response(JSON.stringify("Fehler"), { status: 500 });
    }
    const tasks = await getTasks(token?.value)
    console.log(tasks);
    return new Response(JSON.stringify("Erfolgreich"), { status: 200 });
    // console.log("getting tasks");
    // const tasks = await getTasks(token?.value)
    // // const filter = request.nextUrl.searchParams.get("filter");
    // console.log(tasks);




    //     console.log("Click1");
    //     const task: Task = await request.json();
    //     try {
    //         const response = await register(user);
    //         console.log("Click2")
    //         return new Response(JSON.stringify(response), { status: 201 });
    //     } catch (error) {
    //         return new Response(JSON.stringify((error as ClientResponseError).response.message), { status: (error as ClientResponseError).status });
    //     }
}

export async function POST(request: Request) {
    console.log("creating task");
    return new Response();
}
