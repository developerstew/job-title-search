"use server";

import { appRouter } from "@/app/api/trpc/routers/_app";
import { httpBatchLink } from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { createContext } from "../../api/trpc/context";

const apiUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/trpc`;

export const serverClient = appRouter.createCaller({
    // @ts-ignore
    links: [
        httpBatchLink({
            url: apiUrl,
        }),
    ],
});

export const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createContext(),
    transformer: superjson,
});
