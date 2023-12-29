<script lang="ts" setup>
  import CurrenciesList from '~/components/CurrenciesList.vue';
  import { useCurrenciesStore } from '~/store/currencies';

  const currenciesStore = useCurrenciesStore();
  const { getCurrencies } = currenciesStore;

  onMounted(() => {
    getCurrencies();
  })
</script>
<template>
  <div>
    <h1>Dashboard</h1>
    <CurrenciesList />
  </div>
</template>
