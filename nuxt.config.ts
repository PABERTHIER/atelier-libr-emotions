// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'fr',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      title: 'Atelier Libr\'Émotions',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  ssr: false,
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  plugins: [],
  build: {
    transpile: [],
  },
  typescript: {
    strict: true,
  },
  modules: ['@nuxt/image', '@nuxt/devtools', '@nuxtjs/i18n'],
  imports: {
    dirs: [],
  },
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
  i18n: {
    defaultLocale: 'fr',
    langDir: 'lang',
    lazy: true,
    strategy: 'prefix',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";',
          api: 'modern-compiler',
        },
      },
    },
    plugins: [],
  },
  compatibilityDate: '2024-10-05',
  devtools: {
    enabled: false,
  },
})
