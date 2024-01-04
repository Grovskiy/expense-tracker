import type { ExpensePayloadInterface } from '~/interfaces/ExpensePayloadInterface';
import type { ExpenseInterface } from '~/interfaces/ExpenseInterface';

export function expensesService() {

  async function getExpenses(dateFrom: string, dateTo: string) {
    return await $fetch('/api/Expenses', {
      method: 'get',
      query: {
        limit: 10,
        offset: 0,
        dateFrom,
        dateTo,
      },
    })
  }
  async function postExpense(payload: ExpensePayloadInterface) {
    await $fetch('/api/Expenses', {
      method: 'post',
      body: payload,
    })
      .then(() => handlerThen('Додано'))
      .catch(err => {
        console.log(err);
      });
  }

  async function deleteExpense(id: ExpenseInterface['id']) {
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
