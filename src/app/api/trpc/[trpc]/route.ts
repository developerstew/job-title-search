import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import dotenv from 'dotenv';

dotenv.config();

const env = {
    NODE_ENV: process.env.NODE_ENV,
};

import { appRouter } from '@/server';
import { createTRPCContext } from '@/server/context';

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => createTRPCContext(req),
        onError:
            env.NODE_ENV === 'development'
                ? ({ path, error }) => {
                      // eslint-disable-next-line no-console
                      console.error(
                          `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
                      );
                  }
                : undefined,
    });

export { handler as GET, handler as POST };
