import { z } from 'zod';
import { router } from '../trpc.ts';
import { test } from '@/server/db/schema.ts';
import publicProcedure from '../procedures/public.ts';
import authProcedure from '../procedures/auth.ts';

export const helloRouter = router({
  talk: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => ({
      greeting: `Hello ${input.text} from tRPC!`,
    })),

  test: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.select().from(test);
    return result;
  }),

  addName: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(test).values({
        name: input.name,
      });
    }),

  secret: authProcedure.query(() => ({
    text: 'hiiiiii secwet uwu',
  })),
});

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
