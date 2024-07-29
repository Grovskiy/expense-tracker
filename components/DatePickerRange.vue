<script setup lang="ts">
  import { DatePicker as VDatePicker } from 'v-calendar';
  import 'v-calendar/dist/style.css';
  const range = ref({
    start: new Date(2020, 9, 12),
    end: new Date(2020, 9, 16),
  });
  const masks = ref({
    input: 'MM.DD.YYYY',
  });
  const isShow = ref(false);
</script>

<template>
  <VDatePicker
    v-model.range.string="range"
    color="gray"
    :is-dark="$colorMode.value === 'dark'"
    show-weeknumbers="left-outside"
    :masks="masks"
    @popover-will-show="isShow = true"
    @popover-will-hide="isShow = false"
  >
    <template #default="{ inputValue, togglePopover }">
      <div class="relative">
        <UButton
          color="primary"
          :variant="isShow ? 'solid' : 'outline'"
          @click="togglePopover"
        >
          {{ inputValue.start }}
          -
          {{ inputValue.end }}
          <UIcon name="i-heroicons-calendar-days" class="ml-1" />
        </UButton>
      </div>
    </template>
  </VDatePicker>
</template>

<style scoped></style>
