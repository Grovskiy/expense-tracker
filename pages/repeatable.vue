<script setup lang="ts">
  import FinancialList from '~/components/Expenses/FinancialList.vue';
  import { FinancialModeEnum } from '~/enums/FinancialModeEnum';
  import { FinancialModeKey } from '~/injectionKeys/FinancialModeKey';

  provide(FinancialModeKey, FinancialModeEnum.RepeatableIncomes);
</script>

<template>
  <h1 class="font-bold text-center text-xl mb-5">Повторюваний надходження</h1>
  <FinancialList />
</template>

<style scoped></style>
