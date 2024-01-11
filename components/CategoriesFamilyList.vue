<script setup lang="ts">
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';

  const props = defineProps<{
    isIncome: boolean;
  }>();

  const categoriesStore = useCategoriesStore();
  const { familyCategoriesIncome, familyCategoriesExpense, familyLoaded } =
    storeToRefs(categoriesStore);

  const formattedCategories = computed(() => {
    return props.isIncome
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
