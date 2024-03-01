<script lang="ts" setup></script>
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
