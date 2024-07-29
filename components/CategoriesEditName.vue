<script setup lang="ts">
  import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
  import { useCategoriesStore } from '~/store/categories';
  import { request } from '~/utils/request';
  import { categoriesService } from '~/services/categoriesService';
  const { handlerErr } = useCategoriesStore();

  const props = defineProps<{
    category: CategoryFamilyInterface;
  }>();
  const state = reactive({
    newName: '',
    shownInput: false,
  });

  async function handlerButton() {
    if (state.newName.length) {
      await request(`/api/Categories/${props.category.id}`, {
        method: 'put',
        body: {
          name: state.newName,
        },
      })
        .then(() => categoriesService().handlerThenCategory('Назву змінено'))
        .catch(err => handlerErr(err));

      state.shownInput = false;
    }
  }
  async function handlerDelete() {
    await request(`/api/Categories/${props.category.id}`, {
      method: 'delete',
      body: {},
    })
      .then(() => categoriesService().handlerThenCategory('Категорію видалено'))
      .catch(err => handlerErr(err));
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
