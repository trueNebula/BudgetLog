import SuperJSON from "superjson";
import { Context } from "./context.ts";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;

export const router = t.router;
export const procedure = t.procedure;
