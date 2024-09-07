import { cache } from "react";
import { createQueryClient } from "./query-clients.ts";
import { createContext } from "../server/api/context.ts";
import { createCallerFactory } from "../server/api/trpc.ts";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { appRouter, AppRouter } from "../server/api/routers/_app.ts";

export const createCaller = createCallerFactory(appRouter);

const getQueryClientCached = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClientCached,
);
