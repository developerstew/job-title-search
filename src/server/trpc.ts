// @ts-nocheck
import { db } from '@/server/database';
import { getAuth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { ZodError } from 'zod';

// TODO: Fix these types
interface SignedInAuthObject {
    userId: string;
    email: string;
    roles: string[];
    // Add other properties as needed
}

interface SignedOutAuthObject {
    isAuthenticated: boolean;
    // Add other properties as needed
}

interface AuthContext {
    auth: SignedInAuthObject | SignedOutAuthObject;
}

const createInnerTRPCContext = async ({ auth }: AuthContext) => ({
    db,
    auth,
});

export const createTRPCContext = (opts: CreateNextContextOptions) =>
    createInnerTRPCContext({
        auth: getAuth(opts.req),
    });

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

const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
        });
    }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    });
});

export const { router } = t;
export const { procedure } = t;
export const protectedProcedure = t.procedure.use(isAuthed);
