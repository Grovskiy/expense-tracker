<script setup>
  import { setAuthFetchHeaders } from '~/utils/setAuthFetchHeaders';
  import { useAuthStore } from '~/store/auth';
  import { storeToRefs } from 'pinia';

  const store = useAuthStore();
  const { accessToken } = storeToRefs(store);

  onMounted(() => {
    setAuthFetchHeaders(accessToken.value);
  })
  useHead({
    title: 'Expense tracker',
  });
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
