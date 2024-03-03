<script setup lang="ts">
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';
  import type { FinancialCommonModel } from '~/models/FinancialCommonModel';
  import { FinancialModeEnum } from '~/enums/FinancialModeEnum';
  import { StatusSubEnum } from '~/enums/StatusSubEnum';
  import { FrequencyEnum } from '~/enums/FrequencyEnum';
  import { FinancialModeKey } from '~/injectionKeys/FinancialModeKey';
  import { useCurrenciesStore } from '~/store/currencies';

  const { currencies } = storeToRefs(useCurrenciesStore());

  const injectedFinancialMode = inject(FinancialModeKey);

  const dayjs = useDayjs();

  const props = defineProps<{
    editMode: boolean;
    payload: FinancialCommonModel;
    isLoading: boolean;
  }>();

  const state: Ref<FinancialCommonModel> = ref({
    id: '',
    value: 0,
    tax: 0,
    text: '',
    date: dayjs().utc().format(),
    anotherDate: dayjs().add(30, 'day').utc().format(),
    frequency: FrequencyEnum.Weekly,
    status: StatusSubEnum.Active,
    categoryId: '',
    currencyId: '',
  });

  const frequencyOptions = Object.values(FrequencyEnum);
  const statusOptions = Object.values(StatusSubEnum);

  const currentCurrency = computed(() => {
    return currencies.value.filter(
      item => item.id === state.value.currencyId,
    )[0]?.code;
  });
  const isRepeatableExpenses = computed(() => {
    return injectedFinancialMode === FinancialModeEnum.RepeatableExpenses;
  });
  const isRepeatableIncomes = computed(() => {
    return injectedFinancialMode === FinancialModeEnum.RepeatableIncomes;
  });
  const isIncomes = computed(() => {
    return injectedFinancialMode === FinancialModeEnum.Incomes;
  });

  onMounted(() => {
    if (props.editMode) state.value = props.payload;
  });

  const emit = defineEmits<{
    editDone: [value: FinancialCommonModel];
    createDone: [value: FinancialCommonModel];
    deleteDone: [];
  }>();

  const validate = (state: { value: number }) => {
    const errors = [];
    if (state.value === 0)
      errors.push({ path: 'value', message: 'Значення має бути більше 0' });
    return errors;
  };
  async function onSubmit() {
    if (props.editMode) {
      emit('editDone', state.value);
    } else {
      emit('createDone', state.value);
    }
  }

  function handlerCategories(value: CategoryFamilyInterface) {
    state.value.categoryId = value?.id;
  }
  function handlerCurrencies(value: CurrenciesInterface) {
    state.value.currencyId = value.id;
  }
  const anotherDateLabel = () => {
    const mapDateLabel = {
      [FinancialModeEnum.Expenses]: '',
      [FinancialModeEnum.Incomes]: '',
      [FinancialModeEnum.RepeatableIncomes]: 'Наступна дата вкладу',
      [FinancialModeEnum.RepeatableExpenses]:
        'Наступна дата виставлення рахунку',
    };
    return injectedFinancialMode
      ? mapDateLabel[injectedFinancialMode]
      : 'Another date';
  };
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
    <div :class="{ 'flex space-x-4': isIncomes || isRepeatableIncomes }">
      <UFormGroup label="Сума" name="value">
        <UInput placeholder="1 200" v-model="state.value" type="number">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">{{
              currentCurrency
            }}</span>
          </template>
        </UInput>
      </UFormGroup>
      <UFormGroup
        v-if="isIncomes || isRepeatableIncomes"
        label="Податок"
        name="tax"
      >
        <UInput placeholder="Податок" v-model="state.tax" type="number">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
          </template>
        </UInput>
      </UFormGroup>
    </div>
    <UFormGroup label="Валюта" name="currencies">
      <CurrenciesList
        :currency-id="props.payload.currencyId"
        @update="handlerCurrencies"
      />
    </UFormGroup>
    <UFormGroup label="Нотатка" name="text">
      <UInput
        placeholder="Продукти та кока кола..."
        v-model="state.text"
        type="text"
      />
    </UFormGroup>
    <UFormGroup label="Категорія" name="categories">
      <CategoriesFamilyList
        :category-id="props.payload.categoryId"
        @update="handlerCategories"
      />
    </UFormGroup>
    <div class="flex space-x-4">
      <UFormGroup label="Дата">
        <DatePicker v-model="state.date" />
      </UFormGroup>
      <UFormGroup
        v-if="isRepeatableIncomes || isRepeatableExpenses"
        :label="anotherDateLabel()"
      >
        <DatePicker v-model="state.anotherDate" />
      </UFormGroup>
    </div>

    <div
      v-if="isRepeatableIncomes || isRepeatableExpenses"
      class="flex space-x-4"
    >
      <UFormGroup label="Frequency" name="frequency">
        <USelectMenu
          v-model="state.frequency"
          :options="frequencyOptions"
          class="h-8"
        >
        </USelectMenu>
      </UFormGroup>
      <UFormGroup label="Status" name="status">
        <USelectMenu
          v-model="state.status"
          :options="statusOptions"
          class="h-8"
        >
        </USelectMenu>
      </UFormGroup>
    </div>

    <div class="flex justify-between space-x-2">
      <UButton type="submit" label="Готово" :loading="props.isLoading" />
      <UButton
        v-if="props.editMode"
        label="Видалити"
        color="rose"
        variant="ghost"
        :loading="props.isLoading"
        @click="emit('deleteDone')"
      />
    </div>
  </UForm>
</template>

<style scoped></style>
