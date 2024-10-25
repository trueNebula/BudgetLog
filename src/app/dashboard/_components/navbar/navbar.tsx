'use client';

import React from 'react';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';
import { House, SignOut } from '@phosphor-icons/react';
import Header from '@/app/dashboard/_components/navbar/header';
import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import LockLayout from '@/app/dashboard/_components/navbar/lockLayoutCheckbox';
import VisibilityCheckbox from '@/app/dashboard/_components/navbar/visibilityCheckbox';

export default function Navbar({ user }: { user: { id: string; name: string; image: string } }) {
  const {
    isBalancesVisible,
    isIncomeStreamsVisible,
    isExpensesVisible,
    isInvestmentsVisible,
    isSavingsVisible,
    isTipsVisible,
  } = useDashboardStore(
    useShallow((state) => ({
      isBalancesVisible: state.isBalancesVisible,
      isIncomeStreamsVisible: state.isIncomeStreamsVisible,
      isExpensesVisible: state.isExpensesVisible,
      isInvestmentsVisible: state.isInvestmentsVisible,
      isSavingsVisible: state.isSavingsVisible,
      isTipsVisible: state.isTipsVisible,
    })),
  );
  const {
    toggleBalancesVisible,
    toggleIncomeStreamsVisible,
    toggleExpensesVisible,
    toggleInvestmentsVisible,
    toggleSavingsVisible,
    toggleTipsVisible,
  } = useDashboardStore(
    useShallow((state) => ({
      toggleBalancesVisible: state.toggleBalancesVisible,
      toggleIncomeStreamsVisible: state.toggleIncomeStreamsVisible,
      toggleExpensesVisible: state.toggleExpensesVisible,
      toggleInvestmentsVisible: state.toggleInvestmentsVisible,
      toggleSavingsVisible: state.toggleSavingsVisible,
      toggleTipsVisible: state.toggleTipsVisible,
    })),
  );

  return (
    <nav className="bg-primary text-lg grow max-w-80 flex flex-col items-start justify-between px-4 py-8">
      <div className="flex flex-col items-start gap-8 w-full">
        <Header name={user.name} image={user.image} />
        <span className="w-full h-[2px] bg-zinc-500 rounded-full" />
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold">Toggle Sections</div>
          <VisibilityCheckbox
            title="Balances"
            defaultChecked={isBalancesVisible}
            changeHandler={toggleBalancesVisible}
          />
          <VisibilityCheckbox
            title="Tips"
            defaultChecked={isTipsVisible}
            changeHandler={toggleTipsVisible}
          />
          <VisibilityCheckbox
            title="Income Streams"
            defaultChecked={isIncomeStreamsVisible}
            changeHandler={toggleIncomeStreamsVisible}
          />
          <VisibilityCheckbox
            title="Expenses"
            defaultChecked={isExpensesVisible}
            changeHandler={toggleExpensesVisible}
          />
          <VisibilityCheckbox
            title="Investments"
            defaultChecked={isInvestmentsVisible}
            changeHandler={toggleInvestmentsVisible}
          />
          <VisibilityCheckbox
            title="Savings"
            defaultChecked={isSavingsVisible}
            changeHandler={toggleSavingsVisible}
          />
        </div>
        <LockLayout />
      </div>
      <div className="flex justify-between items-center gap-8 w-full">
        <Link href="/" className="flex items-center gap-2">
          <House size={24} />
          <span>Home</span>
        </Link>
        <Link href="/api/auth/signout" className="flex items-center gap-2">
          <span>Sign Out</span>
          <SignOut size={24} />
        </Link>
      </div>
    </nav>
  );
}
