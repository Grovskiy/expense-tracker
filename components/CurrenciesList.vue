<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCurrenciesStore } from '~/store/currencies';
  import type { CurrenciesInterface } from '~/interfaces/CurrenciesInterface';

  const store = useCurrenciesStore();
  const { currencies, loaded } = storeToRefs(store);

  const emit = defineEmits<{
    update: [value: CurrenciesInterface];
  }>();
  const selected = ref(currencies.value[0] as CurrenciesInterface);

  watch(loaded, () => {
    setDefaultCurrencies();
    handlerChangeSelect();
  });
  onMounted(() => {
    setDefaultCurrencies();
    handlerChangeSelect();
  });

  function setDefaultCurrencies() {
    const foundItem = currencies.value.find(item => item.code === 'UAH');
    selected.value = foundItem ? foundItem : currencies.value[0];
  }
  function handlerChangeSelect() {
    emit('update', selected.value);
  }
</script>

<template>
  <USelectMenu
    v-if="loaded"
    v-model="selected"
    :options="currencies"
    option-attribute="name"
    @change="handlerChangeSelect"
    class="h-8"
  >
    <template #label>
      <span aria-hidden="true">{{ selected.symbol }}</span>
      <span class="truncate">{{ selected.name }}</span>
    </template>

    <template #option="{ option: item }">
      <span aria-hidden="true">{{ item.symbol }}</span>
      <span class="truncate">{{ item.name }}</span>
    </template>
  </USelectMenu>
  <USkeleton v-else class="h-8" />
</template>

<style scoped></style>
