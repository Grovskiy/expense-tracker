import { useCurrenciesStore } from '~/store/currencies';
import { storeToRefs } from 'pinia';
import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';

export function currenciesService() {
  const { setCurrencies } = useCurrenciesStore();
  const { loaded } = storeToRefs(useCurrenciesStore());

  async function getCurrencies() {
    if (loaded.value) return;

    await request('/api/Currencies', {
      method: 'get',
    }).then(res => {
      const response = res as CurrenciesInterface[];
      setCurrencies(response);
    });
  }

  return {
    getCurrencies,
  };
}
