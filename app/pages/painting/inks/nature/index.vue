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

// TODO: Update
// Quelques mots clés : Nature, paysage, racines, arbres, eau
// Description en 2 ou 3 phrases (optionnel) : Jeu d’encres et d’eau
// TODO: Set up SEO for this page
useHead({
  title: computed(() => t('pages.painting.inks.nature.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.painting.inks.nature.meta.content')),
    },
  ],
})

const images: ImageSource[] = [
  {
    src: '/paintings/inks/nature/EC1.webp',
    title: t('pictures.paintings.inks.nature.ec1.title'),
    alt: t('pictures.paintings.inks.nature.ec1.alt'),
  },
  {
    src: '/paintings/inks/nature/EC2.webp',
    title: t('pictures.paintings.inks.nature.ec2.title'),
    alt: t('pictures.paintings.inks.nature.ec2.alt'),
  },
  {
    src: '/paintings/inks/nature/EC3.webp',
    title: t('pictures.paintings.inks.nature.ec3.title'),
    alt: t('pictures.paintings.inks.nature.ec3.alt'),
  },
  {
    src: '/paintings/inks/nature/EC4.webp',
    title: t('pictures.paintings.inks.nature.ec4.title'),
    alt: t('pictures.paintings.inks.nature.ec4.alt'),
  },
  {
    src: '/paintings/inks/nature/EC5.webp',
    title: t('pictures.paintings.inks.nature.ec5.title'),
    alt: t('pictures.paintings.inks.nature.ec5.alt'),
  },
  {
    src: '/paintings/inks/nature/EC6.webp',
    title: t('pictures.paintings.inks.nature.ec6.title'),
    alt: t('pictures.paintings.inks.nature.ec6.alt'),
  },
  {
    src: '/paintings/inks/nature/EC7.webp',
    title: t('pictures.paintings.inks.nature.ec7.title'),
    alt: t('pictures.paintings.inks.nature.ec7.alt'),
  },
  {
    src: '/paintings/inks/nature/EC8.webp',
    title: t('pictures.paintings.inks.nature.ec8.title'),
    alt: t('pictures.paintings.inks.nature.ec8.alt'),
  },
  {
    src: '/paintings/inks/nature/EC9.webp',
    title: t('pictures.paintings.inks.nature.ec9.title'),
    alt: t('pictures.paintings.inks.nature.ec9.alt'),
  },
  {
    src: '/paintings/inks/nature/EC10.webp',
    title: t('pictures.paintings.inks.nature.ec10.title'),
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
