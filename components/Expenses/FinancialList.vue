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
  import { numbersArray } from '~/components/Expenses/optionsLimitItems';
  import { incomesService } from '~/services/incomesService';
  import type { IncomeModel } from '~/models/income/IncomeModel';

  const { familyCategories } = storeToRefs(useCategoriesStore());
  const { currencies } = storeToRefs(useCurrenciesStore());

  const isIncomeFinancialMode: boolean | undefined = inject(
    'isIncomeFinancialMode',
  );

  const dayjs = useDayjs();
  const chosenDate = ref({
    start: dayjs().add(-2, 'day').utc().format(),
    end: dayjs().utc().format(),
  });

  const optionsLimitItems = numbersArray();

  type FinancialModel = IncomeModel | ExpenseModel;

  interface StateInterface {
    financial: FinancialModel[];
    page: number;
    totalItems: number;
    selectedLimitItems: string;
  }

  const state = reactive({
    financial: [],
    page: 1,
    totalItems: 10,
    selectedLimitItems: optionsLimitItems[0],
  } as unknown as StateInterface);

  const itemActions = (row: FinancialModel) => [
    [
      // {
      //   label: 'Edit',
      //   icon: 'i-heroicons-pencil-square-20-solid',
      //   click: () => console.log('Edit', row.id),
      // },
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => removeFinancial(row.id),
      },
    ],
  ];

  const nameOfCategory = (item: ExpenseModel | IncomeModel): string =>
    familyCategories.value.filter(
      (category: CategoryFamilyInterface) => category.id === item.categoryId,
    )[0]?.name;
  const codeOfCurrencies = (item: ExpenseModel | IncomeModel): string =>
    currencies.value.filter(
      (currency: CurrenciesInterface) => currency.id === item.currencyId,
    )[0]?.code;

  const formattedFinancial = computed(() => {
    return isIncomeFinancialMode
      ? state.financial.map((item: FinancialModel) => ({
          id: item.id,
          notes: item.notes,
          value: (item as IncomeModel).amount,
          tax: (item as IncomeModel).taxAmount,
          categoryId: nameOfCategory(item),
          currencyId: codeOfCurrencies(item),
          date: dayjs(item.date).format('DD/MM/YYYY HH:mm'),
        }))
      : state.financial.map((item: FinancialModel) => ({
          id: item.id,
          notes: item.notes,
          value: (item as ExpenseModel).cost,
          categoryId: nameOfCategory(item),
          currencyId: codeOfCurrencies(item),
          date: dayjs(item.date).format('DD/MM/YYYY HH:mm'),
        }));
  });

  const limitItems = computed<number>(() => {
    return parseInt(state.selectedLimitItems);
  });
  const offset = computed(() => {
    return (state.page - 1) * limitItems.value;
  });

  watch(
    () => state.page,
    () => {
      fetchData();
    },
  );

  onMounted(() => {
    fetchData();
  });

  async function fetchData() {
    const serviceGetFinancial = isIncomeFinancialMode
      ? incomesService().getIncomes
      : expensesService().getExpenses;

    const response: PaginatedCollectionResponse<FinancialModel> =
      await serviceGetFinancial(
        limitItems.value,
        offset.value,
        chosenDate.value.start,
        chosenDate.value.end,
      );

    state.financial = response.data;
    state.totalItems = response.total;
    if (offset.value > state.totalItems) state.page = 1;
  }
  async function removeFinancial(id: FinancialModel['id']) {
    const serviceDeleteFinancial = isIncomeFinancialMode
      ? incomesService().deleteIncome
      : expensesService().deleteExpense;

    await serviceDeleteFinancial(id).then(() => {
      useToast().add({
        title: 'Видалено',
        timeout: 3000,
      });
      fetchData();
    });
  }
</script>

<template>
  <div class="flex mb-2">
    <DatePickerRange v-model="chosenDate" />
    <UButton @click="fetchData" label="Ok" class="ml-2 mr-auto" />
    <UPagination
      v-model="state.page"
      :page-count="limitItems"
      :total="state.totalItems"
      class="mr-2"
    />
    <USelect
      v-model="state.selectedLimitItems"
      :options="optionsLimitItems"
      @change="fetchData"
    />
  </div>
  <UTable
    :rows="formattedFinancial"
    :columns="columnsTable(isIncomeFinancialMode)"
  >
    <template #actions-data="{ row }">
      <UDropdown :items="itemActions(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
</template>

<style scoped></style>
