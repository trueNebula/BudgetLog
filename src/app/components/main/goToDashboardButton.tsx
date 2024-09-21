'use client';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

function GoToDashboardButton({ session }: { session: Session }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/${session.user.id}/dashboard`)}
      type="button"
    >
      Go to dashboard
    </button>
  );
}

export default GoToDashboardButton;
