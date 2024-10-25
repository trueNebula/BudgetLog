import { getAuthSession } from '@/server/auth';
import Navbar from '@/app/dashboard/_components/navbar/navbar';
import DashboardContainer from '@/app/dashboard/_components/dashboard/dashboardContainer';

export default async function Dashboard() {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  if (!session.user.name || !session.user.image) {
    console.error('User data is missing');
    return null;
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
