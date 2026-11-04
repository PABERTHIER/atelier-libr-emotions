<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.vases_and_pots.title')"
        :subtitle="t('pages.ceramic.electric_kiln.vases_and_pots.subtitle')" />
    </header>

    <p class="sr-only">{{ t('pages.gallery.instructions') }}</p>
    <section class="gallery-page__collection" aria-labelledby="pots-title">
      <h2 id="pots-title" class="gallery-page__collection-title">
        {{ intuitivePotsTitle }}
      </h2>
      <ImageGrid
        :images="intuitivePotsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <section
      class="gallery-page__collection"
      aria-labelledby="soliflores-title">
      <h2 id="soliflores-title" class="gallery-page__collection-title">
        {{ singleFlowerVasesTitle }}
      </h2>
      <ImageGrid
        :images="singleFlowerVasesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <section class="gallery-page__collection" aria-labelledby="vases-title">
      <h2 id="vases-title" class="gallery-page__collection-title">
        {{ roundVasesTitle }}
      </h2>
      <ImageGrid
        :images="roundVasesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'

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

const intuitivePotsImages = computed(() =>
  createImages(intuitivePotsEntries, 'intuitive_pots', 'intuitive_pots')
)
const singleFlowerVasesImages = computed(() =>
  createImages(
    singleFlowerVasesEntries,
    'single_flower_vases',
    'single_flower_vases'
  )
)
const roundVasesImages = computed(() =>
  createImages(roundVasesEntries, 'round_vases', 'round_vases')
)

const previousPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}))

const nextPage = computed<PageNavigation>(() => ({
  path: '/ceramic/electric-kiln/various-objects',
  title: t('pages.ceramic.electric_kiln.various_objects.tab_name'),
  description: t('pages.ceramic.electric_kiln.various_objects.subtitle'),
}))

useHead(usePageSeo('ceramic_electric_kiln_vases_and_pots'))
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
