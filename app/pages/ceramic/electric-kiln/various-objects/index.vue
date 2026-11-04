<template>
  <article class="gallery-page">
    <header class="gallery-page__header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.ceramic.electric_kiln.various_objects.title')"
        :subtitle="t('pages.ceramic.electric_kiln.various_objects.subtitle')" />
    </header>

    <p class="sr-only">{{ t('pages.gallery.instructions') }}</p>
    <section class="gallery-page__collection" aria-labelledby="boxes-title">
      <h2 id="boxes-title" class="gallery-page__collection-title">
        {{ boxesTitle }}
      </h2>
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

const boxesTitle = computed(() => t('miscellaneous.boxes'))

const imageEntries = [
  ['Boite1.webp', 'boite1'],
  ['Boite2.webp', 'boite2'],
  ['Boite3.webp', 'boite3'],
  ['Boite4.webp', 'boite4'],
  ['Boite5.webp', 'boite5'],
  ['Boite6.webp', 'boite6'],
  ['Boite7.webp', 'boite7'],
  ['Boite8.webp', 'boite8'],
  ['Boite9.webp', 'boite9'],
  ['BoiteOeuf.webp', 'boite_oeuf'],
  ['Sgraffitto1.webp', 'sgraffitto1'],
  ['Sgraffitto2.webp', 'sgraffitto2'],
  ['Sgraffitto3.webp', 'sgraffitto3'],
  ['Sgraffitto4.webp', 'sgraffitto4'],
  ['Sgraffitto5.webp', 'sgraffitto5'],
  ['Sgraffitto6.webp', 'sgraffitto6'],
] as const

const images = computed<ImageSource[]>(() =>
  imageEntries.map(([filename, imageKey]) => ({
    src: `/ceramics/electric_kiln/various_objects/boxes/${filename}`,
    title: t(
      `pictures.ceramics.electric_kiln.various_objects.${imageKey}.title`
    ),
    mobileTitle: t(
      `pictures.ceramics.electric_kiln.various_objects.${imageKey}.mobile_title`
    ),
    alt: t(`pictures.ceramics.electric_kiln.various_objects.${imageKey}.alt`),
  }))
)

const previousPage = computed<PageNavigation>(() => ({
  path: '/ceramic/electric-kiln/vases-and-pots',
  title: t('pages.ceramic.electric_kiln.vases_and_pots.tab_name'),
  description: t('pages.ceramic.electric_kiln.vases_and_pots.subtitle'),
}))

const nextPage = computed<PageNavigation>(() => ({
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}))

useHead(usePageSeo('ceramic_electric_kiln_various_objects'))
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
