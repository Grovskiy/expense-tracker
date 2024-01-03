<script setup lang="ts">
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import { useCategoriesStore } from '~/store/categories';
  const { putCategories, deleteCategories } = useCategoriesStore();

  const props = defineProps<{
    category: CategoryFamilyInterface;
  }>();
  const state = reactive({
    newName: '',
    shownInput: false,
  });

  function handlerButton() {
    if (state.newName.length) {
      putCategories(props.category.id, state.newName);
      state.shownInput = false;
    }
  }
  function handlerDelete() {
    deleteCategories(props.category.id);
  }
</script>

<template>
  <p class="mr-8">{{ category.name }}</p>
  <UPopover :open="state.shownInput" class="ml-auto flex items-center">
    <UToggle
      v-model="state.shownInput"
      size="lg"
      on-icon="i-heroicons-pencil-square"
      off-icon="i-heroicons-pencil-square"
    />
    <template #panel>
      <div class="flex items-center p-4">
        <UInput
          color="primary"
          variant="outline"
          placeholder="New name"
          v-model="state.newName"
        />
        <UButton
          @click="handlerButton"
          size="2xs"
          variant="solid"
          icon="i-heroicons-document-check"
          :ui="{ rounded: 'rounded-full' }"
          class="ml-4"
        />
      </div>
    </template>
  </UPopover>
  <UButton
    @click="handlerDelete"
    size="2xs"
    variant="solid"
    icon="i-heroicons-trash"
    :ui="{ rounded: 'rounded-full' }"
    color="rose"
    class="ml-1"
  />
</template>

<style scoped></style>
