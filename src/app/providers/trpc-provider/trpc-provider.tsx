'use client';

import { client as trpc } from '@/app/utils/trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { ReactNode, useState } from 'react';

function getAuthCookie() {
    // Implement your logic to get the auth cookie here
    return 'your-auth-cookie';
}

interface TrpcProviderProps {
    children: ReactNode;
}

export const TrpcProvider: React.FC<TrpcProviderProps> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:3000/api/trpc',
                    async headers() {
                        return {
                            authorization: getAuthCookie(),
                        };
                    },
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};
