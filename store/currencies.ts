import { defineStore } from 'pinia';
import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';

export const useCurrenciesStore = defineStore('currencies', {
  state: () => ({
    currencies: [
      {
        id: '',
        name: 'string',
        symbol: 'string',
        code: 'string',
      },
    ] as CurrenciesInterface[],
    loaded: false as boolean,
  }),
  actions: {
    // async getCurrencies() {
    //   if (this.loaded) return;
    //   await $fetch('/api/Currencies', {
    //     method: 'get',
    //   }).then(res => {
    //     this.currencies = res as CurrenciesInterface[];
    //     this.loaded = true;
    //   });
    // },
    setCurrencies(array: CurrenciesInterface[]) {
      this.currencies = array;
      this.loaded = true;
    },
  },
});
