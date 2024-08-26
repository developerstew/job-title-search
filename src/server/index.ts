// Database

import { createCallerFactory, mergeRouters } from "./trpc";

// Routers
import { jobsRouter } from "./routers/jobs";

export const appRouter = mergeRouters(jobsRouter);

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
