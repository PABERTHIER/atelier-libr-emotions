<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.vases_and_pots.title')"
        :subtitle="t('pages.ceramic.electric_kiln.vases_and_pots.subtitle')" />
    </div>

    <h2>{{ intuitivePotsTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="intuitivePotsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ singleFlowerVasesTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="singleFlowerVasesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ roundVasesTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="roundVasesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()

const intuitivePotsTitle = computed(() => t('miscellaneous.intuitive_pots'))
const singleFlowerVasesTitle = computed(() =>
  t('miscellaneous.single_flower_vases')
)
const roundVasesTitle = computed(() => t('miscellaneous.round_vases'))

const createImages = (
  entries: readonly (readonly [string, string])[],
  folder: string,
  translationSection: string
): ImageSource[] =>
  entries.map(([filename, imageKey]) => ({
    src: `/ceramics/electric_kiln/vases_and_pots/${folder}/${filename}`,
    title: t(
      `pictures.ceramics.electric_kiln.vases_and_pots.${translationSection}.${imageKey}.title`
    ),
    mobileTitle: t(
      `pictures.ceramics.electric_kiln.vases_and_pots.${translationSection}.${imageKey}.mobile_title`
    ),
    alt: t(
      `pictures.ceramics.electric_kiln.vases_and_pots.${translationSection}.${imageKey}.alt`
    ),
  }))

const intuitivePotsEntries = Array.from({ length: 15 }, (_, index) => {
  const number = index + 1
  return [`PotsIntuitifs${number}.webp`, `pots_intuitifs${number}`] as const
})
const singleFlowerVasesEntries = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1
  return [`Soliflores${number}.webp`, `soliflores${number}`] as const
})
const roundVasesEntries = Array.from({ length: 6 }, (_, index) => {
  const number = index + 1
  return [`VasesRonds${number}.webp`, `vases_ronds${number}`] as const
})

const intuitivePotsImages = createImages(
  intuitivePotsEntries,
  'intuitive_pots',
  'intuitive_pots'
)
const singleFlowerVasesImages = createImages(
  singleFlowerVasesEntries,
  'single_flower_vases',
  'single_flower_vases'
)
const roundVasesImages = createImages(
  roundVasesEntries,
  'round_vases',
  'round_vases'
)

const previousPage = {
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}

const nextPage = {
  path: '/ceramic/electric-kiln/various-objects',
  title: t('pages.ceramic.electric_kiln.various_objects.tab_name'),
  description: t('pages.ceramic.electric_kiln.various_objects.subtitle'),
}

useHead(usePageSeo('ceramic_electric_kiln_vases_and_pots'))
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
