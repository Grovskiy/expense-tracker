import { defineStore, storeToRefs } from 'pinia';
import { useCurrenciesStore } from '~/store/currencies';
import { useCategoriesStore } from '~/store/categories';
import { useAuthStore } from '~/store/auth';



export const useTriggerRequests = defineStore('trigger-requests', {
  actions: {
    triggerRequests() {
      const { authenticated } = storeToRefs(useAuthStore());
      if (!authenticated.value) return;

      useCategoriesStore().getFamilyCategories().then();
      useCurrenciesStore().getCurrencies().then();
    }
  }
})