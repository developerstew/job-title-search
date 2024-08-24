import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { createTRPCContext } from '@/server/context';

const t = initTRPC.context<typeof createTRPCContext>().create({
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

export const router = t.router;

export const createCallerFactory = t.createCallerFactory;

export const procedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({ ctx: { userId: ctx.userId } });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
