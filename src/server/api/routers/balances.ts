import { z } from 'zod';
import { router } from '../trpc.ts';
import authProcedure from '../procedures/auth.ts';
import { balances } from '@/server/db/schema.ts';
import { eq } from 'drizzle-orm';

export const balancesRouter = router({
  getBalances: authProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(balances)
      .where(eq(balances.userId, ctx.session.user.id));
    return result;
  }),

  addBalance: authProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        amount: z.number().int(),
        currency: z.string().min(1).max(255),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(balances).values({
        name: input.name,
        amount: input.amount,
        currency: input.currency,
        userId: ctx.session.user.id,
      });
    }),
});
