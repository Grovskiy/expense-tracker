import type { CreateFinancialRequest } from '~/models/CreateFinancialRequest';

export interface CreateExpenseRequest extends CreateFinancialRequest{
  cost: number;
}
