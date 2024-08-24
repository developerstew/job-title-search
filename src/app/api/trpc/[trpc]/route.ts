import { appRouter } from '@/server';
import { createContext } from '@/server/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = async (req: Request) => {
    const response = await fetchRequestHandler({
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
