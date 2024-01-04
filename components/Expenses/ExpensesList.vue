<script setup lang="ts">
  import DatePickerRange from '~/components/DatePickerRange.vue';
  import { expensesService } from '~/services/expensesService';
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import { useCurrenciesStore } from '~/store/currencies';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';
  import type { ExpensesInterface } from '~/interfaces/ExpensesInterface';
  import type { ExpenseInterface } from '~/interfaces/ExpenseInterface';
  import { columnsTable } from '~/components/Expenses/columnsTable';

  const { familyCategories, familyLoaded } = storeToRefs(useCategoriesStore());
  const { currencies, loaded } = storeToRefs(useCurrenciesStore());

  const dayjs = useDayjs();
  const chosenDate = ref({
    start: dayjs().add(-2, 'day').utc().format(),
    end: dayjs().utc().format(),
  });
  const expenses = ref([] as ExpenseInterface[]);
  const loadingData = ref(false);

  const formattedExpenses = computed<ExpenseInterface[]>(() => {
    return expenses.value.map(
      (item): ExpenseInterface => ({
        ...item,
        categoryId: familyLoaded
          ? familyCategories.value.filter(
              (category: CategoryFamilyInterface) =>
                category.id === item.categoryId,
            )[0].name
          : 'Loading...',
        currencyId: loaded
          ? currencies.value.filter(
              (currency: CurrenciesInterface) =>
                currency.id === item.currencyId,
            )[0].code
          : 'Loading...',
        date: dayjs(item.date).format('DD/MM/YYYY HH:mm'),
      }),
    );
  });

  onMounted(() => {
    fetchData();
  });

  async function fetchData() {
    loadingData.value = true;
    await expensesService()
      .getExpenses(chosenDate.value.start, chosenDate.value.end)
      .then(res => {
        const response = res as ExpensesInterface;
        expenses.value = response.data;
        loadingData.value = false;
      });
  }
</script>

<template>
  <div class="flex space-x-2 mb-2">
    <DatePickerRange v-model="chosenDate" />
    <UButton @click="fetchData" label="Ok" />
  </div>
  <UTable
    :rows="formattedExpenses"
    :columns="columnsTable"
    :loading="loadingData"
  />
</template>

<style scoped></style>
