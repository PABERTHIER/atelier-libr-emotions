<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.vases_and_pots.title')"
        :subtitle="t('pages.ceramic.electric_kiln.vases_and_pots.subtitle')" />
    </div>

    <h2>{{ intuitivePotsTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="intuitivePotsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ singleFlowerVasesTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="singleFlowerVasesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ roundVasesTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="roundVasesImages"
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
const urlEndPath = 'ceramic/electric-kiln/vases-and-pots'
const ogImageEndPath =
  'ceramics/electric_kiln/vases_and_pots/single_flower_vases/Soliflores10.webp'
const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

const keywords = [
  'miscellaneous.ceramic',
  'miscellaneous.ceramicist',
  'miscellaneous.electric_kiln',
  'miscellaneous.vases_and_pots',
  'miscellaneous.intuitive_pots',
  'miscellaneous.single_flower_vases',
  'miscellaneous.round_vases',
  'miscellaneous.art',
  'miscellaneous.artist',
  'miscellaneous.emotions',
  'about.author',
  'app.name',
]
const keywordValues = computed(() => keywords.map(keyword => t(keyword)))

useHead({
  title: computed(() =>
    t('pages.ceramic.electric_kiln.vases_and_pots.tab_name')
  ),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.ceramic.electric_kiln.vases_and_pots.meta.content')
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
    t('pages.ceramic.electric_kiln.vases_and_pots.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.ceramic.electric_kiln.vases_and_pots.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() =>
    t('pages.ceramic.electric_kiln.vases_and_pots.meta.content')
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

const intuitivePotsTitle = computed(() => t('miscellaneous.intuitive_pots'))
const singleFlowerVasesTitle = computed(() =>
  t('miscellaneous.single_flower_vases')
)
const roundVasesTitle = computed(() => t('miscellaneous.round_vases'))

const createImages = (
  entries: readonly (readonly [string, string])[],
  folder: string,
  translationSection: string
): ImageSource[] =>
  entries.map(([filename, imageKey]) => ({
    src: `/ceramics/electric_kiln/vases_and_pots/${folder}/${filename}`,
    title: t(
      `pictures.ceramics.electric_kiln.vases_and_pots.${translationSection}.${imageKey}.title`
    ),
    mobileTitle: t(
      `pictures.ceramics.electric_kiln.vases_and_pots.${translationSection}.${imageKey}.mobile_title`
    ),
    alt: t(
      `pictures.ceramics.electric_kiln.vases_and_pots.${translationSection}.${imageKey}.alt`
    ),
  }))

const intuitivePotsEntries = Array.from({ length: 15 }, (_, index) => {
  const number = index + 1
  return [`PotsIntuitifs${number}.webp`, `pots_intuitifs${number}`] as const
})
const singleFlowerVasesEntries = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1
  return [`Soliflores${number}.webp`, `soliflores${number}`] as const
})
const roundVasesEntries = Array.from({ length: 6 }, (_, index) => {
  const number = index + 1
  return [`VasesRonds${number}.webp`, `vases_ronds${number}`] as const
})

const intuitivePotsImages = createImages(
  intuitivePotsEntries,
  'intuitive_pots',
  'intuitive_pots'
)
const singleFlowerVasesImages = createImages(
  singleFlowerVasesEntries,
  'single_flower_vases',
  'single_flower_vases'
)
const roundVasesImages = createImages(
  roundVasesEntries,
  'round_vases',
  'round_vases'
)

const previousPage = {
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}

const nextPage = {
  path: '/ceramic/electric-kiln/various-objects',
  title: t('pages.ceramic.electric_kiln.various_objects.tab_name'),
  description: t('pages.ceramic.electric_kiln.various_objects.subtitle'),
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
