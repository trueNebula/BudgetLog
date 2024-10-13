import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import { LockKey, LockKeyOpen } from '@phosphor-icons/react';

export default function LockLayout() {
  const toggleDashboardLocked = useDashboardStore((state) => state.toggleDashboardLocked);
  const isDashboardLocked = useDashboardStore((state) => state.isDashboardLocked);

  return (
    <div className="section-toggle">
      <input
        type="checkbox"
        id="toggle-lock"
        className="mr-2"
        defaultChecked={isDashboardLocked}
        onChange={toggleDashboardLocked}
      />
      <label htmlFor="toggle-lock" className="flex items-center gap-2">
        <LockKey className="unchecked" size={32} />
        <LockKeyOpen className="checked" size={32} />
        <span>{isDashboardLocked}</span>
      </label>
    </div>
  );
}
