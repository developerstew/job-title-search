import * as trpcNext from "@trpc/server/adapters/next";
import { createCallerFactory, publicProcedure, router } from "../trpc";

// Context
import { createContext } from "../context";

// Routers
import { jobsRouter } from "./jobs";

export const appRouter = router({
    healthcheck: publicProcedure.query(() => "healthy!"),
    jobs: jobsRouter,
});

export const createCaller = createCallerFactory(appRouter);

export const caller = async (opts: trpcNext.CreateNextContextOptions) => {
    const ctx = await createContext(opts);
    return createCaller(ctx);
};

export type AppRouter = typeof appRouter;
