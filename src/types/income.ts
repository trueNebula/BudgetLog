export type Income = {
  id: string;
  description: string;
  amount: number;
  currency: string;
  excludeFromAnalytics: boolean;
  balanceId: string;
  createdAt: string;
  realizedAt: string;
  recurring: boolean;
};

export type IncomeRecurrence = {
  id: string;
  incomeId: string;
  type: string;
  days: number[];
  userId: string;
};

// Table Data
export type IncomeItem = {
  id: string;
  description: string;
  amount: string;
  excludeFromAnalytics: boolean;
  realizedAt: string;
};
