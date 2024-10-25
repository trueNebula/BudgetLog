import { getAuthSession } from '@/server/auth';
import Loader from '@/components/loader.tsx';
import Navbar from '@/app/dashboard/_components/navbar/navbar';
import DashboardContainer from '@/app/dashboard/_components/dashboard/dashboardContainer';

export default async function Dashboard() {
  const session = await getAuthSession();
  // console.log(data, status);

  // if (status === 'loading' || !data?.user.name || !data?.user.image) {
  //   return (
  //     <div className="min-h-screen w-full flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  const loggedUser = {
    id: session.user.id,
    name: session.user.name,
    image: session.user.image,
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
