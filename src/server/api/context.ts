import "server-only";
import { headers } from "next/headers";

export const createContext = async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  // const session = await getSession();
  const ctx = {
    session: {
      user: "testing",
      email: "test@test.com",
    },
    headers: heads,
  };

  return ctx;
};

export type Context = typeof createContext;
