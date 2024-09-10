import { ZodError } from "zod";
import superjson from "superjson";
import { initTRPC } from "@trpc/server";
import { db } from "@/server/db/index.ts";
import { getAuthSession } from "../auth";

/** Context Creator
 * This holds all the created procedures and passes along important info such as
 * database connections and auth info.
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  // const session = await getSession();
  const ctx = {
    db,
    session: await getAuthSession(),
    ...opts,
  };

  return ctx;
};

/**
 * Initialize the tRPC API, while specifying a data transformer and error formatting
 * for type safety in the frontend when validation fails in the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Server side caller
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Exports
 */
export const router = t.router;
export const middleware = t.middleware;
export const procedure = t.procedure;
