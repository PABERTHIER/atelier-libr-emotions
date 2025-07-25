// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'fr',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      title: "Atelier Libr'Émotions",
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'application-name', content: "Atelier Libr'Émotions" },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: "Atelier Libr'Émotions" },
      ],
      templateParams: {
        separator: '-',
      },
    },
  },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  image: {
    format: ['webp', 'jpg', 'jpeg', 'png'],
    provider: 'ipx'
  },
  plugins: [],
  build: {
    transpile: [],
  },
  typescript: {
    strict: true,
  },
  modules: ['@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/seo', '@nuxt/ui', '@nuxt/fonts'],
  imports: {
    dirs: [],
  },
  runtimeConfig: {
    public: {
      apiBase: '',
      i18n: {
        baseUrl:
          process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3000'
            : 'https://atelierlibremotions.vercel.app',
      },
    },
  },
  ui: {},
  icon: {
    customCollections: [
      {
        prefix: 'ale-icon',
        dir: './assets/svg',
      },
    ],
  },
  i18n: {
    defaultLocale: 'fr',
    langDir: 'locales',
    lazy: true,
    strategy: 'prefix',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variables.scss" as *;',
          api: 'modern-compiler',
        },
      },
    },
    plugins: [],
  },
  compatibilityDate: '2024-10-05',
  devtools: {
    enabled: true,
  },
  site: {
    url: 'https://atelierlibremotions.vercel.app',
    name: "Atelier Libr'Émotions",
    identity: {
      type: 'Person',
    },
    robots: {
      index: true,
      follow: true,
    },
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: "Atelier Libr'Émotions",
      url: 'https://atelierlibremotions.vercel.app',
      logo: 'https://atelierlibremotions.vercel.app/paintings/celestial-collision.jpg', // TODO: Replace by the logo
    },
  },
  ogImage: {
    componentOptions: {
      global: true,
    },
  },
})
