import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';

export default function Tips() {
  const isTipsVisible = useDashboardStore((state) => state.isTipsVisible);

  if (!isTipsVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="b" />;
  }
  return (
    <div className="item bg-orange-500 h-full" data-swapy-item="b">
      <div>Tips</div>
    </div>
  );
}
