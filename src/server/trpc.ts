import { initTRPC } from "@trpc/server";
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
    console.log("CTX Check", ctx);
    // if (!ctx?.auth.userId) {
    //   throw new TRPCError({ code: 'UNAUTHORIZED' })
    // }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    });
});

export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
