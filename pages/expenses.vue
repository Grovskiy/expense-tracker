<script setup lang="ts">
  import FinancialList from '~/components/Expenses/FinancialList.vue';

  provide('isIncomeFinancialMode', false);
</script>

<template>
  <h1 class="font-bold text-center text-xl mb-5">Витрати</h1>
  <FinancialList />
</template>

<style scoped></style>
