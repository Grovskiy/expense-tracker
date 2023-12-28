import { defineStore } from 'pinia';

export const useIncomesStore = defineStore('incomes', {
  state: () => ({
    amount: 0,
    taxAmount: 0,
    notes: 'string',
    categoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    currencyId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  }),
  actions: {},
});
