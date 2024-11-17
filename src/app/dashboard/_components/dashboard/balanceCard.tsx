import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import ReactTimeAgo from 'react-time-ago';
import { Balance } from '@/types/balance';
import SlotCounter from 'react-slot-counter';

export default function BalanceCard({ balance }: { balance: Balance | null }) {
  if (!balance) {
    return (
      <Card className="w-52 h-full">
        <CardHeader>
          <CardTitle>No Balances Found!</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-lg">Use the + button to add a new balance!</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-52 h-full">
      <CardHeader>
        <CardTitle>{balance.name}</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 flex justify-start items-center gap-1">
        <span className="min-h-full">{balance.currency}</span>
        <span className="-translate-y-[2px]">
          <SlotCounter value={balance?.amount} />
        </span>
      </CardContent>
      <CardFooter className="mt-6">
        <p className="text-xs">
          Last updated:&nbsp;
          <ReactTimeAgo date={balance.updatedAt} locale="en-US" timeStyle="round-minute" />
        </p>
      </CardFooter>
    </Card>
  );
}
