<script setup lang="ts">
  import ExpensesList from '~/components/Expenses/ExpensesList.vue';
</script>

<template>
  <h1 class="font-bold text-center text-xl">Витрати</h1>
  <h2 class="mt-4 mb-3">Додати витрати</h2>
  <ExpensesAdd />

  <h2 class="mt-4 mb-3">Показати витрати</h2>
  <ExpensesList />
</template>

<style scoped></style>
