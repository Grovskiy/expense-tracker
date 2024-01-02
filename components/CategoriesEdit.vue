<script setup lang="ts">
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import CategoriesEditName from '~/components/CategoriesEditName.vue';

  defineProps<{
    title: string;
    categories: CategoryFamilyInterface[];
  }>();
</script>

<template>
  <ul>
    <li class="mb-2 font-bold">{{ title }}:</li>
    <li
      v-for="item in categories"
      :key="item.id"
      class="flex mb-1 items-center border-b border-gray-300 pb-1"
    >
      <CategoriesEditName :category="item" />
    </li>
  </ul>
</template>

<style scoped></style>
