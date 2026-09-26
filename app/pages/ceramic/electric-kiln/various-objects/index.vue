<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.various_objects.title')"
        :subtitle="t('pages.ceramic.electric_kiln.various_objects.subtitle')" />
    </div>

    <h2>{{ subtitle1 }}</h2>
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
const urlEndPath = 'ceramic/electric-kiln/various-objects'
const ogImageEndPath =
  'ceramics/electric_kiln/various_objects/boxes/Sgraffitto4.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

const keywords = [
  'miscellaneous.ceramic',
  'miscellaneous.ceramicist',
  'miscellaneous.electric_kiln',
  'miscellaneous.various_objects',
  'miscellaneous.boxes',
  'miscellaneous.art',
  'miscellaneous.artist',
  'miscellaneous.emotions',
  'about.author',
  'app.name',
]

const keywordValues = computed(() => keywords.map(keyword => t(keyword)))

useHead({
  title: computed(() =>
    t('pages.ceramic.electric_kiln.various_objects.tab_name')
  ),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.ceramic.electric_kiln.various_objects.meta.content')
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
    t('pages.ceramic.electric_kiln.various_objects.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.ceramic.electric_kiln.various_objects.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() =>
    t('pages.ceramic.electric_kiln.various_objects.meta.content')
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

const subtitle1 = computed(() => t('miscellaneous.boxes'))

const imageEntries = [
  ['Boite1.webp', 'boite1'],
  ['Boite2.webp', 'boite2'],
  ['Boite3.webp', 'boite3'],
  ['Boite4.webp', 'boite4'],
  ['Boite5.webp', 'boite5'],
  ['Boite6.webp', 'boite6'],
  ['Boite7.webp', 'boite7'],
  ['Boite8.webp', 'boite8'],
  ['Boite9.webp', 'boite9'],
  ['BoiteOeuf.webp', 'boite_oeuf'],
  ['Sgraffitto1.webp', 'sgraffitto1'],
  ['Sgraffitto2.webp', 'sgraffitto2'],
  ['Sgraffitto3.webp', 'sgraffitto3'],
  ['Sgraffitto4.webp', 'sgraffitto4'],
  ['Sgraffitto5.webp', 'sgraffitto5'],
  ['Sgraffitto6.webp', 'sgraffitto6'],
] as const

const images: ImageSource[] = imageEntries.map(([filename, imageKey]) => ({
  src: `/ceramics/electric_kiln/various_objects/boxes/${filename}`,
  title: t(`pictures.ceramics.electric_kiln.various_objects.${imageKey}.title`),
  mobileTitle: t(
    `pictures.ceramics.electric_kiln.various_objects.${imageKey}.mobile_title`
  ),
  alt: t(`pictures.ceramics.electric_kiln.various_objects.${imageKey}.alt`),
}))

const previousPage = {
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
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
