<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.raku_and_smouldering.nature.title')"
        :subtitle="t('pages.ceramic.raku_and_smouldering.nature.subtitle')" />
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
const urlEndPath = 'ceramic/raku-smouldering/nature'
const ogImageEndPath = 'ceramics/raku_smouldering/nature/FR1.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() =>
    t('pages.ceramic.raku_and_smouldering.nature.tab_name')
  ),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.ceramic.raku_and_smouldering.nature.meta.content')
      ),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.ceramic')).value},
        ${computed(() => t('miscellaneous.ceramicist')).value},
        ${computed(() => t('miscellaneous.raku_and_smouldering')).value},
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
    t('pages.ceramic.raku_and_smouldering.nature.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.ceramic.raku_and_smouldering.nature.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() =>
    t('pages.ceramic.raku_and_smouldering.nature.meta.content')
  ),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() =>
    t('pages.ceramic.raku_and_smouldering.nature.meta.content')
  ),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() =>
    t('pages.ceramic.raku_and_smouldering.nature.meta.content')
  ),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.ceramic')).value,
    computed(() => t('miscellaneous.ceramicist')).value,
    computed(() => t('miscellaneous.raku_and_smouldering')).value,
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
//   title: computed(() => t('pages.ceramic.raku_and_smouldering.nature.tab_name')),
//   description: computed(() => t('pages.ceramic.raku_and_smouldering.nature.meta.content')),
// })

const images: ImageSource[] = [
  {
    src: '/ceramics/raku_smouldering/nature/FR1.webp',
    title: t('pictures.ceramics.raku_smouldering.nature.fr1.title'),
    mobileTitle: t(
      'pictures.ceramics.raku_smouldering.nature.fr1.mobile_title'
    ),
    alt: t('pictures.ceramics.raku_smouldering.nature.fr1.alt'),
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
