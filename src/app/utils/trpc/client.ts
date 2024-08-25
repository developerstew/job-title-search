// import { type AppRouter } from "@/server";
// import { createTRPCReact } from "@trpc/react-query";

// export const client = createTRPCReact<AppRouter>({});

import { type AppRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { ssrPrepass } from "@trpc/next/ssrPrepass";
import superjson from "superjson";

const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const client = createTRPCNext<AppRouter>({
    ssr: true,
    ssrPrepass,
    config() {
        return {
            transformer: superjson,
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: `${getBaseUrl()}/api/trpc`,
                }),
                // headers() {
                //     if (!ctx?.req?.headers) {
                //       return {};
                //     }
                //     // To use SSR properly, you need to forward client headers to the server
                //     // This is so you can pass through things like cookies when we're server-side rendering
                //     return {
                //       cookie: ctx.req.headers.cookie,
                //     };
                //   },
            ],
        };
    },
});
