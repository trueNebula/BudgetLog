import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';

export default function Savings() {
  const isSavingsVisible = useDashboardStore((state) => state.isSavingsVisible);

  if (!isSavingsVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="f" />;
  }
  return (
    <div className="item bg-yellow-400 h-full" data-swapy-item="f">
      <div>Savings</div>
    </div>
  );
}
