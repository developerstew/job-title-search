import { auth } from "@clerk/nextjs/server";

export async function createContextInner() {
    const authData = auth();
    return authData;
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

export async function createContext(): Promise<Context> {
    return await createContextInner();
}
