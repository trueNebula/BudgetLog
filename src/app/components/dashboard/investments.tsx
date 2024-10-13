import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';

export default function Investments() {
  const isInvestmentsVisible = useDashboardStore((state) => state.isInvestmentsVisible);

  if (!isInvestmentsVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="e" />;
  }
  return (
    <div className="item bg-green-400 h-full" data-swapy-item="e">
      <div>Investments</div>
    </div>
  );
}
