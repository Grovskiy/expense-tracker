import type { CreateExpenseRequest } from '~/models/expense/CreateExpenseRequest';
import type { ExpenseModel } from '~/models/expense/ExpenseModel';
import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';

export function expensesService() {
  function getExpenses(
    limit: number,
    offset: number,
    dateFrom: string,
    dateTo: string,
  ): Promise<PaginatedCollectionResponse<ExpenseModel>> {
    return $fetch('/api/Expenses', {
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

  function changeExpense(payload: ExpenseModel) {
    const { id, cost, notes, date, categoryId, currencyId } = payload;
    return $fetch(`/api/Expenses/${id}`, {
      method: 'put',
      body: {
        cost,
        notes,
        date,
        categoryId,
        currencyId,
      },
    });
  }

  function deleteExpense(id: ExpenseModel['id']) {
    return $fetch(`/api/Expenses/${id}`, {
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
    getExpenses,
    postExpense,
    changeExpense,
    deleteExpense,
  };
}
