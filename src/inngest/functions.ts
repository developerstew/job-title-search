import { inngest } from "./client";

export const trackSignUp = inngest.createFunction(
    { id: "track-sign-up" },
    { event: "test/track-sign-up" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { event, body: "User registered!" };
    }
);
