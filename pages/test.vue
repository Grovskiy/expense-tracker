<script setup lang="ts">
  const testingVar = ref('empty');

  async function test() {
    await $fetch(`/api/Currencies/update`, {
      method: 'post',
    });
  }
</script>

<template>
  <div>
    <h1 class="text-xl">Test '/api/expense/test' request: {{ testingVar }}</h1>
    <button @click="test">Test</button>
  </div>
</template>
