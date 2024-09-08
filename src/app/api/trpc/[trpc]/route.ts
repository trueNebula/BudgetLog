import { NextRequest } from "next/server";
import { createTRPCContext } from "@/server/api/trpc.ts";
import { appRouter } from "@/server/api/routers/_app.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });
};

export { handler as GET, handler as POST };
