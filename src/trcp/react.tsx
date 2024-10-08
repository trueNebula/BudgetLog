'use client';

import SuperJSON from 'superjson';
import { PropsWithChildren, useState } from 'react';
import { createQueryClient } from './query-client.ts';
import { AppRouter } from '@/server/api/routers/_app.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCReact,
  // eslint-disable-next-line camelcase
  unstable_httpBatchStreamLink,
  loggerLink,
  getFetch,
} from '@trpc/react-query';
import { SessionProvider } from 'next-auth/react';

export const api = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  // eslint-disable-next-line no-return-assign
  return (clientQueryClientSingleton ??= createQueryClient());
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

function TRPCReactProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        unstable_httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers: () => {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            return headers;
          },
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
          transformer: SuperJSON,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          {children}
        </api.Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default TRPCReactProvider;
