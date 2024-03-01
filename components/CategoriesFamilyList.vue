<script setup lang="ts">
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import { FinancialModeKey } from '~/injectionKeys/FinancialModeKey';
  import { FinancialModeEnum } from '~/enums/FinancialModeEnum';

  const injectedFinancialMode = inject(FinancialModeKey);

  const props = defineProps({
    categoryId: { default: '', type: String, required: false },
  });

  const categoriesStore = useCategoriesStore();
  const { familyCategoriesIncome, familyCategoriesExpense, familyLoaded } =
    storeToRefs(categoriesStore);

  const formattedCategories = computed(() => {
    return injectedFinancialMode === FinancialModeEnum.Incomes ||
      injectedFinancialMode === FinancialModeEnum.RepeatableIncomes
      ? familyCategoriesIncome.value
      : familyCategoriesExpense.value;
  });

  const emit = defineEmits<{
    update: [value: CategoryFamilyInterface];
  }>();
  const selected = ref(formattedCategories.value[0] as CategoryFamilyInterface);

  watch(familyLoaded, () => {
    selected.value = formattedCategories.value[0];
    handlerChangeSelect();
  });
  onMounted(() => {
    if (props.categoryId) {
      selected.value = formattedCategories.value.filter(
        (category: CategoryFamilyInterface) => category.id === props.categoryId,
      )[0];
    }
    handlerChangeSelect();
  });
  function handlerChangeSelect() {
    emit('update', selected.value);
  }
</script>

<template>
  <CategoriesCreate v-if="familyLoaded && !formattedCategories.length" />
  <USelectMenu
    v-else-if="familyLoaded"
    v-model="selected"
    :options="formattedCategories"
    class="h-8"
    option-attribute="name"
    @change="handlerChangeSelect"
  />
  <USkeleton v-else class="h-8" />
</template>
