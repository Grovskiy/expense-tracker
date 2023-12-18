// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    'nuxt-typed-router',
    ['@nuxtjs/eslint-module', { emitWarning: true }],
  ],
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_BACKEND_URL,
      apiBase: '/api',
      myValue: process.env.NUXT_PUBLIC_MY_VALUE,
    },
  },
});
// # $config.public.baseUrl in templates
// # or  | const runtimeConfig = useRuntimeConfig();
// # and | runtimeConfig.public.baseUrl

// rules: {
//   'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
// }
