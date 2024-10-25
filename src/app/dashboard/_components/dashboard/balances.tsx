import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';

export default function Balances() {
  const isBalancesVisible = useDashboardStore((state) => state.isBalancesVisible);

  if (!isBalancesVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="a" />;
  }

  return (
    <div className="item bg-slate-600 h-full" data-swapy-item="a">
      <div>Balances</div>
    </div>
  );
}
