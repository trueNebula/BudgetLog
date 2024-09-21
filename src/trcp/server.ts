import { cache } from 'react';
import { headers } from 'next/headers';
import { createQueryClient } from './query-client.ts';
import { createTRPCContext, createCallerFactory } from '@/server/api/trpc.ts';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { appRouter, AppRouter } from '@/server/api/routers/_app.ts';

export const createCaller = createCallerFactory(appRouter);

const createContextWithHeads = cache(() => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClientCached = cache(createQueryClient);
const caller = createCaller(createContextWithHeads);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClientCached,
);
