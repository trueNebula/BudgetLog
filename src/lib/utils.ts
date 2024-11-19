import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(key);
};

export const columnPlacement = {
  description: 'text-left',
  amount: 'text-center',
  excludeFromAnalytics: 'text-center',
  realizedAt: 'text-right',
};
