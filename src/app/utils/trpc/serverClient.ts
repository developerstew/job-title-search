import { appRouter } from '@/server';
import { createCallerFactory } from '@/server/trpc';

const createCaller = createCallerFactory(appRouter);

// @ts-ignore
export const serverClient = createCaller();
