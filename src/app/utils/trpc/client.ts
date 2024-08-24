// @ts-nocheck
import { type AppRouter } from '@/server';
import { createTRPCReact } from '@trpc/react-query';

export const client = createTRPCReact<AppRouter>({});
