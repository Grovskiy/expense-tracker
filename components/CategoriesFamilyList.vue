<script setup lang="ts">
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';

  const categoriesStore = useCategoriesStore();
  const { familyCategories, familyLoaded } = storeToRefs(categoriesStore);

  const emit = defineEmits<{
    update: [value: CategoryFamilyInterface];
  }>();
  const selected = ref(familyCategories.value[0] as CategoryFamilyInterface);

  watch(familyLoaded, () => {
    selected.value = familyCategories.value[0];
    handlerChangeSelect();
  });
  function handlerChangeSelect() {
    emit('update', selected.value);
  }
</script>

<template>
  <CategoriesCreate v-if="familyLoaded && !familyCategories.length" />
  <USelectMenu
    v-else-if="familyLoaded"
    v-model="selected"
    :options="familyCategories"
    class="h-8"
    option-attribute="name"
    @change="handlerChangeSelect"
  />
  <USkeleton v-else class="h-8" />
</template>
