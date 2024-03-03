<script setup lang="ts">
  import DatePickerRange from '~/components/DatePickerRange.vue';
  import { numbersArray } from '~/components/Expenses/optionsLimitItems';
  import FinancialAdd from '~/components/Expenses/FinancialAdd.vue';
  import type { FinancialCommonModel } from '~/models/FinancialCommonModel';
  import { FinancialModeKey } from '~/injectionKeys/FinancialModeKey';
  import { FrequencyEnum } from '~/enums/FrequencyEnum';
  import { StatusSubEnum } from '~/enums/StatusSubEnum';
  import { FinancialModeEnum } from '~/enums/FinancialModeEnum';
  import { FinancialServiceContex } from '~/services/FinancialServiceContex';

  const injectedFinancialMode = inject(FinancialModeKey);

  const serviceFinancial = FinancialServiceContex(injectedFinancialMode);

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
    isLoading: boolean;
  }

  const state = reactive({
    financialArray: [],
    page: 1,
    totalItems: 5,
    selectedLimitItems: optionsLimitItems[2],
    isLoading: false,
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

  const isIncomesMode = computed(
    () => injectedFinancialMode === FinancialModeEnum.Incomes,
  );
  const isExpensesMode = computed(
    () => injectedFinancialMode === FinancialModeEnum.Expenses,
  );

  onMounted(() => {
    fetchData();
  });

  async function fetchData() {
    const payload: [number, number, string?, string?] =
      isIncomesMode || isExpensesMode
        ? [
            limitItems.value,
            offset.value,
            chosenDate.value.start,
            chosenDate.value.end,
          ]
        : [limitItems.value, offset.value];

    const response = await serviceFinancial.getFinancial(...payload);

    state.financialArray = response.data;
    state.totalItems = response.total;
    if (offset.value > state.totalItems) state.page = 1;
  }

  async function createFinancial(payload: FinancialCommonModel) {
    state.isLoading = true;
    await serviceFinancial
      .postFinancial(payload)
      .then(() => actionEnded('Створено'));
  }

  async function editFinancial(payload: FinancialCommonModel) {
    state.isLoading = true;
    await serviceFinancial
      .changeFinancial(payload)
      .then(() => actionEnded('Змінено'));
  }

  async function removeFinancial(id: FinancialCommonModel['id']) {
    state.isLoading = true;
    await serviceFinancial
      .deleteFinancial(id)
      .then(() => actionEnded('Видалено'));
  }

  const stateSideOver: Ref<FinancialCommonModel> = ref({
    id: '',
    value: 0,
    tax: 0,
    text: '',
    date: '',
    anotherDate: '',
    frequency: FrequencyEnum.Weekly,
    status: StatusSubEnum.Active,
    categoryId: '',
    currencyId: '',
  });
  const isOpenSideover = ref(false);
  const isEditFinancialAction = ref(false);

  const handleEditRow = (row: FinancialCommonModel) => {
    stateSideOver.value = row;
    setIsOpenSideover(true, true);
  };
  const actionEnded = (text: string) => {
    useToast().add({
      title: text,
      timeout: 3000,
    });
    updateDataTable();
    setIsOpenSideover(false, false);
    state.isLoading = false;
  };

  const setIsOpenSideover = (value: boolean, isEdit: boolean) => {
    isOpenSideover.value = value;
    isEditFinancialAction.value = isEdit;
  };

  const updateDataTable = () => {
    chosenDate.value.end = dayjs(chosenDate.value.end)
      .add(1, 'hour')
      .utc()
      .format();
    fetchData();
  };
</script>

<template>
  <div class="flex flex-col max-w-sm mx-auto">
    <div
      v-if="isIncomesMode || isExpensesMode"
      class="flex justify-between mt-4 mb-2"
    >
      <DatePickerRange v-model="chosenDate" @update:model-value="fetchData" />
      <UButton
        @click="setIsOpenSideover(true, false)"
        variant="outline"
        icon="i-heroicons-plus-circle"
        class="ml-auto"
        label="Додати"
      />
    </div>
    <UButton
      v-if="!(isIncomesMode || isExpensesMode)"
      @click="setIsOpenSideover(true, false)"
      :label="`Додати ${isIncomesMode ? 'надходження' : 'витрати'}`"
      variant="outline"
      icon="i-heroicons-plus-circle"
      class="mx-auto mb-2"
    />

    <SubsciptionItem
      v-for="item in state.financialArray"
      :key="item.id"
      :text="item.text"
      :value="item.value"
      :category-id="item.categoryId"
      :currency-id="item.currencyId"
      @click="handleEditRow(item)"
      class="even:bg-slate-50 dark:even:bg-slate-900"
    />

    <div class="flex mt-4">
      <UPagination
        v-model="state.page"
        :page-count="limitItems"
        :total="state.totalItems"
        class="mr-auto"
      />
      <USelect
        v-model="state.selectedLimitItems"
        :options="optionsLimitItems"
        @change="fetchData"
      />
    </div>
  </div>
  <USlideover v-model="isOpenSideover">
    <div class="overflow-auto h-full">
      <div class="flex items-center justify-end m-2">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="setIsOpenSideover(false, false)"
        />
      </div>
      <div class="px-4 py-5 flex-1">
        <FinancialAdd
          :edit-mode="isEditFinancialAction"
          :payload="stateSideOver"
          :is-loading="state.isLoading"
          @edit-done="editFinancial"
          @create-done="createFinancial"
          @delete-done="removeFinancial(stateSideOver.id)"
        />
      </div>
    </div>
  </USlideover>
</template>

<style scoped></style>
