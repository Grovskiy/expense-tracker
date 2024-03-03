import type { CreateFinancialRequest } from '~/models/CreateFinancialRequest';

export interface CreateIncomeRequest extends CreateFinancialRequest {
  amount: number | undefined;
  taxAmount: number | undefined;
}
