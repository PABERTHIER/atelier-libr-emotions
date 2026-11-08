<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.painting.mixed_technique.nature.title')"
        :subtitle="t('pages.painting.mixed_technique.nature.subtitle')" />
      <GalleryArtistNote
        :text="t('pages.painting.mixed_technique.nature.description')" />
    </header>

    <section
      class="gallery-page__collection"
      aria-labelledby="collection-title">
      <h2 id="collection-title" class="sr-only">
        {{ t('pages.gallery.collection_title') }}
      </h2>
      <p class="sr-only">{{ t('pages.gallery.instructions') }}</p>
      <ImageGrid
        :images="images"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </section>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'

const { t } = useI18n()

const images = computed<ImageSource[]>(() =>
  Array.from({ length: 14 }, (_, index) => {
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
)

const previousPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}))

const nextPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}))

useHead(usePageSeo('painting_mixed_technique_nature'))
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
}
</style>
