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
    { rel: 'canonical', href: `${baseUrl.value}/${locale.value}` },
    { rel: 'alternate', href: `${baseUrl.value}`, hreflang: 'fr-FR' },
    { rel: 'alternate', href: `${baseUrl.value}/fr`, hreflang: 'fr-FR' },
    { rel: 'alternate', href: `${baseUrl.value}/en`, hreflang: 'en-US' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: '',
    },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: 'apple-icon.jpg' },
    { rel: 'apple-touch-icon-precomposed', href: 'apple-icon.jpg' },
    { rel: 'apple-touch-startup-image', href: 'apple-icon.jpg' },
    { rel: 'mask-icon', href: 'apple-icon.jpg', color: '#000000' }, // TODO: Replace with a svg file (logo)
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
  ogType: 'article',
  ogLocale: locale.value,
  ogLocaleAlternate: availableLocaleAlternates.value,
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('app.name')),
  twitterDescription: computed(() => t('app.meta.description')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('app.meta.description')),
  twitterImageType: 'image/jpeg',
  author: computed(() => t('about.author')),
  creator: computed(() => t('about.author')),
  articleAuthor: computed(() => [computed(() => t('about.author')).value]),
  articleSection: computed(() => t('miscellaneous.art')),
  articleTag: computed(() => [
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.painting')).value,
    computed(() => t('miscellaneous.ceramic')).value,
    computed(() => t('miscellaneous.pottery')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ]),
  profileFirstName: computed(() => t('about.first_name')),
  profileLastName: computed(() => t('about.last_name')),
  profileUsername: computed(() => t('about.username')),
  profileGender: 'female',
  publisher: 'https://vercel.com/',
  generator: 'https://nuxt.com/',
  mobileWebAppCapable: 'yes',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppTitle: computed(() => t('app.name')),
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
  msapplicationTileColor: '#ff0000',
})
</script>

<style lang="scss" scoped></style>
