import "server-only";
import { db } from "../db/index.ts";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  // const session = await getSession();
  const ctx = {
    db,
    session: {
      user: "testing",
      email: "test@test.com",
    },
    ...opts,
  };

  return ctx;
};

export type Context = typeof createTRPCContext;
