// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    // baseURL: process.env.NODE_ENV === 'production' ? '' : '',
    // buildAssetsDir: process.env.NODE_ENV === 'production' ? '' : '',
    baseURL: process.env.NODE_ENV === 'production' ? '/expense-tracker/' : '',
    buildAssetsDir: process.env.NODE_ENV === 'production' ? 'assets' : '',
  },
  devtools: {
    enabled: process.env.NODE_ENV !== 'production',

    timeline: {
      enabled: process.env.NODE_ENV !== 'production',
    },
  },
  routeRules: {
    '/api/**': { proxy: { to: `${process.env.NUXT_BACKEND_URL}/api/**` } },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    'nuxt-typed-router',
    ['@nuxtjs/eslint-module', { emitWarning: true }],
    'dayjs-nuxt',
  ],
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_BACKEND_URL,
      baseUrl: process.env.NUXT_BASE_URL,
      apiBase: '/api',
      myValue: process.env.NUXT_PUBLIC_MY_VALUE,
    },
  },
});
