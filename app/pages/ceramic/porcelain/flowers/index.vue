<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.porcelain.flowers.title')"
        :subtitle="t('pages.ceramic.porcelain.flowers.subtitle')" />
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
const urlEndPath = 'ceramic/porcelain/flowers'
const ogImageEndPath = 'ceramics/porcelain/flowers/FP13.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.ceramic.porcelain.flowers.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.ceramic.porcelain.flowers.meta.content')
      ),
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
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() =>
    t('pages.ceramic.porcelain.flowers.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.ceramic.porcelain.flowers.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.ceramic.porcelain.flowers.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() =>
    t('pages.ceramic.porcelain.flowers.meta.content')
  ),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() =>
    t('pages.ceramic.porcelain.flowers.meta.content')
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

// defineOgImageComponent('NuxtSeo', {
//   theme: '#4A7C59',
//   colorMode: 'dark',
//   title: computed(() => t('pages.ceramic.porcelain.flowers.tab_name')),
//   description: computed(() => t('pages.ceramic.porcelain.flowers.meta.content')),
// })

const images: ImageSource[] = [
  {
    src: '/ceramics/porcelain/flowers/FP1.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp1.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp1.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp1.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP2.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp2.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp2.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp2.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP3.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp3.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp3.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp3.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP4.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp4.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp4.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp4.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP5.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp5.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp5.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp5.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP6.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp6.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp6.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp6.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP7.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp7.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp7.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp7.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP8.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp8.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp8.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp8.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP9.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp9.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp9.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp9.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP10.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp10.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp10.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp10.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP11.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp11.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp11.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp11.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP12.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp12.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp12.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp12.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP13.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp13.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp13.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp13.alt'),
  },
  {
    src: '/ceramics/porcelain/flowers/FP14.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp14.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp14.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp14.alt'),
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
