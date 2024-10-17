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

export const caller = async () => {
    const ctx = await createContext();
    return createCaller(ctx);
};

export type AppRouter = typeof appRouter;
