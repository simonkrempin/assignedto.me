import { cookies } from "next/headers";
import { useSearchParams } from 'next/navigation';
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // const cookieStore = cookies();
    // const token = cookieStore.get("Authorization");

    console.log("getting tasks");
    
    const filter = request.nextUrl.searchParams.get("filter");

    return new Response();
}

export async function POST(request: Request) {
    console.log("creating task");
    return new Response();
}
