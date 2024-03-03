<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { StatusSubEnum } from '~/enums/StatusSubEnum';
  import { useCategoriesStore } from '~/store/categories';
  import { useCurrenciesStore } from '~/store/currencies';
  import { numberFormat } from '~/utils/nubmerFormat';

  const { familyCategories } = storeToRefs(useCategoriesStore());
  const { currencies } = storeToRefs(useCurrenciesStore());

  const props = defineProps<{
    text: string; // name | notes

    value: number; // amount | cost
    status?: StatusSubEnum;

    categoryId: string;
    currencyId: string;
  }>();

  const nameOfCategory = (id: string | undefined): string =>
    familyCategories.value.filter(category => category.id === id)[0]?.name;
  const codeOfCurrencies = () =>
    currencies.value.filter(currency => currency.id === props.currencyId)[0]
      ?.code;

  const statusComputed = computed(() => {
    return props.status === StatusSubEnum.Active ? 'green' : 'red';
  });

  const computedValue = computed(() => {
    return codeOfCurrencies()
      ? numberFormat(codeOfCurrencies(), props.value)
      : props.value;
  });

  const emit = defineEmits<{
    click: [];
  }>();
</script>

<template>
  <div
    class="flex gap-2 items-center text-md text-current p-1 py-2 hover:bg-slate-200 cursor-pointer"
    @click="emit('click')"
  >
    <UBadge
      color="indigo"
      variant="outline"
      :label="nameOfCategory(props.categoryId)"
    />
    <div>{{ props.text }}</div>
    <div class="ml-auto">
      {{ computedValue }}
    </div>
    <UBadge
      v-if="props.status"
      :color="statusComputed"
      variant="outline"
      :label="props.status"
    />
  </div>
</template>
