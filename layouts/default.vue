<script lang="ts" setup>
  import { firstLogin } from '~/utils/firstLogin';

  onMounted(() => {
    firstLogin();
  });
</script>
<template>
  <div>
    <VHeader />
    <UDivider :ui="{ wrapper: { base: 'py-3' } }" />
    <div class="mainContent">
      <UContainer>
        <slot />
      </UContainer>
    </div>
  </div>
</template>
