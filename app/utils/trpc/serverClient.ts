"use server";

import { appRouter } from "@/app/api/trpc/routers/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { createContext } from "../../api/trpc/context";

export const clientHelpers = async () => {
    return createServerSideHelpers({
        ctx: await createContext(),
        router: appRouter,
        transformer: superjson,
    });
};
