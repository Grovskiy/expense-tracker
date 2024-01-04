<script setup lang="ts">
  import { expensesService } from '~/services/expensesService';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';

  const state = reactive({
    cost: 0,
    notes: '',
    date: '',
    categoryId: '',
    currencyId: '',
  });
  async function handlerButton() {
    state.date = useDayjs().utc().format();
    await expensesService().postExpense(state)
  }
  function handlerCategories(value: CategoryFamilyInterface) {
    state.categoryId = value.id
  }
  function handlerCurrencies(value: CurrenciesInterface) {
    state.currencyId = value.id
  }
</script>

<template>
  <div class="flex space-x-2">
    <UInput placeholder="Сума"  v-model="state.cost" type="number" class="w-24" />
    <UInput placeholder="Нотатка"  v-model="state.notes" type="text" class="w-36" />
    <CategoriesFamilyList @update="handlerCategories" class="w-36" />
    <CurrenciesList @update="handlerCurrencies" class="w-36" />
    <UButton @click="handlerButton" label="Додати" />
  </div>
</template>

<style scoped></style>
