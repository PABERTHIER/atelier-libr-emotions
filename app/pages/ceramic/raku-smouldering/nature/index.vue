<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.raku_and_smouldering.nature.title')"
        :subtitle="t('pages.ceramic.raku_and_smouldering.nature.subtitle')" />
      <GalleryArtistNote
        :text="t('pages.ceramic.raku_and_smouldering.nature.description')" />
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

const images = computed<ImageSource[]>(() => [
  {
    src: '/ceramics/raku_smouldering/nature/FR1.webp',
    title: t('pictures.ceramics.raku_smouldering.nature.fr1.title'),
    mobileTitle: t(
      'pictures.ceramics.raku_smouldering.nature.fr1.mobile_title'
    ),
    alt: t('pictures.ceramics.raku_smouldering.nature.fr1.alt'),
  },
])

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

useHead(usePageSeo('ceramic_raku_smouldering_nature'))
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
