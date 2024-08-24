// @ts-nocheck
'use client';

import { client as trpc } from '@/app/utils/trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { ReactNode, useState } from 'react';

interface TrpcProviderProps {
    children: ReactNode;
}

export const TrpcProvider: React.FC<TrpcProviderProps> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            // @ts-ignore
            links: [
                // @ts-ignore
                httpBatchLink({
                    url: 'http://localhost:3000/api/trpc',
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
