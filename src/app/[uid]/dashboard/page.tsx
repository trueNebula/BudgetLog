'use client';

import { useParams } from 'next/navigation';
import Loader from '@/app/components/loader';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/navbar/navbar';

export default function Dashboard() {
  const { data, status } = useSession();
  const { uid } = useParams();
  console.log(data, status);

  if (status === 'loading') {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (data === null || (status === 'authenticated' && data?.user.id !== uid)) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="min-h-screen w-full flex justify-between">
      <Navbar />
      <main className="bg-red-500 min-h-screen grow">lol</main>
    </div>
  );
}
