import { appRouter } from '@/server';
import { getAuth } from '@clerk/nextjs/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import * as trpcNext from '@trpc/server/adapters/next';

const createContext = async (opts: trpcNext.CreateNextContextOptions) => ({
    auth: getAuth(opts.req),
});

export type Context = Awaited<ReturnType<typeof createContext>>;

const handler = async (req: Request) => {
    const response = await fetchRequestHandler({
        // @ts-ignore
        createContext,
        endpoint: 'api/trpc',
        req,
        router: appRouter,
    });

    return new Response(response.body, {
        headers: response.headers,
        status: response.status,
    });
};

export { handler as GET, handler as POST };
