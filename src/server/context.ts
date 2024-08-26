import { db } from "@/server/database";
import { getAuth } from "@clerk/nextjs/server";
import * as trpcNext from "@trpc/server/adapters/next";
interface CreateContextOptions {
    req: trpcNext.CreateNextContextOptions["req"];
}

export async function createContextInner(opts: CreateContextOptions) {
    const auth = getAuth(opts.req);
    return {
        db,
        auth,
    };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

export async function createContext(
    opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
    return await createContextInner({ req: opts.req });
}
