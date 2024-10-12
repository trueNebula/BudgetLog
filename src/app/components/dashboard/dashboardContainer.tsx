import { useEffect } from 'react';
import { createSwapy } from 'swapy';
import Tips from '@/app/components/dashboard/tips.tsx';
import Incomes from '@/app/components/dashboard/incomes.tsx';
import Savings from '@/app/components/dashboard/savings.tsx';
import Balances from '@/app/components/dashboard/balances.tsx';
import Expenses from '@/app/components/dashboard/expenses.tsx';
import Investments from '@/app/components/dashboard/investments.tsx';
import '@/styles/dashboard.scss';

export default function DashboardContainer() {
  useEffect(() => {
    const container = document.querySelector('.container');
    const slots = document.querySelectorAll('.slot');
    const items = document.querySelectorAll('.item');
    const swapy = createSwapy(container, {
      animation: 'spring',
      swapMode: 'drop',
    });

    // document.addEventListener('mouseup', () => {
    //   items.forEach((item) => {
    //     item.classList.remove('clicking');
    //   });
    // });
    for (let i = 0; i < items.length; i += 1) {
      items[i].addEventListener('mousedown', () => {
        items[i].classList.add('clicking');
      });
    }
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

    return () => swapy.destroy();
  }, []);

  return (
    <div className="container flex flex-col gap-[5vh] h-full justify-center items-center min-w-full overflow-hidden">
      <div className="row">
        <div className="slot grow" data-swapy-slot="1">
          <Balances />
        </div>
        <div className="slot h-full aspect-square" data-swapy-slot="2">
          <Incomes />
        </div>
      </div>
      <div className="row-tall">
        <div className="slot grow" data-swapy-slot="3">
          <Expenses />
        </div>
        <div className="slot grow" data-swapy-slot="4">
          <Investments />
        </div>
      </div>
      <div className="row">
        <div className="slot grow" data-swapy-slot="5">
          <Savings />
        </div>
        <div className="slot h-full aspect-square" data-swapy-slot="6">
          <Tips />
        </div>
      </div>
    </div>
  );
}
