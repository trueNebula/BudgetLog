import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import AddBalanceDialog from '@/app/dashboard/_components/dashboard/dialogs/addBalanceDialog';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { api } from '@/trcp/react.tsx';
import Loader from '@/components/loader.tsx';
import BalanceCard from '@/app/dashboard/_components/dashboard/balanceCard';
import { Balance } from '@/types/balance';
import { useEffect } from 'react';

export default function Balances() {
  const isBalancesVisible = useDashboardStore((state) => state.isBalancesVisible);

  const { data: balances, status } = api.balances.getBalances.useQuery() as {
    data: Balance[];
    status: string;
  };

  useEffect(() => {
    TimeAgo.addLocale(en);
  }, []);

  if (!isBalancesVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="a" />;
  }

  const renderBalances = () => {
    if (balances && balances.length) {
      return balances.map((balance) => <BalanceCard key={balance.id} balance={balance} />);
    }

    return <BalanceCard balance={null} />;
  };

  return (
    <div className="item h-full" data-swapy-item="a">
      <ScrollArea className="rounded-[1rem]">
        <div className="flex gap-6 justify-center items-center p-4 h-full">
          {status === 'pending' ? <Loader /> : renderBalances()}
          <AddBalanceDialog />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
