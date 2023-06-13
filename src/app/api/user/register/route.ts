import { RegisterUser } from "@models/user";
import { register } from "@services/authService";
import { ClientResponseError } from "pocketbase";

export async function POST(request: Request) {
    const user: RegisterUser = await request.json();
    try {
        const response = await register(user);
        return new Response(JSON.stringify(response), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify((error as ClientResponseError).response.message), { status: (error as ClientResponseError).status });
    }
}
