<script lang="ts" setup>
  const state = reactive({ isSignUp: false });
  function setIsSignUp(value: boolean) {
    state.isSignUp = value;
  }
</script>

<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
  >
    <UContainer :ui="{ constrained: 'max-w-sm' }">
      <template v-if="!state.isSignUp">
        <SignIn />
        <div class="text-gray-500 dark:text-gray-200 text-sm mt-3">
          Don’t have an account?
          <button
            @click="setIsSignUp(true)"
            class="text-yellow-500 hover:text-yellow-700 js-sign-in"
          >
            Sign up
          </button>
        </div>
      </template>
      <template v-if="state.isSignUp">
        <SignUp />
        <div class="text-gray-500 dark:text-gray-200 text-sm mt-3">
          Already have an account?
          <button
            @click="setIsSignUp(false)"
            class="text-yellow-500 hover:text-yellow-700"
          >
            Log in
          </button>
        </div>
      </template>
    </UContainer>
  </UCard>
</template>
