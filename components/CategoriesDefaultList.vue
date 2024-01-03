<script setup>
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';

  const categoriesStore = useCategoriesStore();
  const { defaultCategories, defaultLoaded } = storeToRefs(categoriesStore);

  const selected = ref([]);
</script>

<template>
  <USelectMenu
    v-if="defaultLoaded"
    v-model="selected"
    :options="defaultCategories"
    option-attribute="name"
    value-attribute="id"
    multiple
    placeholder="Choose categories"
    class="h-8"
  />
  <USkeleton v-else class="h-8" />
</template>
