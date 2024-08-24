import { jobsRouter } from './routers/jobs';
import { router } from './trpc';

// Routers

export const appRouter = router({
    jobs: jobsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

// TO check auth
// import { router, publicProcedure } from '../trpc'

// export const exampleRouter = router({
//   hello: publicProcedure.query(({ ctx }) => {
//     return {
//       greeting: `hello! ${ctx.auth?.userId}`,
//     }
//   }),
// })
