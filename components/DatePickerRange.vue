<script setup lang="ts">
  import { DatePicker as VDatePicker } from 'v-calendar';
  import 'v-calendar/dist/style.css';
  const range = ref({
    start: new Date(2020, 9, 12),
    end: new Date(2020, 9, 16),
  });
</script>

<template>
  <VDatePicker
    v-model.range.string="range"
    color="gray"
    :is-dark="$colorMode.value === 'dark'"
    show-weeknumbers="left-outside"
  >
    <template #default="{ inputValue, inputEvents }">
      <div class="relative">
        <UBadge
          color="emerald"
          variant="subtle"
          size="lg"
          v-on="inputEvents.start"
        >
          {{ inputValue.start }}
          -
          {{ inputValue.end }}
          <UIcon name="i-heroicons-calendar-days" class="ml-1" />
        </UBadge>
      </div>
    </template>
  </VDatePicker>
</template>

<style scoped></style>
