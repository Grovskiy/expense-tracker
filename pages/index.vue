<script lang="ts" setup>
  import CurrenciesList from '~/components/CurrenciesList.vue';
  import CategoriesFamilyList from '~/components/CategoriesFamilyList.vue';
</script>
<template>
  <div>
    <h1 class="font-bold">Dashboard</h1>

    <h2 class="mt-3 mb-1">Вибір валюти</h2>
    <CurrenciesList />

    <h2 class="mt-3 mb-1">Вибір категорії, якщо нема категорій, є кнопка створення</h2>
    <CategoriesFamilyList />
  </div>
</template>
