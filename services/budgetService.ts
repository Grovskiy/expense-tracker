import type { BudgetSummuryModel } from '~/models/BudgetSummuryModel';

export function budgetService() {
  function getBudget(
    dateFrom: string,
    dateTo: string,
    currencyId: string,
  ): Promise<BudgetSummuryModel> {
    return $fetch('/api/Budget/summary', {
      method: 'get',
      query: {
        dateFrom,
        dateTo,
        currencyId,
      },
    });
  }

  return {
    getBudget,
  };
}
