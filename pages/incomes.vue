<script setup lang="ts">
  import FinancialList from '~/components/Expenses/FinancialList.vue';
  import { FinancialModeEnum } from '~/enums/FinancialModeEnum';

  const financialModeIncomes = FinancialModeEnum.Incomes;
  provide('isIncomeFinancialMode', true);
</script>

<template>
  <h1 class="font-bold text-center text-xl mb-5">Надходження</h1>
  <FinancialList :financial-mode="financialModeIncomes" />
</template>

<style scoped></style>
