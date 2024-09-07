import { z } from "zod";
import { router } from "../trpc.ts";
import publicProcedure from "../procedures/public.ts";

export const helloRouter = router({
  helloSafe: publicProcedure.query(() => ({
    greeting: `Hello safely from tRPC!`,
  })),
  talk: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => ({
      greeting: `Hello ${input.text} from tRPC!`,
    })),
});

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
