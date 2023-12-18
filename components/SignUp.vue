<script setup lang="ts">
  import type { FormError, FormSubmitEvent } from '#ui/types';
  import { useAuthStore, type UserTokensInterface } from '~/store/auth';
  import { storeToRefs } from 'pinia';

  const { setAuthenticated } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());
  const router = useRouter();
  interface UserSignUpInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const state = reactive({
    firstName: 'John', // undefined
    lastName: 'Smith', // undefined
    email: 'test1@test.com', // undefined
    password: 'test1@test.com', // undefined
  });

  const validate = (signInUser: UserSignUpInterface): FormError[] => {
    const errors = [];
    if (!signInUser.firstName)
      errors.push({ path: 'firstName', message: 'Required' });
    if (!signInUser.lastName)
      errors.push({ path: 'lastName', message: 'Required' });
    if (!signInUser.email) errors.push({ path: 'email', message: 'Required' });
    if (!signInUser.password)
      errors.push({ path: 'password', message: 'Required' });
    return errors;
  };
  async function onSubmit(event: FormSubmitEvent<UserSignUpInterface>) {
    const { accessToken, refreshToken }: UserTokensInterface = await $fetch(
      '/api/auth/sign-up',
      {
        method: 'post',
        body: event.data,
      },
    );
    if (accessToken) setAuthenticated({ accessToken, refreshToken });
    if (authenticated) await router.push('/');
  }
</script>

<template>
  <div>
    <h1 class="text-center text-gray-700 dark:text-gray-200 mb-3 text-xl">
      Join the Expense tracker
    </h1>
    <UForm
      :validate="validate"
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
