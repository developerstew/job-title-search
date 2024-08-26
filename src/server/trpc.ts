import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
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

// const isAuthed = t.middleware(({ next, ctx }) => {
//     if (!ctx.auth.userId) {
//       throw new TRPCError({ code: 'UNAUTHORIZED' })
//     }
//     return next({
//       ctx: {
//         auth: ctx.auth,
//       },
//     })
//   })

export const { mergeRouters, procedure, router } = t;

export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
// TODO: Fix protected backend auth
export const protectedProcedure = t.procedure;
// export const protectedProcedure = t.procedure.use(isAuthed);
