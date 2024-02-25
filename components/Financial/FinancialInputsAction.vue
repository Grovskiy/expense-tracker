<!-- TODO: draft idea for general comoponents in side panel, which allow edit and add fincancial items -->

<script setup lang="ts">
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';

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
  }>();

  const validate = (state: { value: number }) => {
    const errors = [];
    if (state.value === 0)
      errors.push({ path: 'value', message: 'Значення має бути більше 0' });
    return errors;
  };
  async function onSubmit() {
    emit('editDone', { id: props.id, ...state });
  }
  function handlerCategories(value: CategoryFamilyInterface) {
    state.categoryId = value?.id;
  }
  function handlerCurrencies(value: CurrenciesInterface) {
    state.currencyId = value.id;
  }
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
      Slideover
    </h3>
    <UButton
      color="gray"
      variant="ghost"
      icon="i-heroicons-x-mark-20-solid"
      class="-my-1"
    />
  </div>
  <UForm
    :validate="validate"
    :state="state"
    class="flex flex-col space-y-3"
    @submit="onSubmit"
  >
    <UFormGroup name="value">
      <UInput placeholder="Сума" v-model="state.value" type="number" />
    </UFormGroup>
    <UFormGroup v-if="state.tax" name="tax">
      <UInput placeholder="Податок" v-model="state.tax" type="number" />
    </UFormGroup>
    <UFormGroup name="notes">
      <UInput placeholder="Нотатка" v-model="state.notes" type="text" />
    </UFormGroup>
    <UFormGroup name="categories">
      <CategoriesFamilyList
        :category-id="categoryId"
        @update="handlerCategories"
      />
    </UFormGroup>
    <UFormGroup name="currencies">
      <CurrenciesList
        :currency-id="props.currencyId"
        @update="handlerCurrencies"
      />
    </UFormGroup>
    <UFormGroup>
      <UButton type="submit" label="Готово" />
    </UFormGroup>
  </UForm>
</template>

<style scoped></style>
