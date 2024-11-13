import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import AddBalanceDialog from '@/app/dashboard/_components/dashboard/dialogs/addBalanceDialog';
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import { api } from '@/trcp/react.tsx';
import Loader from '@/components/loader.tsx';

type Balance = {
  id: string;
  name: string;
  amount: number;
  currency: string;
  userId: string;
};

export default function Balances() {
  const isBalancesVisible = useDashboardStore((state) => state.isBalancesVisible);

  const { data: balances, status } = api.balances.getBalances.useQuery() as {
    data: Balance[];
    status: string;
  };
  if (!isBalancesVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="a" />;
  }

  const renderBalances = () => {
    if (balances && balances.length) {
      return balances.map((balance) => (
        <Card key={balance?.id} className="min-w-52">
          <CardHeader>
            <CardTitle>{balance.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-lg font-semibold">{balance.currency}</span>
            <span>{balance?.amount}</span>
          </CardContent>
          <CardFooter>
            <p className="text-xs">Last updated: 10 minutes ago</p>
          </CardFooter>
        </Card>
      ));
    }

    return (
      <Card className="w-52">
        <CardHeader>
          <CardTitle>No Balances Found!</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-lg">Use the + button to add a new balance!</span>
        </CardContent>
      </Card>
    );
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
