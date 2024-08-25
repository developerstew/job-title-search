import * as trpcNext from "@trpc/server/adapters/next";

import dotenv from "dotenv";

dotenv.config();

const env = {
    NODE_ENV: process.env.NODE_ENV,
};

import { appRouter } from "@/server";
import { createContext } from "@/server/context";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
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
