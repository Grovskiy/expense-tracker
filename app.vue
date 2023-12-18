<script setup>
  import { ofetch } from 'ofetch';

  const userAuth = useCookie('token');
  const headers = { 'Content-Type': 'application/json' };

  globalThis.$fetch = ofetch.create({
    onRequest(context) {
      context.options.headers = userAuth.value
        ? { Authorization: `Bearer ${userAuth.value}`, ...headers }
        : { ...headers };
    },
  });

  useHead({
    title: 'Expense tracker',
  });
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>