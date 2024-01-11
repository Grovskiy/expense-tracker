<script setup lang="ts">
  import { expensesService } from '~/services/expensesService';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';
  import type { CreateExpenseRequest } from '~/models/expense/CreateExpenseRequest';
  import type { CreateIncomeRequest } from '~/models/income/CreateIncomeRequest';
  import { incomesService } from '~/services/incomesService';

  const isIncomeFinancialMode = inject('isIncomeFinancialMode');

  const state = reactive({
    value: 0,
    tax: 0,
    notes: '',
    categoryId: '',
    currencyId: '',
  });

  const validate = (state: { value: number }) => {
    const errors = [];
    if (state.value === 0)
      errors.push({ path: 'value', message: 'Значення має бути більше 0' });
    return errors;
  };
  async function onSubmit() {
    const date = useDayjs().utc().format();
    const payloadExpense: CreateExpenseRequest = {
      date,
      cost: state.value,
      notes: state.notes,
      categoryId: state.categoryId,
      currencyId: state.currencyId,
    };
    const payloadIncome: CreateIncomeRequest = {
      date,
      amount: state.value,
      taxAmount: state.tax,
      notes: state.notes,
      categoryId: state.categoryId,
      currencyId: state.currencyId,
    };
    isIncomeFinancialMode
      ? await incomesService().postIncome(payloadIncome)
      : await expensesService().postExpense(payloadExpense);
    state.value = 0;
    state.tax = 0;
    state.notes = '';
  }
  function handlerCategories(value: CategoryFamilyInterface) {
    state.categoryId = value?.id;
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
    <UFormGroup name="value">
      <UInput
        placeholder="Сума"
        v-model="state.value"
        type="number"
        class="w-24"
      />
    </UFormGroup>
    <UFormGroup v-if="isIncomeFinancialMode" name="tax">
      <UInput
        placeholder="Податок"
        v-model="state.tax"
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
    <UFormGroup name="categories">
      <CategoriesFamilyList @update="handlerCategories" class="w-36" />
    </UFormGroup>
    <UFormGroup name="currencies">
      <CurrenciesList @update="handlerCurrencies" class="w-36" />
    </UFormGroup>
    <UFormGroup>
      <UButton type="submit" label="Додати" />
    </UFormGroup>
  </UForm>
</template>

<style scoped></style>
