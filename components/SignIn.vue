<script setup lang="ts">
  import type { FormError, FormSubmitEvent } from '#ui/types';
  import { useAuthStore, type UserTokensInterface } from '~/store/auth';
  import { storeToRefs } from 'pinia';

  const { setAuthenticated } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());
  const router = useRouter();
  interface UserSignInInterface {
    email: string;
    password: string;
  }

  const state = reactive({
    email: 'test1@test.com', // undefined
    password: 'test1@test.com', // undefined
  });

  const validate = (signInUser: UserSignInInterface): FormError[] => {
    const errors = [];
    if (!signInUser.email) errors.push({ path: 'email', message: 'Required' });
    if (!signInUser.password)
      errors.push({ path: 'password', message: 'Required' });
    return errors;
  };
  async function onSubmit(event: FormSubmitEvent<UserSignInInterface>) {
    const { accessToken, refreshToken }: UserTokensInterface = await $fetch(
      '/api/auth/sign-in',
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
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton block type="submit"> Sign in </UButton>
  </UForm>
</template>

<style scoped></style>
