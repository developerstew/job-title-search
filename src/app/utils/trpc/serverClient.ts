"use server";

import { createContext } from "@/app/api/trpc/context";
import { appRouter } from "@/app/api/trpc/routers/_app";
import { db } from "@/server/database";
import { httpBatchLink } from "@trpc/client";
// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

const apiUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/trpc`;

export const serverClient = appRouter.createCaller({
    // @ts-ignore
    links: [
        httpBatchLink({
            url: apiUrl,
        }),
    ],
});

// const proxyClient = createTRPCClient<AppRouter>({
//     links: [
//         httpBatchLink({
//             transformer: superjson,
//             url: apiUrl,
//         }),
//     ],
// });

// export const serverClient = createServerSideHelpers({
//     client: proxyClient,
// });
export const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
        auth: createContext(),
        db,
    },
    transformer: superjson, // optional - adds superjson serialization
});
