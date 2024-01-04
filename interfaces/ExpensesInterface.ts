import type { ExpenseInterface } from '~/interfaces/ExpenseInterface';

export interface ExpensesInterface {
  data: ExpenseInterface[];
  limit: number;
  offset: number;
  total: number;
}
