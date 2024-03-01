<script setup lang="ts">
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';
  import type { BudgetSummuryModel } from '~/models/BudgetSummuryModel';
  import { budgetService } from '~/services/budgetService';
  import { useCurrenciesStore } from '~/store/currencies';

  const dayjs = useDayjs();
  const { currencies } = storeToRefs(useCurrenciesStore());

  const chosenDate = ref({
    start: dayjs().add(-30, 'day').utc().format(),
    end: dayjs().utc().format(),
  });

  const state = reactive({
    totalIncomes: 0,
    totalExpenses: 0,
    netIncome: 0,
    expensesByCategory:
      [] as unknown as BudgetSummuryModel['expensesByCategory'],
    incomesByCategory: [] as unknown as BudgetSummuryModel['incomesByCategory'],
    currencyId: '',
    currentCurrency: '',
  });

  onMounted(() => {
    if (state.currencyId) fetchData();
  });

  watch(
    () => state.currencyId,
    (newValue, oldValue) => {
      if (oldValue === '') {
        fetchData();
      }
    },
  );

  const formattedTotalIncomes = computed(() =>
    state.currentCurrency
      ? numberFormat(state.currentCurrency, state.totalIncomes)
      : state.totalIncomes,
  );
  const formattedTotalExpenses = computed(() =>
    state.currentCurrency
      ? numberFormat(state.currentCurrency, state.totalExpenses)
      : state.totalExpenses,
  );
  const formattedNetIncome = computed(() =>
    state.currentCurrency
      ? numberFormat(state.currentCurrency, state.netIncome)
      : state.netIncome,
  );

  async function fetchData() {
    const response: BudgetSummuryModel = await budgetService().getBudget(
      chosenDate.value.start,
      chosenDate.value.end,
      state.currencyId,
    );

    state.totalIncomes = response.totalIncomes;
    state.totalExpenses = response.totalExpenses;
    state.netIncome = response.netIncome;
    state.expensesByCategory = response.expensesByCategory;
    state.incomesByCategory = response.incomesByCategory;

    state.currentCurrency = currencies.value.filter(
      item => item.id === state.currencyId,
    )[0].code;
  }
  const handlerCurrencies = (value: CurrenciesInterface) => {
    state.currencyId = value.id;
  };
  const numberFormat = (code: string, value: number) => {
    const codeMap = new Map([
      ['USD', 'en-IN'],
      ['EUR', 'es-ES'],
      ['UAH', 'uk-UK'],
    ]);
    return Intl.NumberFormat(codeMap.get(code), {
      style: 'currency',
      currency: code,
      maximumSignificantDigits: 3,
    }).format(value);
  };
</script>

<template>
  <div class="flex space-x-2 mt-4 mb-2">
    <DatePickerRange v-model="chosenDate" />
    <CurrenciesList @update="handlerCurrencies" />
    <UButton @click="fetchData" label="Ok" />
  </div>

  Надходження після оподаткування:
  {{ formattedNetIncome }}
  <br />
  Надходження до оподаткування: {{ formattedTotalIncomes }}
  <br />
  Витрати з урухуванням сплати податку: {{ formattedTotalExpenses }}
  <br />
  <h2 class="mt-4">Витрати</h2>
  <div v-for="expense in state.expensesByCategory" :key="expense.id">
    <div>
      {{ expense.name }}:
      {{ numberFormat(state.currentCurrency, expense.totalAmount) }}
    </div>
  </div>

  <h2 class="mt-4">Надходження</h2>
  <div v-for="income in state.incomesByCategory" :key="income.id">
    <div>
      {{ income.name }}:
      {{ numberFormat(state.currentCurrency, income.totalAmount) }}
    </div>
  </div>
</template>
