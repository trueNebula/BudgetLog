import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import AddBalanceDialog from '@/app/dashboard/_components/dashboard/dialogs/addBalanceDialog';
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';

const tempBalances = [
  {
    id: 1,
    name: 'Balance #1',
    value: 230,
    currency: '$',
  },
  {
    id: 2,
    name: 'Balance #2',
    value: 4023,
    currency: '€',
  },
  {
    id: 3,
    name: 'Balance #3',
    value: 11543.23,
    currency: '$',
  },
  {
    id: 4,
    name: 'Balance #4',
    value: 11543.23,
    currency: '$',
  },
  // {
  //   id: 5,
  //   name: 'Balance #5',
  //   value: 11543.23,
  //   currency: '$',
  // },
  // {
  //   id: 6,
  //   name: 'Balance #6',
  //   value: 11543.23,
  //   currency: '$',
  // },
];

export default function Balances() {
  const isBalancesVisible = useDashboardStore((state) => state.isBalancesVisible);

  // TODO: Fetch balances from API
  const balances = tempBalances;

  if (!isBalancesVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="a" />;
  }

  return (
    <div className="item h-full" data-swapy-item="a">
      <ScrollArea className="rounded-[1rem]">
        <div className="flex gap-6 justify-center items-center p-4 h-full">
          {balances.length ? (
            balances.map((balance) => (
              <Card key={balance.id} className="min-w-52">
                <CardHeader>
                  <CardTitle>{balance.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-lg font-semibold">{balance.currency}</span>
                  <span>{balance.value}</span>
                </CardContent>
                <CardFooter>
                  <p className="text-xs">Last updated: 10 minutes ago</p>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="w-52">
              <CardHeader>
                <CardTitle>No Balances Found!</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg">Use the + button to add a new balance!</span>
              </CardContent>
            </Card>
          )}
          <AddBalanceDialog />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
