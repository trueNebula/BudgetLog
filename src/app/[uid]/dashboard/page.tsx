'use client';

import { useParams } from 'next/navigation';
import Loader from '@/app/components/loader';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/navbar/navbar';

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
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-between">
      <Navbar />
      <main className="bg-red-500 min-h-screen grow">lol</main>
    </div>
  );
}
