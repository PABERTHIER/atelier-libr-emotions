<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.nature.title')"
        :subtitle="t('pages.ceramic.electric_kiln.nature.subtitle')" />
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
const urlEndPath = 'ceramic/electric-kiln/nature'
const ogImageEndPath = 'ceramics/electric_kiln/nature/flowers/F8.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

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
      content: `${computed(() => t('miscellaneous.ceramic')).value},
        ${computed(() => t('miscellaneous.ceramicist')).value},
        ${computed(() => t('miscellaneous.electric_kiln')).value},
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
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() =>
    t('pages.ceramic.electric_kiln.nature.meta.content')
  ),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() =>
    t('pages.ceramic.electric_kiln.nature.meta.content')
  ),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.ceramic')).value,
    computed(() => t('miscellaneous.ceramicist')).value,
    computed(() => t('miscellaneous.electric_kiln')).value,
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
//   title: computed(() => t('pages.ceramic.electric_kiln.nature.tab_name')),
//   description: computed(() => t('pages.ceramic.electric_kiln.nature.meta.content')),
// })

const subtitle1 = computed(() => t('miscellaneous.flowers'))

const images: ImageSource[] = [
  {
    src: '/ceramics/electric_kiln/nature/flowers/F1.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f1.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f1.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f1.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F2.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f2.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f2.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f2.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F3.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f3.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f3.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f3.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F4.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f4.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f4.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f4.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F5.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f5.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f5.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f5.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F6.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f6.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f6.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f6.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F7.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f7.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f7.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f7.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F8.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f8.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f8.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f8.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F9.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f9.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f9.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f9.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/F10.webp',
    title: t('pictures.ceramics.electric_kiln.nature.f10.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.f10.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.f10.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/GF1.webp',
    title: t('pictures.ceramics.electric_kiln.nature.gf1.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.gf1.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.gf1.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/GF2.webp',
    title: t('pictures.ceramics.electric_kiln.nature.gf2.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.gf2.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.gf2.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/GF3.webp',
    title: t('pictures.ceramics.electric_kiln.nature.gf3.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.gf3.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.gf3.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/GF4.webp',
    title: t('pictures.ceramics.electric_kiln.nature.gf4.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.gf4.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.gf4.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/GF5.webp',
    title: t('pictures.ceramics.electric_kiln.nature.gf5.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.gf5.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.gf5.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/GF6.webp',
    title: t('pictures.ceramics.electric_kiln.nature.gf6.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.gf6.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.gf6.alt'),
  },
  {
    src: '/ceramics/electric_kiln/nature/flowers/GF7.webp',
    title: t('pictures.ceramics.electric_kiln.nature.gf7.title'),
    mobileTitle: t('pictures.ceramics.electric_kiln.nature.gf7.mobile_title'),
    alt: t('pictures.ceramics.electric_kiln.nature.gf7.alt'),
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
