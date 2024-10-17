import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@/src/app/api/trpc/routers/_app";

export const client = createTRPCReact<AppRouter>({});
