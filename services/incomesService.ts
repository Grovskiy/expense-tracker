import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { IncomeModel } from '~/models/income/IncomeModel';
import type { CreateIncomeRequest } from '~/models/income/CreateIncomeRequest';

export function incomesService() {
  async function getIncomes(
    limit: number,
    offset: number,
    dateFrom: string,
    dateTo: string,
  ): Promise<PaginatedCollectionResponse<IncomeModel>> {
    return await $fetch('/api/Incomes', {
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

  async function deleteIncome(id: IncomeModel['id']) {
    await $fetch(`/api/Incomes/${id}`, {
      method: 'delete',
      body: {},
    })
      .then(res => {
        console.log(res);
        handlerThen('Видалено');
      })
      .catch(err => {
        console.log(err);
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
    deleteIncome,
  };
}
