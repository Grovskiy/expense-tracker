<script setup lang="ts">
  import type { FormError, FormSubmitEvent } from '#ui/types';
  import { CategoryTypeEnum } from '~/enums/CategoryTypeEnum';
  import type { CategoryPayloadInterface } from '~/interfaces/CategoryPayloadInterface';
  import { useCategoriesStore } from '~/store/categories';
  import { request } from '~/utils/request';
  import { categoriesService } from '~/services/categoriesService';

  const { handlerErr } = useCategoriesStore();

  const options = [
    { value: CategoryTypeEnum.Expense, label: 'Витрати' },
    { value: CategoryTypeEnum.Income, label: 'Дохід' },
  ];

  const state = reactive({
    name: '',
    type: CategoryTypeEnum.Expense,
  } as CategoryPayloadInterface);

  const validate = (state: CategoryPayloadInterface): FormError[] => {
    const errors = [];
    if (!state.name)
      errors.push({ path: 'nameCategories', message: 'Required' });
    return errors;
  };

  async function onSubmit(event: FormSubmitEvent<CategoryPayloadInterface>) {
    const payload = {
      name: event.data.name,
      type: event.data.type,
      parentCategoryId: null,
    };
    await request('/api/Categories', {
      method: 'post',
      body: payload,
    })
      .then(() => categoriesService().handlerThenCategory('Створено категорію'))
      .catch(err => handlerErr(err));

    state.name = '';
  }
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-x-2"
    @submit="onSubmit"
  >
    <UFormGroup name="nameCategories">
      <UInput v-model="state.name" placeholder="Назва категорїї" />
    </UFormGroup>

    <URadioGroup
      v-model="state.type"
      :options="options"
      :ui="{ inner: 'ms-1' }"
      :ui-radio="{ wrapper: 'mx-1', inner: 'ms-0', label: 'ps-2' }"
      class="[&>fieldset]:flex items-center h-8"
    >
      <template #label="{ option }">
        {{ option.label }}
      </template>
    </URadioGroup>

    <UFormGroup>
      <UButton
        type="submit"
        variant="solid"
        icon="i-heroicons-plus-circle"
        :ui="{ rounded: 'rounded-full' }"
      />
    </UFormGroup>
  </UForm>
</template>

<style scoped></style>
