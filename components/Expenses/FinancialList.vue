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
  import FinancialAdd from '~/components/Expenses/FinancialAdd.vue';

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
          categoryName: nameOfCategory(item),
          currencyName: codeOfCurrencies(item),
          categoryId: (item as IncomeModel).categoryId,
          currencyId: (item as IncomeModel).currencyId,
          date: dayjs(item.date).format('DD/MM/YYYY HH:mm'),
        }))
      : state.financial.map((item: FinancialModel) => ({
          id: item.id,
          notes: item.notes,
          value: (item as ExpenseModel).cost,
          categoryName: nameOfCategory(item),
          currencyName: codeOfCurrencies(item),
          categoryId: (item as IncomeModel).categoryId,
          currencyId: (item as IncomeModel).currencyId,
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
  async function changeFinancial(payload) {
    const payloadExpense: ExpenseModel = {
      id: payload.id,
      date: payload.date,
      cost: payload.value,
      notes: payload.notes,
      categoryId: payload.categoryId,
      currencyId: payload.currencyId,
    };
    const payloadIncome: IncomeModel = {
      id: payload.id,
      date: payload.date,
      amount: payload.value,
      taxAmount: payload.tax,
      notes: payload.notes,
      categoryId: payload.categoryId,
      currencyId: payload.currencyId,
    };
    const serviceChangeFinancial = isIncomeFinancialMode
      ? incomesService().changeIncome(payloadIncome)
      : expensesService().changeExpense(payloadExpense);

    await serviceChangeFinancial.then(() => {
      useToast().add({
        title: 'Оновлено',
        timeout: 3000,
      });
      updateDataTable();
    });
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
      updateDataTable();
      setIsOpenSideover(false, false);
    });
  }

  const stateSideOver = reactive({
    id: '',
    notes: '',
    value: undefined,
    tax: undefined,
    date: '',
    categoryId: '',
    currencyId: '',
  });
  const isOpenSideover = ref(false);
  const handleEditRow = (row: FinancialModel) => {
    stateSideOver.id = row.id;
    stateSideOver.notes = row.notes;
    stateSideOver.value = row.value;
    if (isIncomeFinancialMode) stateSideOver.tax = row.tax;
    stateSideOver.date = row.date;
    stateSideOver.categoryId = row.categoryId;
    stateSideOver.currencyId = row.currencyId;
    setIsOpenSideover(true, true);
  };
  const handlerEmitEdit = payload => {
    changeFinancial(payload);
    setIsOpenSideover(false, false);
  };
  const handlerAddEdit = () => {
    updateDataTable();
    setIsOpenSideover(false, false);
  };
  const updateDataTable = () => {
    chosenDate.value.end = dayjs(chosenDate.value.end)
      .add(1, 'hour')
      .utc()
      .format();
    fetchData();
  };

  const isEditFinancialAction = ref(false);

  const propsToPassFinancialaction = computed(() => {
    if (isEditFinancialAction.value) {
      return { ...stateSideOver, 'edit-mode': true };
    } else {
      return {}; // no props
    }
  });

  const setIsOpenSideover = (value: boolean, isEdit: boolean) => {
    isOpenSideover.value = value;
    isEditFinancialAction.value = isEdit;
  };
</script>

<template>
  <div class="flex mt-4 mb-2">
    <DatePickerRange v-model="chosenDate" />
    <UButton @click="fetchData" label="Ok" class="ml-2" />
    <UButton
      @click="setIsOpenSideover(true, false)"
      :label="`Додати ${isIncomeFinancialMode ? 'надходження' : 'витрати'}`"
      class="ml-2 mr-auto"
    />
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
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-pencil-square-20-solid"
        @click="handleEditRow(row)"
      />
    </template>
  </UTable>
  <USlideover v-model="isOpenSideover">
    <div class="flex items-center justify-end m-2">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        @click="setIsOpenSideover(false, false)"
      />
    </div>
    <div class="p-4 flex-1 flex flex-col justify-center">
      <FinancialAdd
        v-bind="propsToPassFinancialaction"
        @edit-done="handlerEmitEdit"
        @add-done="handlerAddEdit"
        @delete-done="removeFinancial(stateSideOver.id)"
      />
    </div>
  </USlideover>
</template>

<style scoped></style>
