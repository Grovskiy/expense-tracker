export interface BudgetSummuryModel {
  totalIncomes: number;
  totalExpenses: number;
  netIncome: number;
  expensesByCategory: [
    {
      id: string;
      name: string;
      totalAmount: number;
    },
  ];
  incomesByCategory: [
    {
      id: string;
      name: string;
      totalAmount: number;
    },
  ];
}
