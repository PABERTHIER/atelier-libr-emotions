<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.painting.acrylic.abstracts.title')"
        :subtitle="t('pages.painting.acrylic.abstracts.subtitle')" />
    </header>

    <section
      class="gallery-page__collection"
      aria-labelledby="collection-title">
      <h2 id="collection-title" class="sr-only">
        {{ t('pages.gallery.collection_title') }}
      </h2>
      <p class="sr-only">{{ t('pages.gallery.instructions') }}</p>
      <ImageGrid
        :images="images"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <PageNavigation :next-page="nextPage" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'

const { t } = useI18n()

const images = computed<ImageSource[]>(() => [
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting1.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_1.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_1.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_1.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_1.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting2.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_2.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_2.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_2.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_2.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting3.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_3.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_3.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_3.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_3.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting4.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_4.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_4.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_4.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_4.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting5.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_5.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_5.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_5.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_5.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting6.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_6.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_6.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_6.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_6.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting7.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_7.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_7.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_7.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_7.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting8.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_8.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_8.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_8.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_8.dimensions'
    ),
  },
  {
    src: '/paintings/acrylic/abstracts/AutomaticPainting9.webp',
    title: t('pictures.paintings.acrylic.abstracts.automatic_painting_9.title'),
    mobileTitle: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_9.mobile_title'
    ),
    alt: t('pictures.paintings.acrylic.abstracts.automatic_painting_9.alt'),
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_9.dimensions'
    ),
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
    dimensions: t(
      'pictures.paintings.acrylic.abstracts.automatic_painting_10.dimensions'
    ),
  },
])

const nextPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}))

useHead(usePageSeo('painting_acrylic_abstracts'))
</script>

<style lang="scss" scoped>
.gallery-page {
  position: relative;
  width: 100%;
  min-width: 0;

  &__header {
    margin-bottom: $space-50;
  }

  &__collection {
    min-width: 0;
  }
}
</style>
