<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.animals.title')"
        :subtitle="t('pages.ceramic.electric_kiln.animals.subtitle')" />
    </div>

    <h2>{{ catsTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="catsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ snailsTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="snailsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ birdsTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="birdsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <h2>{{ tortoisesTitle }}</h2>
    <div class="gallery-container">
      <ImageGrid
        :images="tortoisesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()

const catsTitle = computed(() => t('miscellaneous.cats'))
const snailsTitle = computed(() => t('miscellaneous.snails'))
const birdsTitle = computed(() => t('miscellaneous.birds'))
const tortoisesTitle = computed(() => t('miscellaneous.tortoises'))

const createImages = (
  entries: readonly (readonly [string, string])[],
  folder: string,
  translationSection: string
): ImageSource[] =>
  entries.map(([filename, imageKey]) => ({
    src: `/ceramics/electric_kiln/animals/${folder}/${filename}`,
    title: t(
      `pictures.ceramics.electric_kiln.animals.${translationSection}.${imageKey}.title`
    ),
    mobileTitle: t(
      `pictures.ceramics.electric_kiln.animals.${translationSection}.${imageKey}.mobile_title`
    ),
    alt: t(
      `pictures.ceramics.electric_kiln.animals.${translationSection}.${imageKey}.alt`
    ),
  }))

const createEntries = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => {
    const number = index + 1
    return [
      `${prefix}${number}.webp`,
      `${prefix.toLowerCase()}${number}`,
    ] as const
  })

const catsImages = createImages(createEntries('Cats', 15), 'cats', 'cats')
const snailsImages = createImages(
  createEntries('Snails', 8),
  'snails',
  'snails'
)
const birdsImages = createImages(createEntries('Birds', 14), 'birds', 'birds')
const tortoisesImages = createImages(
  createEntries('Tortoises', 8),
  'tortoises',
  'tortoises'
)

const previousPage = {
  path: '/ceramic/electric-kiln/nature',
  title: t('pages.ceramic.electric_kiln.nature.tab_name'),
  description: t('pages.ceramic.electric_kiln.nature.subtitle'),
}

const nextPage = {
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}

useHead(usePageSeo('ceramic_electric_kiln_animals'))
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
