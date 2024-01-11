import type { CreateExpenseRequest } from '~/models/expense/CreateExpenseRequest';
import type { ExpenseModel } from '~/models/expense/ExpenseModel';
import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';

export function expensesService() {
  async function getExpenses(
    limit: number,
    offset: number,
    dateFrom: string,
    dateTo: string,
  ): Promise<PaginatedCollectionResponse<ExpenseModel>> {
    return await $fetch('/api/Expenses', {
      method: 'get',
      query: {
        limit,
        offset,
        dateFrom,
        dateTo,
      },
    });
  }
  async function postExpense(payload: CreateExpenseRequest) {
    await $fetch('/api/Expenses', {
      method: 'post',
      body: payload,
    })
      .then(() => handlerThen('Додано'))
      .catch(err => {
        console.log(err);
      });
  }

  async function deleteExpense(id: ExpenseModel['id']) {
    await $fetch(`/api/Expenses/${id}`, {
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
    getExpenses,
    postExpense,
    deleteExpense,
  };
}
