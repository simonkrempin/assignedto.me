import { auth } from "@/service/authService";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const user = await auth(email, password);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }
}