<script setup lang="ts">
  import FinancialList from '~/components/Expenses/FinancialList.vue';
  import FinancialAdd from '~/components/Expenses/FinancialAdd.vue';

  provide('isIncomeFinancialMode', true);
</script>

<template>
  <h1 class="font-bold text-center text-xl">Надходження</h1>
  <h2 class="mt-4 mb-3">Додати надходження</h2>
  <FinancialAdd />

  <h2 class="mt-4 mb-3">Показати надходження</h2>
  <FinancialList />
</template>

<style scoped></style>
