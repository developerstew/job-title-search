// Routers
import { jobsRouter } from './routers/jobs';
import { router } from './trpc';

export const appRouter = router({
    jobs: jobsRouter,
});

export type AppRouter = typeof appRouter;
