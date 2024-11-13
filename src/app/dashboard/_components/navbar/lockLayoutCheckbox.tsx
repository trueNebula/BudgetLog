import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { LockKey, LockKeyOpen } from '@phosphor-icons/react';

export default function LockLayout() {
  const toggleDashboardLocked = useDashboardStore((state) => state.toggleDashboardLocked);
  const isDashboardLocked = useDashboardStore((state) => state.isDashboardLocked);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="section-toggle">
            <input
              type="checkbox"
              id="toggle-lock"
              className="mr-2"
              defaultChecked={isDashboardLocked}
              onChange={toggleDashboardLocked}
            />
            <label htmlFor="toggle-lock" className="flex items-center gap-2">
              <LockKey className="unchecked" size={24} />
              <LockKeyOpen className="checked" size={24} />
              <span>{isDashboardLocked}</span>
            </label>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          {isDashboardLocked ? <p>Unlock Layout</p> : <p>Lock Layout</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
