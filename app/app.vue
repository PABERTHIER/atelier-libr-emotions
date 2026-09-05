<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n()
const runtimeConfig = useRuntimeConfig()
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const ogImageEndPath = 'paintings/celestial-collision.jpg'

const availableLocaleAlternates = computed(() => {
  const localesFiltered = locales.value.filter(l => l.code !== locale.value)
  const localesFilteredUpdated = localesFiltered.map(
    x => x.language?.replace('-', '_') ?? 'en_US'
  )
  return localesFilteredUpdated.filter(
    (item, index) => localesFilteredUpdated.indexOf(item) === index
  )
})

useHead({
  titleTemplate: '%s %separator %siteName',
  meta: [
    { name: 'description', content: computed(() => t('app.meta.description')) },
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: '',
    },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-icon.jpg',
      key: 'apple-touch-icon',
    },
    { rel: 'apple-touch-startup-image', href: '/apple-icon.jpg' },
    { rel: 'mask-icon', href: '/logo.svg', color: '#1D3461' },
  ],
})

useSeoMeta({
  title: computed(() => t('app.name')),
  ogTitle: computed(() => t('app.name')),
  ogSiteName: computed(() => t('app.name')),
  applicationName: computed(() => t('app.name')),
  description: computed(() => t('app.meta.description')),
  ogDescription: computed(() => t('app.meta.description')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('app.meta.description')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: `${baseUrl.value}`,
  ogType: 'website',
  ogLocale: locale.value,
  ogLocaleAlternate: availableLocaleAlternates.value,
  author: computed(() => t('about.author')),
  creator: computed(() => t('about.author')),
  articleAuthor: computed(() => [computed(() => t('about.author')).value]),
  articleSection: computed(() => t('miscellaneous.art')),
  articleTag: computed(() => [
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.painting')).value,
    computed(() => t('miscellaneous.painter')).value,
    computed(() => t('miscellaneous.ceramic')).value,
    computed(() => t('miscellaneous.ceramicist')).value,
    computed(() => t('miscellaneous.pottery')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ]),
  profileFirstName: computed(() => t('about.first_name')),
  profileLastName: computed(() => t('about.last_name')),
  profileUsername: computed(() => t('about.username')),
  profileGender: 'female',
  publisher: 'https://atelierlibremotions.vercel.app',
  generator: 'https://nuxt.com/',
  mobileWebAppCapable: 'yes',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppTitle: computed(() => t('app.name')),
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
  msapplicationTileColor: '#FF0000',
})
</script>

<style lang="scss" scoped></style>
