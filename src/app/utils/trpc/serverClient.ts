import { appRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";

const apiUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/trpc`;

export const serverClient = appRouter.createCaller({
    // @ts-ignore
    links: [
        httpBatchLink({
            url: apiUrl,
        }),
    ],
});
