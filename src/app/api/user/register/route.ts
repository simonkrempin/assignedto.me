import { RegisterUser } from "@/models/user";
import { register } from "@/service/authService";

export async function POST(request: Request) {
    try {
        const user: RegisterUser = await request.json();
        const response = await register(user);
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }
}