import { createContext } from "@/server/api/context.ts";
import { appRouter } from "@/server/api/routers/_app.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createContext,
  });
};

export { handler as GET, handler as POST };
