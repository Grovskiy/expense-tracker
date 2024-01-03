<script setup>
  import { setAuthFetchHeaders } from '~/utils/setAuthFetchHeaders';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '~/store/auth';
  import { useTriggerRequests } from '~/store/triggerRequests';

  const authStore = useAuthStore();
  const { accessToken } = storeToRefs(authStore);

  onMounted(() => {
    setAuthFetchHeaders(accessToken.value);
    useTriggerRequests().triggerRequests()
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
  <UNotifications />
</template>
