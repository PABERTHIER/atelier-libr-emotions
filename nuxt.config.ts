// https://nuxt.com/docs/api/configuration/nuxt-config
import { robotsContent } from './app/data/seo'
import { externalLinks, siteName } from './app/data/site'
import { generateImageRoutes } from './app/utils/generateImageRoutes'

// Production can override the Vercel fallback with NUXT_SITE_URL at build time
const prodUrl = (
  process.env.NUXT_SITE_URL || 'https://atelierlibremotions.vercel.app'
).replace(/\/$/, '')

const siteUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_ENV === 'production'
      ? prodUrl
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : prodUrl

const indexable =
  process.env.NODE_ENV !== 'development' &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production')

export default defineNuxtConfig({
  routeRules: {
    // Nuxt discovers page routes for sitemaps; these rules also set HTTP noindex
    '/fr/wip': { robots: robotsContent.blocked, sitemap: false },
    '/en/wip': { robots: robotsContent.blocked, sitemap: false },
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      title: siteName,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        { name: 'application-name', content: siteName },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        {
          name: 'apple-mobile-web-app-title',
          content: siteName,
        },
        { name: 'theme-color', content: '#F7F5F2' },
      ],
      templateParams: {
        separator: '-',
      },
    },
  },
  ssr: true,
  nitro: {
    prerender: {
      routes: generateImageRoutes(),
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  image: {
    provider: 'ipx',
    format: ['webp', 'jpg', 'jpeg', 'png'],
    screens: {
      xs: 320,
    },
  },
  plugins: [],
  build: {
    transpile: [],
  },
  typescript: {
    strict: true,
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],
  imports: {
    dirs: [],
  },
  runtimeConfig: {
    public: {
      apiBase: '',
      i18n: {
        baseUrl: siteUrl,
      },
    },
  },
  ui: {},
  icon: {
    clientBundle: {
      includeCustomCollections: true,
    },
    customCollections: [
      {
        prefix: 'ale-icon',
        dir: './app/assets/svg',
      },
    ],
  },
  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'fr',
    langDir: 'locales',
    strategy: 'prefix',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  css: ['~/styles/default.scss', '~/styles/keyframes.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variables.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vueuse/core',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lenis',
      ],
    },
    plugins: [],
  },
  compatibilityDate: '2026-10-28',
  devtools: {
    enabled: true,
  },
  site: {
    url: siteUrl,
    name: siteName,
    defaultLocale: 'fr-FR',
    trailingSlash: false,
    indexable,
  },
  robots: {
    robotsEnabledValue: robotsContent.indexable,
    robotsDisabledValue: robotsContent.blocked,
  },
  aiReady: false, // SEO v6 bundles AI Ready; this SSR site does not publish AI content endpoints
  skewProtection: false, // Vercel builds do not share the local asset cache required by this module
  schemaOrg: {
    reactive: true,
    identity: {
      type: 'Person',
      name: siteName,
      jobTitle: 'Painter & Ceramicist',
      worksFor: 'Véronique Berthier',
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      image: `${siteUrl}/paintings/celestial-collision.jpg`,
      sameAs: [externalLinks.facebook, externalLinks.instagram],
    },
  },
  ogImage: {
    enabled: false,
  },
})
