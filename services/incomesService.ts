import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { IncomeModel } from '~/models/income/IncomeModel';
import type { CreateIncomeRequest } from '~/models/income/CreateIncomeRequest';

export function incomesService() {
  function getIncomes(
    limit: number,
    offset: number,
    dateFrom: string,
    dateTo: string,
  ): Promise<PaginatedCollectionResponse<IncomeModel>> {
    return $fetch('/api/Incomes', {
      method: 'get',
      query: {
        limit,
        offset,
        dateFrom,
        dateTo,
      },
    });
  }
  async function postIncome(payload: CreateIncomeRequest) {
    await $fetch('/api/Incomes', {
      method: 'post',
      body: payload,
    })
      .then(() => handlerThen('Додано'))
      .catch(err => {
        console.log(err);
      });
  }

  function changeIncome(payload: IncomeModel) {
    const { id, notes, amount, taxAmount, date, categoryId, currencyId } = payload;
    return $fetch(`/api/Incomes/${id}`, {
      method: 'put',
      body: {
        notes,
        amount,
        taxAmount,
        date,
        categoryId,
        currencyId,
      },
    });
  }

  function deleteIncome(id: IncomeModel['id']) {
    return $fetch(`/api/Incomes/${id}`, {
      method: 'delete',
      body: {},
    });
  }

  function handlerThen(text: string) {
    useToast().add({
      title: text,
      timeout: 3000,
    });
  }

  return {
    getIncomes,
    postIncome,
    changeIncome,
    deleteIncome,
  };
}
