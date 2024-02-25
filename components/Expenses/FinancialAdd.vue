<script setup lang="ts">
  import { expensesService } from '~/services/expensesService';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';
  import type { CreateExpenseRequest } from '~/models/expense/CreateExpenseRequest';
  import type { CreateIncomeRequest } from '~/models/income/CreateIncomeRequest';
  import { incomesService } from '~/services/incomesService';

  const isIncomeFinancialMode = inject('isIncomeFinancialMode');

  const props = defineProps({
    editMode: {
      default: false,
      type: Boolean,
      required: false,
    },
    id: { default: '', type: String, required: false },
    notes: { default: '', type: String, required: false },
    value: { default: undefined, type: Number || undefined, required: false },
    tax: { default: undefined, type: Number || undefined, required: false },
    date: { default: '', type: String, required: false },
    categoryId: { default: '', type: String, required: false },
    currencyId: { default: '', type: String, required: false },
  });

  const state = reactive({
    value: undefined,
    tax: undefined,
    notes: '',
    categoryId: '',
    currencyId: '',
  });

  onMounted(() => {
    if (props.editMode) {
      state.value = props.value;
      state.tax = props.tax;
      state.notes = props.notes;
      state.date = useDayjs(props.date).utc().format();
      state.categoryId = props.categoryId;
      state.currencyId = props.currencyId;
    }
  });

  const emit = defineEmits<{
    editDone: [value: object];
    addDone: [];
    deleteDone: [];
  }>();
  // const emit = defineEmits(['editDone', 'addDone']);

  const validate = (state: { value: number }) => {
    const errors = [];
    if (state.value === 0)
      errors.push({ path: 'value', message: 'Значення має бути більше 0' });
    return errors;
  };
  async function onSubmit() {
    if (!props.editMode) return postFinancial();
    emit('editDone', { id: props.id, ...state });
  }
  async function postFinancial() {
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
      ? await incomesService()
          .postIncome(payloadIncome)
          .then(() => emit('addDone'))
      : await expensesService()
          .postExpense(payloadExpense)
          .then(() => emit('addDone'));
    state.value = undefined;
    state.tax = undefined;
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
  <h3 class="-mt-14 mb-4 text-center">
    {{ props.editMode ? 'Редагування' : 'Додавання' }}
  </h3>
  <UForm
    :validate="validate"
    :state="state"
    class="flex flex-col space-y-3"
    @submit="onSubmit"
  >
    <UFormGroup label="Сума" name="value">
      <UInput placeholder="1 200" v-model="state.value" type="number" />
    </UFormGroup>
    <UFormGroup label="Податок" v-if="isIncomeFinancialMode" name="tax">
      <UInput placeholder="Податок" v-model="state.tax" type="number" />
    </UFormGroup>
    <UFormGroup label="Нотатка" name="notes">
      <UInput
        placeholder="Продукти та кока кола..."
        v-model="state.notes"
        type="text"
      />
    </UFormGroup>
    <UFormGroup label="Категорія" name="categories">
      <CategoriesFamilyList
        :category-id="props.categoryId"
        @update="handlerCategories"
      />
    </UFormGroup>
    <UFormGroup label="Валюта" name="currencies">
      <CurrenciesList
        :currency-id="props.currencyId"
        @update="handlerCurrencies"
      />
    </UFormGroup>
    <div class="flex justify-between space-x-2">
      <UButton type="submit" label="Готово" />
      <UButton
        v-if="props.editMode"
        label="Видалити"
        color="rose"
        variant="ghost"
        @click="emit('deleteDone')"
      />
    </div>
  </UForm>
</template>

<style scoped></style>