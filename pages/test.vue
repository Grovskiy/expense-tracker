<script setup lang="ts">
  const testingVar = ref('empty');

  async function test() {
    const body = await $fetch('/api/expense/test', {
      method: 'post',
    });

    testingVar.value = body as string;
  }
</script>

<template>
  <div>
    <h1 class="text-xl">Test '/api/expense/test' request: {{ testingVar }}</h1>
    <button @click="test">Test</button>
  </div>
</template>
