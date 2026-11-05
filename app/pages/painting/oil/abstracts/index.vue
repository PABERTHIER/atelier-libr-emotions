<template>
  <article class="oil-artwork-page">
    <h1 class="sr-only">{{ abstractAutumnPaintingTitle }}</h1>
    <figure class="oil-artwork-page__artwork">
      <Image
        src="/paintings/abstract-autumn.webp"
        sizes="sm:150px, md:250px, lg:350px"
        max-height="25rem"
        :title="abstractAutumnPaintingTitle"
        :alt="abstractAutumnPaintingAlt" />
      <figcaption>
        <p class="oil-artwork-page__description">
          {{ t('pictures.paintings.abstract_autumn.description') }}
        </p>
        <p class="oil-artwork-page__summary">
          {{ t('pictures.paintings.abstract_autumn.meta') }}
        </p>
      </figcaption>
    </figure>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n()

const abstractAutumnPaintingTitle = computed(() =>
  t('pictures.paintings.abstract_autumn.title')
)
const abstractAutumnPaintingAlt = computed(() =>
  t('pictures.paintings.abstract_autumn.alt')
)

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
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
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
</style>
