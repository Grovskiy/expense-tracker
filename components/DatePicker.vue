<script setup lang="ts">
  import { DatePicker as VDatePicker } from 'v-calendar';
  import 'v-calendar/dist/style.css';
  const date = ref('');
</script>

<template>
  <VDatePicker
    v-model="date"
    color="gray"
    :is-dark="$colorMode.value === 'dark'"
  >
    <template #default="{ inputValue, inputEvents }">
      <div class="relative">
        <UBadge
          color="white"
          variant="solid"
          size="lg"
          v-on="inputEvents"
          class="cursor-default"
        >
          {{ inputValue }}
          <UIcon name="i-heroicons-calendar-days" class="ml-1" />
        </UBadge>
      </div>
    </template>
  </VDatePicker>
</template>

<style scoped></style>
