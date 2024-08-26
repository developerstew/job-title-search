import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";

// Trpc
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import dotenv from "dotenv";
import { type NextRequest } from "next/server";

dotenv.config();

const env = {
    NODE_ENV: process.env.NODE_ENV,
};

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        // @ts-ignore
        createContext,
        onError:
            env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      // eslint-disable-next-line no-console
                      console.error(
                          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
                      );
                  }
                : undefined,
    });

export { handler as GET, handler as POST };
