<script setup>
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';

  const categoriesStore = useCategoriesStore();
  const { familyCategories, familyLoaded } = storeToRefs(categoriesStore);

  const selected = ref(familyCategories.value[0]);

  watch(familyLoaded, () => {
    selected.value = familyCategories.value[0];
  });
</script>

<template>
  <CategoriesCreate v-if="familyLoaded && !familyCategories.length" />
  <USelectMenu
    v-else-if="familyLoaded"
    v-model="selected"
    :options="familyCategories"
    class="h-8"
    option-attribute="name"
  />
  <USkeleton v-else class="h-8" />
</template>
