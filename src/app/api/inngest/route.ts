import { inngest } from "@/src/inngest/client";
import { trackSignUp } from "@/src/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [trackSignUp],
});
