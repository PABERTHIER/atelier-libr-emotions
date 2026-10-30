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

useHead(usePageSeo('ceramic_raku_smouldering_nature'))
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
