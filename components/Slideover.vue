<!-- TODO: draft idea for general comoponents in side panel, which allow edit and add fincancial items -->
<script setup lang="ts">
  const isOpen = ref(true);
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <FinancialInputsAction />
      </div>
    </USlideover>
  </div>
</template>
