<script setup lang="ts">
  import { useCategoriesStore } from '~/store/categories';
  import { storeToRefs } from 'pinia';
  import CategoriesEdit from '~/components/CategoriesEdit.vue';

  const categoriesStore = useCategoriesStore();
  const { familyCategoriesIncome, familyCategoriesExpense } =
    storeToRefs(categoriesStore);
</script>

<template>
  <UContainer>
    <UCard class="mb-4">
      <h2 class="mb-2 font-bold">Редагування категорій</h2>
      <div class="flex flex-wrap">
        <CategoriesEdit
          class="mr-4"
          title="Витрати"
          :categories="familyCategoriesExpense"
        />
        <CategoriesEdit title="Дохід" :categories="familyCategoriesIncome" />
      </div>
    </UCard>
    <UCard>
      <h2 class="mb-2 font-bold">Створення категорії</h2>
      <CategoriesCreate />
    </UCard>
  </UContainer>
</template>

<style scoped></style>
