export interface ExpenseModel {
  id?: string;
  notes: string;
  cost: number;
  date: string; // 2024-01-03T19:01:12.407Z
  category: { id: string };
  currency: { id: string };
}
