<script setup lang="ts">
  import FinancialList from '~/components/Expenses/FinancialList.vue';
  import { FinancialModeEnum } from '~/enums/FinancialModeEnum';

  const financialModeExpenses = FinancialModeEnum.Expenses;
  provide('isIncomeFinancialMode', false);
</script>

<template>
  <h1 class="font-bold text-center text-xl mb-5">Витрати</h1>
  <FinancialList :financial-mode="financialModeExpenses" />
</template>

<style scoped></style>
