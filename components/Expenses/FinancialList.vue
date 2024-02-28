<script setup lang="ts">
  import DatePickerRange from '~/components/DatePickerRange.vue';
  import { expensesService } from '~/services/expensesService';
  import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
  import type { ExpenseModel } from '~/models/expense/ExpenseModel';
  import { numbersArray } from '~/components/Expenses/optionsLimitItems';
  import { incomesService } from '~/services/incomesService';
  import type { IncomeModel } from '~/models/income/IncomeModel';
  import FinancialAdd from '~/components/Expenses/FinancialAdd.vue';
  import { FinancialModeEnum } from '~/enums/FinancialModeEnum';
  import type { FinancialCommonModel } from '~/models/FinancialCommonModel';

  const props = defineProps<{
    financialMode: FinancialModeEnum;
  }>();

  const dayjs = useDayjs();
  const chosenDate = ref({
    start: dayjs().add(-30, 'day').utc().format(),
    end: dayjs().utc().format(),
  });

  const optionsLimitItems = numbersArray();

  interface StateInterface {
    financialArray: FinancialCommonModel[];
    page: number;
    totalItems: number;
    selectedLimitItems: string;
  }

  const state = reactive({
    financialArray: [],
    page: 1,
    totalItems: 10,
    selectedLimitItems: optionsLimitItems[0],
  } as unknown as StateInterface);

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

  // get financial
  async function fetchData() {
    const payload: [number, number, string, string] = [
      limitItems.value,
      offset.value,
      chosenDate.value.start,
      chosenDate.value.end,
    ];

    if (props.financialMode === FinancialModeEnum.Expenses) {
      const res: PaginatedCollectionResponse<ExpenseModel> =
        await expensesService().getExpenses(...payload);
      state.financialArray = res.data.map(
        (item: ExpenseModel): FinancialCommonModel => ({
          ...item,
          id: item.id,
          text: item.notes,
          value: item.cost,
        }),
      );
      state.totalItems = res.total;
    }
    if (props.financialMode === FinancialModeEnum.Incomes) {
      const res: PaginatedCollectionResponse<IncomeModel> =
        await incomesService().getIncomes(...payload);
      state.financialArray = res.data.map(
        (item: IncomeModel): FinancialCommonModel => ({
          ...item,
          id: item.id,
          text: item.notes,
          value: item.amount,
          tax: item.taxAmount,
        }),
      );
      state.totalItems = res.total;
    }
    if (offset.value > state.totalItems) state.page = 1;
  }
  // get financial end

  // change financial
  async function changeFinancial(payload: FinancialCommonModel) {
    console.log(payload);

    const payloadExpense: ExpenseModel = {
      id: payload.id,
      date: payload.date,
      cost: payload.value,
      notes: payload.text,
      categoryId: payload.categoryId,
      currencyId: payload.currencyId,
    };
    const payloadIncome: IncomeModel = {
      id: payload.id,
      date: payload.date,
      amount: payload.value,
      taxAmount: payload.tax ? payload.tax : 0,
      notes: payload.text,
      categoryId: payload.categoryId,
      currencyId: payload.currencyId,
    };
    const serviceChangeFinancial =
      props.financialMode === FinancialModeEnum.Incomes
        ? incomesService().changeIncome(payloadIncome)
        : expensesService().changeExpense(payloadExpense);
    console.log(payloadExpense);
    await serviceChangeFinancial.then(() => {
      useToast().add({
        title: 'Оновлено',
        timeout: 3000,
      });
      updateDataTable();
    });
  }
  // change financial end

  // remove financial
  async function removeFinancial(id: FinancialCommonModel['id']) {
    const serviceDeleteFinancial =
      props.financialMode === FinancialModeEnum.Incomes
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
  // remove financial end

  const stateSideOver = reactive({
    id: '',
    notes: '',
    value: 0,
    tax: 0,
    date: '',
    categoryId: '',
    currencyId: '',
  } as unknown as FinancialCommonModel);
  const isOpenSideover = ref(false);
  const handleEditRow = (row: FinancialCommonModel) => {
    console.log(row);

    stateSideOver.id = row.id;
    stateSideOver.text = row.text;
    stateSideOver.value = row.value;
    if (row.tax) stateSideOver.tax = row.tax;
    stateSideOver.date = row.date;
    stateSideOver.categoryId = row.categoryId;
    stateSideOver.currencyId = row.currencyId;
    setIsOpenSideover(true, true);
  };
  const handlerEmitEdit = (payload: FinancialCommonModel) => {
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
      :label="`Додати ${
        props.financialMode === FinancialModeEnum.Incomes
          ? 'надходження'
          : 'витрати'
      }`"
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
  <div class="max-w-sm">
    <SubsciptionItem
      v-for="item in state.financialArray"
      :key="item.id"
      :text="item.text"
      :value="item.value"
      :category-id="item.categoryId"
      :currency-id="item.currencyId"
      @click="handleEditRow(item)"
    />
  </div>
</template>

<style scoped></style>
