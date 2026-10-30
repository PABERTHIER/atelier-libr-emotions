<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.nature.title')"
        :subtitle="t('pages.ceramic.electric_kiln.nature.subtitle')" />
    </div>

    <h2>{{ flowersTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="flowersImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ leavesSubtitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="leavesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()

const flowersTitle = computed(() => t('miscellaneous.flowers'))
const leavesSubtitle = computed(() => t('miscellaneous.leaves'))

const createImages = (
  entries: readonly (readonly [string, string])[],
  folder: string,
  translationSection: string
): ImageSource[] =>
  entries.map(([filename, imageKey]) => ({
    src: `/ceramics/electric_kiln/nature/${folder}/${filename}`,
    title: t(
      `pictures.ceramics.electric_kiln.nature.${translationSection}.${imageKey}.title`
    ),
    mobileTitle: t(
      `pictures.ceramics.electric_kiln.nature.${translationSection}.${imageKey}.mobile_title`
    ),
    alt: t(
      `pictures.ceramics.electric_kiln.nature.${translationSection}.${imageKey}.alt`
    ),
  }))

const flowersEntries = [
  ...Array.from({ length: 10 }, (_, index) => {
    const number = index + 1
    return [`F${number}.webp`, `f${number}`] as const
  }),
  ...Array.from({ length: 7 }, (_, index) => {
    const number = index + 1
    return [`GF${number}.webp`, `gf${number}`] as const
  }),
]
const leavesEntries = Array.from({ length: 11 }, (_, index) => {
  const number = index + 1
  return [`Feuilles${number}.webp`, `feuilles${number}`] as const
})

const flowersImages = createImages(flowersEntries, 'flowers', 'flowers')
const leavesImages = createImages(leavesEntries, 'leaves', 'leaves')

const previousPage = {
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}

const nextPage = {
  path: '/ceramic/electric-kiln/animals',
  title: t('pages.ceramic.electric_kiln.animals.tab_name'),
  description: t('pages.ceramic.electric_kiln.animals.subtitle'),
}

useHead(usePageSeo('ceramic_electric_kiln_nature'))
</script>

<style lang="scss" scoped>
.gallery-page {
  position: relative;
  width: 100%;

  .page-header {
    margin-bottom: 50px;
  }

  h2 {
    margin: 40px 0 20px;
  }
}
</style>
