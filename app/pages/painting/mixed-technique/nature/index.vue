<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.painting.mixed_technique.nature.title')"
        :subtitle="t('pages.painting.mixed_technique.nature.subtitle')" />
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

const images: ImageSource[] = Array.from({ length: 14 }, (_, index) => {
  const imageNumber = index + 1
  const imageKey = `tmn${imageNumber}`

  return {
    src: `/paintings/mixed_technique/nature/TMn${imageNumber}.webp`,
    title: t(`pictures.paintings.mixed_technique.nature.${imageKey}.title`),
    mobileTitle: t(
      `pictures.paintings.mixed_technique.nature.${imageKey}.mobile_title`
    ),
    alt: t(`pictures.paintings.mixed_technique.nature.${imageKey}.alt`),
    dimensions: t(
      `pictures.paintings.mixed_technique.nature.${imageKey}.dimensions`
    ),
  }
})

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

useHead(usePageSeo('painting_mixed_technique_nature'))
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
