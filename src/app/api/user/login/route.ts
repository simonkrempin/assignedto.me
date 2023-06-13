import { auth } from "@services/authService";
import { ClientResponseError } from "pocketbase";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    try {
        const user = await auth(email, password);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify((error as ClientResponseError).response.message), { status: (error as ClientResponseError).status });

    }
}