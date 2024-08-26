import { createTRPCNext } from "@trpc/next";

import type { AppRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";
import { ssrPrepass } from "@trpc/next/ssrPrepass";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { NextPageContext } from "next";
import superjson from "superjson";

function getBaseUrl() {
    if (typeof window !== "undefined") {
        return "";
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    if (process.env.RENDER_INTERNAL_HOSTNAME) {
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    }

    return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
}

export interface SSRContext extends NextPageContext {
    status?: number;
}

export const trpc = createTRPCNext<AppRouter>({
    ssr: true,
    transformer: superjson,
    ssrPrepass,
    config(opts) {
        const { ctx } = opts;
        if (typeof window !== "undefined") {
            return {
                links: [
                    httpBatchLink({
                        transformer: superjson,
                        url: "/api/trpc",
                    }),
                ],
            };
        }
        return {
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: `${getBaseUrl()}/api/trpc`,
                    headers() {
                        if (!ctx?.req?.headers) {
                            return {};
                        }
                        return {
                            cookie: ctx.req.headers.cookie,
                        };
                    },
                }),
            ],
        };
    },
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
