<script setup lang="ts">
  const exampleRes = {
    // RepeatableModel
    id: 'string',
    name: 'Netflix',
    amount: 2323,
    taxAmount: 5,
    startDate: '2024-02-25T13:54:12+00:00',
    nextDepositDate: '2024-02-25T13:54:12+00:00',
    frequency: 'Monthly',
    status: 'Cancelled',
    categoryId: '83baadde-0381-4bf8-5198-08dc35d3c00b',
    currencyId: 'df291312-42ed-4f73-bbb4-65158a14cbb6',
  };
  const exampleProps = {
    id: exampleRes.id,
    text: exampleRes.name,
    value: exampleRes.amount,
    status: exampleRes.status,
    categoryId: exampleRes.categoryId,
    currencyId: exampleRes.currencyId,
  };
</script>

<template>
  <h1 class="font-bold text-center text-xl mb-5">Підписки</h1>
  <div class="max-w-sm">
    <SubsciptionItem v-bind="exampleProps" />
  </div>
</template>

<style scoped></style>
