'use client';

import { useParams } from 'next/navigation';
import Loader from '@/app/components/loader';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/navbar/navbar';
import DashboardContainer from '../../components/dashboard/dashboardContainer.tsx';

export default function Dashboard() {
  const { data, status } = useSession();
  const { uid } = useParams();
  // console.log(data, status);

  if (status === 'loading' || !data?.user.name || !data?.user.image) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (data === null || (status === 'authenticated' && data?.user.id !== uid)) {
    return <div>Unauthorized</div>;
  }

  const loggedUser = {
    id: data.user.id,
    name: data.user.name,
    image: data.user.image,
  };

  return (
    <div className="min-h-screen w-full flex justify-between">
      <Navbar user={loggedUser} />
      <main className="min-h-screen grow">
        <DashboardContainer />
      </main>
    </div>
  );
}
