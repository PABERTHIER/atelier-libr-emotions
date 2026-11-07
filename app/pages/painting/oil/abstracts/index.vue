<template>
  <article class="oil-artwork-page">
    <h1 class="sr-only">{{ abstractAutumnPaintingTitle }}</h1>
    <figure class="oil-artwork-page__artwork">
      <ImagePreviewButton
        class="oil-artwork-page__image"
        :image="previewImage"
        @select="openViewer(0, $event)" />
      <figcaption>
        <p class="oil-artwork-page__description">
          {{ t('pictures.paintings.abstract_autumn.description') }}
        </p>
        <p class="oil-artwork-page__summary">
          {{ t('pictures.paintings.abstract_autumn.meta') }}
        </p>
      </figcaption>
    </figure>
    <ImagePreviewModal
      v-if="viewerImage"
      :image="viewerImage"
      :visible="viewerVisible"
      :opener="viewerOpener"
      @close="closeViewer" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()

const abstractAutumnPaintingTitle = computed(() =>
  t('pictures.paintings.abstract_autumn.title')
)
const abstractAutumnPaintingAlt = computed(() =>
  t('pictures.paintings.abstract_autumn.alt')
)

const previewImage = computed<ImageSource>(() => ({
  src: '/paintings/abstract-autumn.webp',
  title: abstractAutumnPaintingTitle.value,
  alt: abstractAutumnPaintingAlt.value,
}))

const { viewerImage, viewerVisible, viewerOpener, openViewer, closeViewer } =
  useImagePreview(() => [previewImage.value])

useHead(usePageSeo('painting_oil_abstracts'))
</script>

<style lang="scss" scoped>
.oil-artwork-page {
  width: 100%;
  min-width: 0;
  max-width: 56.25rem;

  &__artwork {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: var(--color-text);
    margin: 0;
    min-width: 0;
    overflow-wrap: anywhere;

    :deep(img) {
      display: block;
      width: auto;
      max-width: 100%;
      max-height: 25rem;
      height: auto;
      object-fit: contain;
    }
  }

  &__image {
    max-width: min(100%, 150px);
  }

  &__description {
    margin: $space-10 0;
    line-height: 1.6;
  }

  &__summary {
    margin: $space-10 0 0;
    line-height: 1.6;
  }
}

@media (min-width: $md) {
  .oil-artwork-page__image {
    max-width: min(100%, 250px);
  }
}

@media (min-width: $lg) {
  .oil-artwork-page__image {
    max-width: min(100%, 350px);
  }
}
</style>
