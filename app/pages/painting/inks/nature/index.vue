<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.painting.inks.nature.title')"
        :subtitle="t('pages.painting.inks.nature.subtitle')" />
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
const urlEndPath = 'painting/inks/nature'
const ogImageEndPath = 'paintings/inks/nature/EC10.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.painting.inks.nature.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.painting.inks.nature.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.painting')).value},
        ${computed(() => t('miscellaneous.painter')).value},
        ${computed(() => t('miscellaneous.inks')).value},
        ${computed(() => t('miscellaneous.indian_inks')).value},
        ${computed(() => t('miscellaneous.abstracts')).value},
        ${computed(() => t('miscellaneous.abstract_art')).value},
        ${computed(() => t('miscellaneous.art')).value},
        ${computed(() => t('miscellaneous.artist')).value},
        ${computed(() => t('miscellaneous.emotions')).value},
        ${computed(() => t('miscellaneous.nature')).value},
        ${computed(() => t('miscellaneous.landscape')).value},
        ${computed(() => t('miscellaneous.roots')).value},
        ${computed(() => t('miscellaneous.trees')).value},
        ${computed(() => t('miscellaneous.water')).value},
        ${computed(() => t('miscellaneous.water_jet')).value},
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
  description: computed(() => t('pages.painting.inks.nature.meta.content')),
  ogDescription: computed(() => t('pages.painting.inks.nature.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.painting.inks.nature.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() =>
    t('pages.painting.inks.nature.meta.content')
  ),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.painting.inks.nature.meta.content')),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.painting')).value,
    computed(() => t('miscellaneous.painter')).value,
    computed(() => t('miscellaneous.inks')).value,
    computed(() => t('miscellaneous.indian_inks')).value,
    computed(() => t('miscellaneous.abstracts')).value,
    computed(() => t('miscellaneous.abstract_art')).value,
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('miscellaneous.nature')).value,
    computed(() => t('miscellaneous.landscape')).value,
    computed(() => t('miscellaneous.roots')).value,
    computed(() => t('miscellaneous.trees')).value,
    computed(() => t('miscellaneous.water')).value,
    computed(() => t('miscellaneous.water_jet')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

// defineOgImageComponent('NuxtSeo', {
//   theme: '#4A7C59',
//   colorMode: 'dark',
//   title: computed(() => t('pages.painting.inks.nature.tab_name')),
//   description: computed(() => t('pages.painting.inks.nature.meta.content')),
// })

const images: ImageSource[] = [
  {
    src: '/paintings/inks/nature/EC1.webp',
    title: t('pictures.paintings.inks.nature.ec1.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec1.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec1.alt'),
  },
  {
    src: '/paintings/inks/nature/EC2.webp',
    title: t('pictures.paintings.inks.nature.ec2.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec2.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec2.alt'),
  },
  {
    src: '/paintings/inks/nature/EC3.webp',
    title: t('pictures.paintings.inks.nature.ec3.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec3.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec3.alt'),
  },
  {
    src: '/paintings/inks/nature/EC4.webp',
    title: t('pictures.paintings.inks.nature.ec4.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec4.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec4.alt'),
  },
  {
    src: '/paintings/inks/nature/EC5.webp',
    title: t('pictures.paintings.inks.nature.ec5.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec5.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec5.alt'),
  },
  {
    src: '/paintings/inks/nature/EC6.webp',
    title: t('pictures.paintings.inks.nature.ec6.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec6.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec6.alt'),
  },
  {
    src: '/paintings/inks/nature/EC7.webp',
    title: t('pictures.paintings.inks.nature.ec7.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec7.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec7.alt'),
  },
  {
    src: '/paintings/inks/nature/EC8.webp',
    title: t('pictures.paintings.inks.nature.ec8.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec8.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec8.alt'),
  },
  {
    src: '/paintings/inks/nature/EC9.webp',
    title: t('pictures.paintings.inks.nature.ec9.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec9.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec9.alt'),
  },
  {
    src: '/paintings/inks/nature/EC10.webp',
    title: t('pictures.paintings.inks.nature.ec10.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec10.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec10.alt'),
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
