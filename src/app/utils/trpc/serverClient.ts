import { appRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";

export const serverClient = appRouter.createCaller({
    // @ts-ignore
    links: [
        httpBatchLink({
            url: "http://localhost:3000/api/trpc",
        }),
    ],
});
