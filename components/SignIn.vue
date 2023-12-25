<script setup lang="ts">
  import { object, string, type InferType } from 'yup';
  import type { FormSubmitEvent } from '#ui/types';
  import { useAuthStore } from '~/store/auth';
  import { storeToRefs } from 'pinia';
  import { FetchError } from 'ofetch';

  const { authSignIn } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());
  const router = useRouter();

  const schema = object({
    email: string().email('Invalid email').required('Required'),
    password: string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
  });

  type Schema = InferType<typeof schema>

  const state = reactive({
    email: 'test1@test.com', // undefined
    password: 'test1@test.com', // undefined
  });
  const form = ref();

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      await authSignIn(event.data);
    } catch (e) {
      if (e && typeof e === 'object') {
        const err = e as FetchError;
        if (err.statusCode === 400) {
          form.value.setErrors([
            { path: 'email', message: err.data?.error },
            { path: 'password', message: err.data?.error },
          ]);
        }
      }
    }
    if (authenticated) await router.push('/');
  }
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
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
