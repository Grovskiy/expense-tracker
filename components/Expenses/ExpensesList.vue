<script setup lang="ts">
  import DatePickerRange from '~/components/DatePickerRange.vue';
  import { expensesService } from '~/services/expensesService';
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import { useCurrenciesStore } from '~/store/currencies';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';
  import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
  import type { ExpenseModel } from '~/models/expense/ExpenseModel';
  import { columnsTable } from '~/components/Expenses/columnsTable';

  const { familyCategories, familyLoaded } = storeToRefs(useCategoriesStore());
  const { currencies, loaded } = storeToRefs(useCurrenciesStore());

  const dayjs = useDayjs();
  const chosenDate = ref({
    start: dayjs().add(-2, 'day').utc().format(),
    end: dayjs().utc().format(),
  });
  const expenses = ref([] as ExpenseModel[]);

  const numbersArray = (): string[] => {
    const start = 5;
    const end = 50;
    const step = 5;

    let numbersArray = [];
    for (let i = start; i <= end; i += step) {
      numbersArray.push(`${i}`);
    }
    return numbersArray;
  };

  const page = ref(1);
  const optionsLimitItems = numbersArray();
  const selectedLimitItems = ref<string>(optionsLimitItems[0]); // limit
  const totalItems = ref(10);

  const formattedExpenses = computed<ExpenseModel[]>(() => {
    return expenses.value.map(
      (item): ExpenseModel => ({
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

  const limitItems = computed<number>(() => {
    return parseInt(selectedLimitItems.value);
  });
  const offset = computed(() => {
    return (page.value - 1) * limitItems.value;
  });

  watch(page, () => {
    fetchData();
  });

  onMounted(() => {
    fetchData();
  });

  async function fetchData() {
    const response: PaginatedCollectionResponse<ExpenseModel> =
      await expensesService().getExpenses(
        limitItems.value,
        offset.value,
        chosenDate.value.start,
        chosenDate.value.end,
      );

    expenses.value = response.data;
    totalItems.value = response.total;
    if (offset.value > totalItems.value) page.value = 1;
  }
</script>

<template>
  <div class="flex mb-2">
    <DatePickerRange v-model="chosenDate" />
    <UButton @click="fetchData" label="Ok" class="ml-2 mr-auto" />
    <UPagination
      v-model="page"
      :page-count="limitItems"
      :total="totalItems"
      class="mr-2"
    />
    <USelect
      v-model="selectedLimitItems"
      :options="optionsLimitItems"
      @change="fetchData"
    />
  </div>
  <UTable :rows="formattedExpenses" :columns="columnsTable" />
</template>

<style scoped></style>
