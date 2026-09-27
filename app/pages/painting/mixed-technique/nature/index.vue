<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.painting.mixed_technique.nature.title')"
        :subtitle="t('pages.painting.mixed_technique.nature.subtitle')" />
    </div>

    <div class="gallery-container">
      <ImageGrid
        :images="images"
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
const urlEndPath = 'painting/mixed-technique/nature'
const ogImageEndPath = 'paintings/mixed_technique/nature/TMn9.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

const keywords = [
  'miscellaneous.painting',
  'miscellaneous.painter',
  'miscellaneous.mixed_technique',
  'miscellaneous.nature',
  'miscellaneous.landscape',
  'miscellaneous.trees',
  'miscellaneous.art',
  'miscellaneous.artist',
  'miscellaneous.emotions',
  'about.author',
  'app.name',
]

const keywordValues = computed(() => keywords.map(keyword => t(keyword)))

useHead({
  title: computed(() => t('pages.painting.mixed_technique.nature.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.painting.mixed_technique.nature.meta.content')
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
    t('pages.painting.mixed_technique.nature.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.painting.mixed_technique.nature.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() =>
    t('pages.painting.mixed_technique.nature.meta.content')
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

const images: ImageSource[] = Array.from({ length: 14 }, (_, index) => {
  const imageNumber = index + 1
  const imageKey = `tmn${imageNumber}`

  return {
    src: `/paintings/mixed_technique/nature/TMn${imageNumber}.webp`,
    title: t(`pictures.paintings.mixed_technique.nature.${imageKey}.title`),
    mobileTitle: t(
      `pictures.paintings.mixed_technique.nature.${imageKey}.mobile_title`
    ),
    alt: t(`pictures.paintings.mixed_technique.nature.${imageKey}.alt`),
    dimensions: t(
      `pictures.paintings.mixed_technique.nature.${imageKey}.dimensions`
    ),
  }
})

const previousPage = {
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}

const nextPage = {
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}
</script>

<style lang="scss" scoped>
.gallery-page {
  position: relative;
  width: 100%;

  .page-header {
    margin-bottom: 50px;
  }
}
</style>
