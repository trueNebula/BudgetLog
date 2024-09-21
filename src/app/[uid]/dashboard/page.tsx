'use client';

import Navbar from '@/app/components/navbar/navbar';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function Dashboard() {
  const session = useSession();
  const { uid } = useParams();

  if (
    !session ||
    (session.status !== 'loading' && session.data?.user.id !== uid)
  ) {
    return <div>Unauthorized</div>;
  }

  if (session.status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full flex justify-between">
      <Navbar />
      <main className="bg-red-500 min-h-screen grow">lol</main>
    </div>
  );
}
