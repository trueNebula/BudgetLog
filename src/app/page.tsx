import React from 'react';
import Link from 'next/link';
import { api } from '../trcp/server.ts';

import { getAuthSession } from '@/server/auth.ts';
import AddTest from '../components/main/addTest.tsx';
import GoToDashboardButton from '../components/main/goToDashboardButton.tsx';

export default async function Home() {
  const { greeting: dataPossiblyUndefined } = await api.hello.talk({
    text: 'again',
  });

  const session = await getAuthSession();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello! {dataPossiblyUndefined}
        {session && session.user.name}
        {session ? (
          <>
            <GoToDashboardButton />
            <Link href="/api/auth/signout">Sign Out</Link>
          </>
        ) : (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
        <AddTest />
      </main>
    </div>
  );
}
