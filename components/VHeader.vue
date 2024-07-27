<script setup lang="ts">
  import { useAuthStore } from '~/store/auth';
  import { storeToRefs } from 'pinia';

  const router = useRouter();

  const { logUserOut } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());

  const isOpen = ref(false);
  const activeClass = 'text-primary';

  const isMobile = computed(() => window.innerWidth <= 768);

  const menuItems = [
    { label: 'Дашборд', path: '/' },
    { label: 'Підписки', path: '/subscriptions' },
    { label: 'Повторюваний надходження', path: '/repeatable' },
    { label: 'Витрати', path: '/expenses' },
    { label: 'Надходження', path: '/incomes' },
    { label: 'Налаштування', path: '/settings' },
  ];

  const logout = () => {
    logUserOut();
    router.push('/login');
    isOpen.value = false;
  };
  const toggleOpen = () => {
    isOpen.value = !isOpen.value;
  };
  const colorMode = useColorMode();

  const pushToRoute = (path: string) => {
    router.push({ path });
    isOpen.value = false;
  };

  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    },
  });
  const inactiveClass =
    'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200';
</script>

<template>
  <header>
    <UContainer class="flex mt-2">
      <UButton
        class="text-3xl text-gray-700 dark:text-gray-200 mr-4"
        icon="i-heroicons-presentation-chart-line"
        size="md"
        color="primary"
        variant="outline"
        @click="pushToRoute('/')"
      />
      <div
        class="text-sm flex items-center w-full child:mr-3 child:flex child:items-center"
      >
        <template v-if="isMobile">
          <div class="flex items-center w-full">
            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
              class="ml-auto mr-4"
            />
            <UButton
              @click="toggleOpen"
              variant="outline"
              icon="i-heroicons-queue-list"
            />
          </div>
          <USlideover v-model="isOpen">
            <div class="p-4">
              <div class="flex items-center justify-end m-2">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  @click="isOpen = false"
                />
              </div>
              <div class="flex flex-col space-y-3">
                <ULink
                  v-for="(item, index) in menuItems" :key="index"
                  :to="item.path"
                  :active-class="activeClass"
                  :inactive-class="inactiveClass"
                  @click="pushToRoute(item.path)"
                >
                  {{ item.label }}
                </ULink>
                <UButton
                  v-if="authenticated"
                  icon="i-heroicons-arrow-left-on-rectangle"
                  size="md"
                  color="rose"
                  variant="outline"
                  label="Sign out"
                  :trailing="false"
                  @click="logout"
                />
              </div>
            </div>
          </USlideover>
        </template>
        <template v-if="!isMobile">
          <div class="py-2">
            <ul class="flex space-x-3">
              <li v-for="(item, index) in menuItems" :key="index">
                <ULink
                  :to="item.path"
                  :active-class="activeClass"
                  :inactive-class="inactiveClass"
                >
                  {{ item.label }}
                </ULink>
              </li>
            </ul>
          </div>
          <UButton
            v-if="authenticated"
            icon="i-heroicons-arrow-left-on-rectangle"
            size="sm"
            color="primary"
            variant="outline"
            label="Sign out"
            :trailing="false"
            class="ml-auto"
            @click="logout"
          />

          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
        </template>
      </div>

      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </UContainer>
  </header>
</template>
