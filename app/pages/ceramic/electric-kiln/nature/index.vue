<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.nature.title')"
        :subtitle="t('pages.ceramic.electric_kiln.nature.subtitle')" />
    </div>

    <h2>{{ flowersTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="flowersImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ leavesSubtitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="leavesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'ceramic/electric-kiln/nature'
const ogImageEndPath = 'ceramics/electric_kiln/nature/flowers/F8.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

const keywords = [
  'miscellaneous.ceramic',
  'miscellaneous.ceramicist',
  'miscellaneous.electric_kiln',
  'miscellaneous.nature',
  'miscellaneous.flowers',
  'miscellaneous.leaves',
  'miscellaneous.art',
  'miscellaneous.artist',
  'miscellaneous.emotions',
  'about.author',
  'app.name',
]
const keywordValues = computed(() => keywords.map(keyword => t(keyword)))

useHead({
  title: computed(() => t('pages.ceramic.electric_kiln.nature.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.ceramic.electric_kiln.nature.meta.content')
      ),
    },
    {
      name: 'keywords',
      content: computed(() => keywordValues.value.join(', ')),
    },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/en/${urlEndPath}`),
      hreflang: 'en-US',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'fr-FR',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'x-default',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `/${ogImageEndPath}`,
      key: 'apple-touch-icon',
    },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() =>
    t('pages.ceramic.electric_kiln.nature.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.ceramic.electric_kiln.nature.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() =>
    t('pages.ceramic.electric_kiln.nature.meta.content')
  ),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  articleTag: keywordValues.value,
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

const flowersTitle = computed(() => t('miscellaneous.flowers'))
const leavesSubtitle = computed(() => t('miscellaneous.leaves'))

const createImages = (
  entries: readonly (readonly [string, string])[],
  folder: string,
  translationSection: string
): ImageSource[] =>
  entries.map(([filename, imageKey]) => ({
    src: `/ceramics/electric_kiln/nature/${folder}/${filename}`,
    title: t(
      `pictures.ceramics.electric_kiln.nature.${translationSection}.${imageKey}.title`
    ),
    mobileTitle: t(
      `pictures.ceramics.electric_kiln.nature.${translationSection}.${imageKey}.mobile_title`
    ),
    alt: t(
      `pictures.ceramics.electric_kiln.nature.${translationSection}.${imageKey}.alt`
    ),
  }))

const flowersEntries = [
  ...Array.from({ length: 10 }, (_, index) => {
    const number = index + 1
    return [`F${number}.webp`, `f${number}`] as const
  }),
  ...Array.from({ length: 7 }, (_, index) => {
    const number = index + 1
    return [`GF${number}.webp`, `gf${number}`] as const
  }),
]
const leavesEntries = Array.from({ length: 11 }, (_, index) => {
  const number = index + 1
  return [`Feuilles${number}.webp`, `feuilles${number}`] as const
})

const flowersImages = createImages(flowersEntries, 'flowers', 'flowers')
const leavesImages = createImages(leavesEntries, 'leaves', 'leaves')

const previousPage = {
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}

const nextPage = {
  path: '/ceramic/electric-kiln/animals',
  title: t('pages.ceramic.electric_kiln.animals.tab_name'),
  description: t('pages.ceramic.electric_kiln.animals.subtitle'),
}
</script>

<style lang="scss" scoped>
.gallery-page {
  position: relative;
  width: 100%;

  .page-header {
    margin-bottom: 50px;
  }

  h2 {
    margin: 40px 0 20px;
  }
}
</style>
