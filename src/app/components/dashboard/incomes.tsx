import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';

export default function Incomes() {
  const isIncomeStreamsVisible = useDashboardStore((state) => state.isIncomeStreamsVisible);

  if (!isIncomeStreamsVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="c" />;
  }
  return (
    <div className="item bg-rose-500 h-full" data-swapy-item="c">
      <div>Incomes</div>
    </div>
  );
}
