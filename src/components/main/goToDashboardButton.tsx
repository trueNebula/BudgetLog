'use client';

import { useRouter } from 'next/navigation';

function GoToDashboardButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/dashboard')} type="button">
      Go to dashboard
    </button>
  );
}

export default GoToDashboardButton;
