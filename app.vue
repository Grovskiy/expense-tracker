<script setup>
  import { setAuthFetchHeaders } from '~/utils/setAuthFetchHeaders';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '~/store/auth';

  const authStore = useAuthStore();
  const { accessToken } = storeToRefs(authStore);

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
