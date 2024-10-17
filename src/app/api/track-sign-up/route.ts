import { inngest } from "@/src/inngest/client";

export async function POST(request: Request) {
    const body = await request.json();
    await inngest.send({
        name: "test/track-sign-up",
        data: body,
    });

    return new Response("User registered", {
        status: 200,
    });
}
