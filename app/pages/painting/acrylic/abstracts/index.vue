<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.painting.acrylic.abstracts.title')"
        :subtitle="t('pages.painting.acrylic.abstracts.subtitle')" />
    </div>

    <div class="gallery-container">
      <ImageGrid
        :images="images"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :next-page="nextPage" />
  </div>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'painting/acrylic/abstracts'
const ogImageEndPath = 'paintings/acrylic/abstracts/AutomaticPainting2.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.painting.acrylic.abstracts.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.painting.acrylic.abstracts.meta.content')
      ),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.painting')).value},
        ${computed(() => t('miscellaneous.painter')).value},
        ${computed(() => t('miscellaneous.acrylic')).value},
        ${computed(() => t('miscellaneous.abstracts')).value},
        ${computed(() => t('miscellaneous.haphazardly')).value},
        ${computed(() => t('miscellaneous.mish_mash')).value},
        ${computed(() => t('miscellaneous.automatic_painting')).value},
        ${computed(() => t('miscellaneous.abstract_art')).value},
        ${computed(() => t('miscellaneous.art')).value},
        ${computed(() => t('miscellaneous.artist')).value},
        ${computed(() => t('miscellaneous.emotions')).value},
        ${computed(() => t('miscellaneous.nature')).value},
        ${computed(() => t('miscellaneous.animals')).value},
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
    t('pages.painting.acrylic.abstracts.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.painting.acrylic.abstracts.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() =>
    t('pages.painting.acrylic.abstracts.meta.content')
  ),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() =>
    t('pages.painting.acrylic.abstracts.meta.content')
  ),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() =>
    t('pages.painting.acrylic.abstracts.meta.content')
  ),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.painting')).value,
    computed(() => t('miscellaneous.painter')).value,
    computed(() => t('miscellaneous.acrylic')).value,
    computed(() => t('miscellaneous.abstracts')).value,
    computed(() => t('miscellaneous.haphazardly')).value,
    computed(() => t('miscellaneous.mish_mash')).value,
    computed(() => t('miscellaneous.automatic_painting')).value,
    computed(() => t('miscellaneous.abstract_art')).value,
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('miscellaneous.nature')).value,
    computed(() => t('miscellaneous.animals')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

// defineOgImageComponent('NuxtSeo', {
//   theme: '#4A7C59',
//   colorMode: 'dark',
//   title: computed(() => t('pages.painting.acrylic.abstracts.tab_name')),
//   description: computed(() => t('pages.painting.acrylic.abstracts.meta.content')),
// })

const images: ImageSource[] = [
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting1.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_1.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_1.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_1.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting2.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_2.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_2.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_2.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting3.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_3.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_3.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_3.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting4.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_4.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_4.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_4.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting5.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_5.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_5.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_5.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting6.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_6.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_6.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_6.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting7.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_7.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_7.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_7.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting8.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_8.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_8.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_8.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting9.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_9.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_9.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_9.alt'),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting10.webp',
    title: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_10.title'
    ),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_10.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_10.alt'),
  },
]

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
