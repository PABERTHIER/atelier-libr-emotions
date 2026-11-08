<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.animals.title')"
        :subtitle="t('pages.ceramic.electric_kiln.animals.subtitle')" />
      <GalleryArtistNote
        :text="t('pages.ceramic.electric_kiln.animals.description')" />
    </header>

    <p class="sr-only">{{ t('pages.gallery.instructions') }}</p>
    <section class="gallery-page__collection" aria-labelledby="cats-title">
      <h2 id="cats-title" class="gallery-page__collection-title">
        {{ catsTitle }}
      </h2>
      <ImageGrid
        :images="catsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <section class="gallery-page__collection" aria-labelledby="snails-title">
      <h2 id="snails-title" class="gallery-page__collection-title">
        {{ snailsTitle }}
      </h2>
      <ImageGrid
        :images="snailsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <section class="gallery-page__collection" aria-labelledby="birds-title">
      <h2 id="birds-title" class="gallery-page__collection-title">
        {{ birdsTitle }}
      </h2>
      <ImageGrid
        :images="birdsImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <section class="gallery-page__collection" aria-labelledby="tortoises-title">
      <h2 id="tortoises-title" class="gallery-page__collection-title">
        {{ tortoisesTitle }}
      </h2>
      <ImageGrid
        :images="tortoisesImages"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'

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

const catsImages = computed(() =>
  createImages(createEntries('Cats', 15), 'cats', 'cats')
)
const snailsImages = computed(() =>
  createImages(createEntries('Snails', 8), 'snails', 'snails')
)
const birdsImages = computed(() =>
  createImages(createEntries('Birds', 14), 'birds', 'birds')
)
const tortoisesImages = computed(() =>
  createImages(createEntries('Tortoises', 8), 'tortoises', 'tortoises')
)

const previousPage = computed<PageNavigation>(() => ({
  path: '/ceramic/electric-kiln/nature',
  title: t('pages.ceramic.electric_kiln.nature.tab_name'),
  description: t('pages.ceramic.electric_kiln.nature.subtitle'),
}))

const nextPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}))

useHead(usePageSeo('ceramic_electric_kiln_animals'))
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
