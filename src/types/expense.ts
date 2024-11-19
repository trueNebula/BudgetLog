export type Expense = {
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

export type ExpenseRecurrence = {
  id: string;
  expenseId: string;
  type: string;
  days: number[];
  userId: string;
};

// Table Data
export type ExpenseItem = {
  id: string;
  description: string;
  amount: number;
  currency: string;
  excludeFromAnalytics: boolean;
  realizedAt: string;
};
