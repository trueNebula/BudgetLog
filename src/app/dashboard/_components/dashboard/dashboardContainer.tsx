'use client';

import { useEffect, useRef } from 'react';
import { createSwapy, Swapy } from 'swapy';
import Tips from '@/app/dashboard/_components/dashboard/tips';
import Incomes from '@/app/dashboard/_components/dashboard/incomes';
import Savings from '@/app/dashboard/_components/dashboard/savings';
import Balances from '@/app/dashboard/_components/dashboard/balances';
import Expenses from '@/app/dashboard/_components/dashboard/expenses';
import Investments from '@/app/dashboard/_components/dashboard/investments';
import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import { getFromLocalStorage } from '@/lib/utils';
import '@/styles/dashboard.scss';

const DEFAULT_LAYOUT = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
};

const getItemBySlot = (slot: string) => {
  switch (slot) {
    case 'a':
      return <Balances />;
    case 'b':
      return <Tips />;
    case 'c':
      return <Incomes />;
    case 'd':
      return <Expenses />;
    case 'e':
      return <Investments />;
    case 'f':
      return <Savings />;
    default:
      return null;
  }
};

export default function DashboardContainer() {
  const localStorageLayout = useRef<string>(getFromLocalStorage('layout'));
  const slotItems: Record<string, string> = localStorageLayout.current
    ? JSON.parse(localStorageLayout.current)
    : DEFAULT_LAYOUT;
  const isLayoutLocked = useDashboardStore((state) => state.isDashboardLocked);
  const handleMouseDown = (item: Element) => {
    item.classList.add('clicking');
  };

  const handleMouseUp = (item: Element) => {
    item.classList.remove('clicking');
  };

  const swapyRef = useRef<Swapy>();

  useEffect(() => {
    const container = document.querySelector('.container');
    const slots = document.querySelectorAll('.slot');
    const items = document.querySelectorAll('.item');
    swapyRef.current = createSwapy(container as HTMLElement, {
      animation: 'dynamic',
      swapMode: 'hover',
    });
    const swapy = swapyRef.current;

    swapy.enable(false);

    swapy.onSwap(({ newSlotItemMap: data }) => {
      const json = JSON.stringify(data.asObject);
      localStorage.setItem('layout', json);
    });

    swapy.onSwapStart(() => {
      slots.forEach((slot) => {
        slot.classList.add('border-4', 'border-dashed', 'border-gray-400', 'rounded-lg');
      });
      const inactiveItems = Array.from(items).filter(
        (item) => !item.classList.contains('clicking'),
      );
      inactiveItems.forEach((item) => {
        item.classList.add('blur');
      });
    });

    swapy.onSwapEnd(() => {
      slots.forEach((slot) => {
        slot.classList.remove('border-4', 'border-dashed', 'border-gray-400', 'rounded-lg');
      });
      items.forEach((item) => {
        item.classList.remove('clicking', 'blur');
      });
    });

    return () => {
      if (swapyRef.current) swapyRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.item');
    const swapy = swapyRef.current;

    if (!swapy) return () => {};

    const handlers = new Map();
    if (isLayoutLocked) {
      swapy.enable(false);
    }
    if (!isLayoutLocked) {
      swapy.enable(true);

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const handleMouseDownBound = handleMouseDown.bind(null, item);
        const handleMouseUpBound = handleMouseUp.bind(null, item);

        handlers.set(item, { handleMouseDownBound, handleMouseUpBound });

        item.addEventListener('mousedown', handleMouseDownBound);
        item.addEventListener('mouseup', handleMouseUpBound);
      }
    }

    return () => {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const itemHandlers = handlers.get(item);
        if (itemHandlers) {
          item.removeEventListener('mousedown', itemHandlers.handleMouseDownBound);
          item.removeEventListener('mouseup', itemHandlers.handleMouseUpBound);
        }
      }
    };
  }, [isLayoutLocked]);

  return (
    <div className="container flex flex-col gap-[2.5vh] h-full justify-center items-center min-w-full overflow-hidden">
      <div className="row">
        <div className="slot grow max-w-[calc(100%-24vh-1.25vw)]" data-swapy-slot="1">
          {getItemBySlot(slotItems['1'])}
        </div>
        <div className="slot h-full aspect-square" data-swapy-slot="2">
          {getItemBySlot(slotItems['2'])}
        </div>
      </div>
      <div className="row-tall">
        <div className="slot h-full w-1/2" data-swapy-slot="3">
          {getItemBySlot(slotItems['3'])}
        </div>
        <div className="slot h-full w-1/2" data-swapy-slot="4">
          {getItemBySlot(slotItems['4'])}
        </div>
      </div>
      <div className="row">
        <div className="slot grow" data-swapy-slot="5">
          {getItemBySlot(slotItems['5'])}
        </div>
        <div className="slot h-full aspect-square" data-swapy-slot="6">
          {getItemBySlot(slotItems['6'])}
        </div>
      </div>
    </div>
  );
}
