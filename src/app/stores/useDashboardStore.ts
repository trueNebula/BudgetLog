import { create } from 'zustand';

interface IDashboardStore {
  isDashboardLocked: boolean;
  toggleDashboardLocked: () => void;
  isBalancesVisible: boolean;
  toggleBalancesVisible: () => void;
  isIncomeStreamsVisible: boolean;
  toggleIncomeStreamsVisible: () => void;
  isExpensesVisible: boolean;
  toggleExpensesVisible: () => void;
  isInvestmentsVisible: boolean;
  toggleInvestmentsVisible: () => void;
  isSavingsVisible: boolean;
  toggleSavingsVisible: () => void;
  isTipsVisible: boolean;
  toggleTipsVisible: () => void;
}

const saveState = (state: IDashboardStore) => {
  localStorage.setItem(
    'dashboardPrefs',
    JSON.stringify({
      isDashboardLocked: state.isDashboardLocked,
      isBalancesVisible: state.isBalancesVisible,
      isIncomeStreamsVisible: state.isIncomeStreamsVisible,
      isExpensesVisible: state.isExpensesVisible,
      isInvestmentsVisible: state.isInvestmentsVisible,
      isSavingsVisible: state.isSavingsVisible,
      isTipsVisible: state.isTipsVisible,
    }),
  );
};

const getState = (state: string): boolean => {
  if (typeof window === 'undefined') return true;
  const savedState = localStorage.getItem('dashboardPrefs');
  if (!savedState) {
    return true;
  }
  return JSON.parse(savedState)[state];
};

export const useDashboardStore = create<IDashboardStore>((set, get) => ({
  isDashboardLocked: getState('isDashboardLocked'),
  toggleDashboardLocked: () => {
    set((state) => ({ isDashboardLocked: !state.isDashboardLocked }));
    saveState(get());
  },
  isBalancesVisible: getState('isBalancesVisible'),
  toggleBalancesVisible: () => {
    set((state) => ({ isBalancesVisible: !state.isBalancesVisible }));
    saveState(get());
  },
  isIncomeStreamsVisible: getState('isIncomeStreamsVisible'),
  toggleIncomeStreamsVisible: () => {
    set((state) => ({ isIncomeStreamsVisible: !state.isIncomeStreamsVisible }));
    saveState(get());
  },
  isExpensesVisible: getState('isExpensesVisible'),
  toggleExpensesVisible: () => {
    set((state) => ({ isExpensesVisible: !state.isExpensesVisible }));
    saveState(get());
  },
  isInvestmentsVisible: getState('isInvestmentsVisible'),
  toggleInvestmentsVisible: () => {
    set((state) => ({ isInvestmentsVisible: !state.isInvestmentsVisible }));
    saveState(get());
  },
  isSavingsVisible: getState('isSavingsVisible'),
  toggleSavingsVisible: () => {
    set((state) => ({ isSavingsVisible: !state.isSavingsVisible }));
    saveState(get());
  },
  isTipsVisible: getState('isTipsVisible'),
  toggleTipsVisible: () => {
    set((state) => ({ isTipsVisible: !state.isTipsVisible }));
    saveState(get());
  },
}));
