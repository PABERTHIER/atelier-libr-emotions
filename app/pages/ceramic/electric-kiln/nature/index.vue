<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.nature.title')"
        :subtitle="t('pages.ceramic.electric_kiln.nature.subtitle')" />
    </header>

    <p class="sr-only">{{ t('pages.gallery.instructions') }}</p>
    <section class="gallery-page__collection" aria-labelledby="flowers-title">
      <h2 id="flowers-title" class="gallery-page__collection-title">
        {{ flowersTitle }}
      </h2>
      <ImageGrid
        :images="flowersImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <section class="gallery-page__collection" aria-labelledby="leaves-title">
      <h2 id="leaves-title" class="gallery-page__collection-title">
        {{ leavesTitle }}
      </h2>
      <ImageGrid
        :images="leavesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'

const { t } = useI18n()

const flowersTitle = computed(() => t('miscellaneous.flowers'))
const leavesTitle = computed(() => t('miscellaneous.leaves'))

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

const flowersImages = computed(() =>
  createImages(flowersEntries, 'flowers', 'flowers')
)
const leavesImages = computed(() =>
  createImages(leavesEntries, 'leaves', 'leaves')
)

const previousPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}))

const nextPage = computed<PageNavigation>(() => ({
  path: '/ceramic/electric-kiln/animals',
  title: t('pages.ceramic.electric_kiln.animals.tab_name'),
  description: t('pages.ceramic.electric_kiln.animals.subtitle'),
}))

useHead(usePageSeo('ceramic_electric_kiln_nature'))
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

  &__collection-title {
    margin: $space-40 0 $space-20;
    font-size: 1.5rem;
    overflow-wrap: anywhere;
  }
}
</style>
