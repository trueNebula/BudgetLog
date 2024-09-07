import { middleware } from "../trpc.ts";
import { TRPCError } from "@trpc/server";

export const withAuth = middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
