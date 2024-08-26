// Clerk
import { getAuth } from "@clerk/nextjs/server";

// TRPC
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = async (opts: CreateNextContextOptions) => {
    return { auth: getAuth(opts.req) };
};

export type Context = typeof createContext;
