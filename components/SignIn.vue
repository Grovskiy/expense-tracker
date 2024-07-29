<script setup lang="ts">
  import { object, string, type InferType } from 'yup';
  import type { FormSubmitEvent } from '#ui/types';
  import { useAuthStore } from '~/store/auth';
  import { storeToRefs } from 'pinia';
  import type { IFetchError } from 'ofetch';
  import { request } from '~/utils/request';

  const { handleRes  } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());
  const router = useRouter();

  const schema = object({
    email: string().email('Invalid email').required('Required'),
    password: string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    email: undefined,
    password: undefined,
  });
  const form = ref();
  const isLoading = ref();

  // TODO: add loader
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isLoading.value = true;

      await request('/api/Authentication/sign-in', {
        method: 'post',
        body: event.data,
      })
        .then(res => handleRes(res))

      if (authenticated.value) await router.push('/');
      firstLogin();
    } catch (e) {
      const err = e as IFetchError['data'];
      if (err.status === 400) {
        form.value.setErrors([
          { path: 'email', message: err.error },
          { path: 'password', message: err.error },
        ]);
      }
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="space-y-3"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" placeholder="someone@example.com" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="state.password"
        type="password"
        placeholder="qwerty***"
      />
    </UFormGroup>

    <UButton block type="submit" :loading="isLoading"> Sign in </UButton>
  </UForm>
</template>

<style scoped></style>
