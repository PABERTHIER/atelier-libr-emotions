<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.painting.inks.nature.title')"
        :subtitle="t('pages.painting.inks.nature.subtitle')" />
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

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'

const { t } = useI18n()

const images = computed<ImageSource[]>(() => [
  {
    src: '/paintings/inks/nature/EC1.webp',
    title: t('pictures.paintings.inks.nature.ec1.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec1.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec1.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec1.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC2.webp',
    title: t('pictures.paintings.inks.nature.ec2.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec2.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec2.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec2.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC3.webp',
    title: t('pictures.paintings.inks.nature.ec3.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec3.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec3.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec3.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC4.webp',
    title: t('pictures.paintings.inks.nature.ec4.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec4.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec4.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec4.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC5.webp',
    title: t('pictures.paintings.inks.nature.ec5.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec5.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec5.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec5.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC6.webp',
    title: t('pictures.paintings.inks.nature.ec6.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec6.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec6.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec6.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC7.webp',
    title: t('pictures.paintings.inks.nature.ec7.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec7.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec7.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec7.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC8.webp',
    title: t('pictures.paintings.inks.nature.ec8.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec8.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec8.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec8.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC9.webp',
    title: t('pictures.paintings.inks.nature.ec9.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec9.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec9.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec9.dimensions'),
  },
  {
    src: '/paintings/inks/nature/EC10.webp',
    title: t('pictures.paintings.inks.nature.ec10.title'),
    mobileTitle: t('pictures.paintings.inks.nature.ec10.mobile_title'),
    alt: t('pictures.paintings.inks.nature.ec10.alt'),
    dimensions: t('pictures.paintings.inks.nature.ec10.dimensions'),
  },
])

const previousPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}))

const nextPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}))

useHead(usePageSeo('painting_inks_nature'))
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
