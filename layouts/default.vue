<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '~/store/auth';

  const router = useRouter();

  const { logUserOut } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());

  const logout = () => {
    logUserOut();
    router.push('/login');
  };

  const colorMode = useColorMode()
  const isDark = computed({
    get () {
      return colorMode.value === 'dark'
    },
    set () {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })
</script>
<template>
  <div>
    <header>
      <UContainer class="flex mt-2">
        <UIcon class="text-5xl text-gray-700 dark:text-gray-200 mr-2" name="i-heroicons-presentation-chart-line" />

        <div class="flex items-center w-full">
          <ULink
            to="/"
            active-class="text-primary"
            class="mr-2"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Дашборд
          </ULink>
          <ULink
            to="/settings"
            active-class="text-primary"
            class="mr-2"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Налаштування
          </ULink>
          <ULink
            to="/about"
            active-class="text-primary"
            class="mr-2"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            About
          </ULink>
          <ULink
            to="/test"
            class="mr-2"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Test
          </ULink>
          <UButton
            v-if="authenticated"
            icon="i-heroicons-arrow-left-on-rectangle"
            size="sm"
            color="primary"
            variant="solid"
            label="Sign out"
            :trailing="false"
            class="ml-auto"
            @click="logout"
          />
        </div>
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
      </UContainer>
    </header>
    <UDivider :ui="{ wrapper: { base: 'py-3' } }" />
    <div class="mainContent">
      <UContainer>
        <slot />
      </UContainer>
    </div>
  </div>
</template>
