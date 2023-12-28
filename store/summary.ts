import { defineStore } from 'pinia';

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    totalIncomes: 0,
    totalExpenses: 0,
    netIncome: 0,
    expensesByCategory: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '',
        totalAmount: 0,
      },
    ],
    incomesByCategory: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '',
        totalAmount: 0,
      },
    ],
  }),
  actions: {
    async getSummary() {
      await $fetch('/api/Budget/summary', {
        method: 'get',
        query: { DateFrom: '', DateTo: '', CurrencyId: '' },
      });
    },
  },
});
