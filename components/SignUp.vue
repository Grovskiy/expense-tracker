<script setup lang="ts">
  import type { FormError, FormSubmitEvent } from '#ui/types';
  import { useAuthStore } from '~/store/auth';
  import { storeToRefs } from 'pinia';
  import type { ErrorsValidationInterface } from '~/interfaces/ErrorsValidationInterface';
  import { FetchError } from 'ofetch';
  import { type InferType, object, string } from 'yup';

  const { authSignUp } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());
  const router = useRouter();

  const schema = object({
    firstName: string().required('Required'),
    lastName: string().required('Required'),
    email: string().email('Invalid email').required('Required'),
    password: string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
  });

  type Schema = InferType<typeof schema>

  const state = reactive({
    firstName: 'John', // undefined
    lastName: 'Smith', // undefined
    email: 'test1@test.com', // undefined
    password: 'test1@test.com', // undefined
  });
  const form = ref();

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      await authSignUp(event.data);
    } catch (e) {
      if (e && typeof e === 'object') {
        const err = e as FetchError;
        if (err.statusCode === 400) {
          form.value.setErrors(
            err.data?.errors.map(
              (item: ErrorsValidationInterface): FormError => {
                return { path: item.field.toLowerCase(), message: item.message };
              },
            ),
          );
        }
      }
    }
    if (authenticated) await router.push('/');
  }
</script>

<template>
  <div>
    <h1 class="text-center text-gray-700 dark:text-gray-200 mb-3 text-xl">
      Join the Expense tracker
    </h1>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="First name" name="firstName">
        <UInput v-model="state.firstName" />
      </UFormGroup>

      <UFormGroup label="Last name" name="lastName">
        <UInput v-model="state.lastName" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton block type="submit"> Sign up </UButton>
    </UForm>
  </div>
</template>

<style scoped></style>
