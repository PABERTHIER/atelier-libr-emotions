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

const images: ImageSource[] = [
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

useHead(usePageSeo('painting_inks_nature'))
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
