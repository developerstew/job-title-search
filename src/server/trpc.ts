// Trpc
import { httpBatchLink } from "@trpc/client";
import { initTRPC, TRPCError } from "@trpc/server";

import superjson from "superjson";
import { ZodError } from "zod";

// Types
import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx?.auth || !ctx.auth.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    });
});

export const { mergeRouters, procedure, router } = t;

export function createCallerFactory(router) {
    return function createCaller() {
        return router.createCaller({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api/trpc",
                }),
            ],
        });
    };
}

export const protectedProcedure = t.procedure.use(isAuthed);
