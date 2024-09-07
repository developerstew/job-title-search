import { initTRPC } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { type Context } from "./context";
import { ZodError } from "zod";
import superjson from "superjson";

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

const isAuthed = t.middleware(async ({ next, ctx }) => {
    const authData = await ctx.auth;

    if (!authData.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
        ctx: {
            ...ctx,
            auth: authData,
        },
    });
});

export const { mergeRouters, procedure, router } = t;

export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
// TODO: Fix protected backend auth
// export const protectedProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
