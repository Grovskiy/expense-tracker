<script setup lang="ts">
  import { expensesService } from '~/services/expensesService';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';
  import type { CreateExpenseRequest } from '~/models/expense/CreateExpenseRequest';

  const state = reactive({
    cost: 0,
    notes: '',
    date: '',
    categoryId: '',
    currencyId: '',
  } as CreateExpenseRequest);

  const validate = (state: CreateExpenseRequest) => {
    const errors = [];
    if (state.cost === 0)
      errors.push({ path: 'cost', message: 'Значення має бути більше 0' });
    if (!state.notes)
      errors.push({ path: 'notes', message: 'Обовʼязково' });
    return errors;
  }
  async function onSubmit() {
    state.date = useDayjs().utc().format();
    await expensesService().postExpense(state);
  }
  function handlerCategories(value: CategoryFamilyInterface) {
    state.categoryId = value.id;
  }
  function handlerCurrencies(value: CurrenciesInterface) {
    state.currencyId = value.id;
  }
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="flex space-x-2"
    @submit="onSubmit"
  >
    <UFormGroup name="cost">
      <UInput
        placeholder="Сума"
        v-model="state.cost"
        type="number"
        class="w-24"
      />
    </UFormGroup>
    <UFormGroup name="notes">
      <UInput
        placeholder="Нотатка"
        v-model="state.notes"
        type="text"
        class="w-36"
      />
    </UFormGroup>
    <CategoriesFamilyList @update="handlerCategories" class="w-36" />
    <CurrenciesList @update="handlerCurrencies" class="w-36" />
    <UFormGroup>
      <UButton type="submit" label="Додати" />
    </UFormGroup>
  </UForm>
</template>

<style scoped></style>
