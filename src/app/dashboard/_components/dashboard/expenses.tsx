import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';

export default function Expenses() {
  const isExpensesVisible = useDashboardStore((state) => state.isExpensesVisible);

  if (!isExpensesVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="d" />;
  }
  return (
    <div className="item bg-blue-500 h-full" data-swapy-item="d">
      <div>Expenses</div>
    </div>
  );
}
