import type { CreateFinancialRequest } from '~/models/CreateFinancialRequest';

export interface CreateIncomeRequest extends CreateFinancialRequest{
  amount: number;
  taxAmount: number;
}
