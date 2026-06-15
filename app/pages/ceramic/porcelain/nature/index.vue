<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.porcelain.nature.title')"
        :subtitle="t('pages.ceramic.porcelain.nature.subtitle')" />
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
const urlEndPath = 'ceramic/porcelain/nature'
const ogImageEndPath = 'ceramics/porcelain/nature/flowers/FP13.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.ceramic.porcelain.nature.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.ceramic.porcelain.nature.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.ceramic')).value},
        ${computed(() => t('miscellaneous.ceramicist')).value},
        ${computed(() => t('miscellaneous.porcelain')).value},
        ${computed(() => t('miscellaneous.nature')).value},
        ${computed(() => t('miscellaneous.flowers')).value},
        ${computed(() => t('miscellaneous.art')).value},
        ${computed(() => t('miscellaneous.artist')).value},
        ${computed(() => t('miscellaneous.emotions')).value},
        ${computed(() => t('about.author')).value},
        ${computed(() => t('app.name')).value},
      `,
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
  description: computed(() => t('pages.ceramic.porcelain.nature.meta.content')),
  ogDescription: computed(() =>
    t('pages.ceramic.porcelain.nature.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.ceramic.porcelain.nature.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() =>
    t('pages.ceramic.porcelain.nature.meta.content')
  ),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() =>
    t('pages.ceramic.porcelain.nature.meta.content')
  ),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.ceramic')).value,
    computed(() => t('miscellaneous.ceramicist')).value,
    computed(() => t('miscellaneous.porcelain')).value,
    computed(() => t('miscellaneous.nature')).value,
    computed(() => t('miscellaneous.flowers')).value,
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

const subtitle1 = computed(() => t('miscellaneous.flowers'))

const images: ImageSource[] = [
  {
    src: '/ceramics/porcelain/nature/flowers/FP1.webp',
    title: t('pictures.ceramics.porcelain.nature.fp1.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp1.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp1.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP2.webp',
    title: t('pictures.ceramics.porcelain.nature.fp2.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp2.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp2.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP3.webp',
    title: t('pictures.ceramics.porcelain.nature.fp3.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp3.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp3.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP4.webp',
    title: t('pictures.ceramics.porcelain.nature.fp4.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp4.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp4.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP5.webp',
    title: t('pictures.ceramics.porcelain.nature.fp5.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp5.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp5.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP6.webp',
    title: t('pictures.ceramics.porcelain.nature.fp6.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp6.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp6.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP7.webp',
    title: t('pictures.ceramics.porcelain.nature.fp7.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp7.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp7.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP8.webp',
    title: t('pictures.ceramics.porcelain.nature.fp8.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp8.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp8.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP9.webp',
    title: t('pictures.ceramics.porcelain.nature.fp9.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp9.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp9.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP10.webp',
    title: t('pictures.ceramics.porcelain.nature.fp10.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp10.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp10.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP11.webp',
    title: t('pictures.ceramics.porcelain.nature.fp11.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp11.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp11.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP12.webp',
    title: t('pictures.ceramics.porcelain.nature.fp12.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp12.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp12.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP13.webp',
    title: t('pictures.ceramics.porcelain.nature.fp13.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp13.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp13.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP14.webp',
    title: t('pictures.ceramics.porcelain.nature.fp14.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp14.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp14.alt'),
  },
  {
    src: '/ceramics/porcelain/nature/flowers/FP15.webp',
    title: t('pictures.ceramics.porcelain.nature.fp15.title'),
    mobileTitle: t('pictures.ceramics.porcelain.nature.fp15.mobile_title'),
    alt: t('pictures.ceramics.porcelain.nature.fp15.alt'),
  },
]

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
