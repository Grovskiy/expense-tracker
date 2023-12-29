<script lang="ts" setup>
  import CurrenciesList from '~/components/CurrenciesList.vue';
  import CategoriesFamilyList from '~/components/CategoriesFamilyList.vue';
  import CategoriesCreate from '~/components/CategoriesCreate.vue';
  import { useCurrenciesStore } from '~/store/currencies';
  import { useCategoriesStore } from '~/store/categories';

  const currenciesStore = useCurrenciesStore();
  const { getCurrencies } = currenciesStore;

  const categoriesStore = useCategoriesStore();
  const { getFamilyCategories } = categoriesStore;

  onMounted(() => {
    getCurrencies();
    getFamilyCategories();
  })
</script>
<template>
  <div>
    <h1>Dashboard</h1>

    <h2 class="mt-3 mb-1">Вибір валюти</h2>
    <CurrenciesList />

    <h2 class="mt-3 mb-1">Вибір категорії, якщо нема категорій, є кнопка створення</h2>
    <CategoriesFamilyList />

    <h2 class="mt-3 mb-1">Створення категорії</h2>
    <CategoriesCreate />
  </div>
</template>
