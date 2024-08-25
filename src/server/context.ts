import { db } from "@/server/database";
import { getAuth } from "@clerk/nextjs/server";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = async (
    opts: trpcNext.CreateNextContextOptions
) => {
    const auth = getAuth(opts.req);
    return {
        db,
        auth,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
