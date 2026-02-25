<template>
  <div class="oil-abstracts">
    <div class="abstract-autumn-container">
      <Image
        src="/paintings/abstract-autumn.webp"
        sizes="sm:150px, md:250px, lg:350px"
        max-height="400px"
        :title="abstractAutumnPaintingTitle"
        :alt="abstractAutumnPaintingAlt" />
      <div class="description">
        {{ t('pictures.paintings.abstract_autumn.description') }}
      </div>
      <div>{{ t('pictures.paintings.abstract_autumn.meta') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const abstractAutumnPaintingTitle = computed(() =>
  t('pictures.paintings.abstract_autumn.title')
)
const abstractAutumnPaintingAlt = computed(() =>
  t('pictures.paintings.abstract_autumn.alt')
)
</script>

<style lang="scss" scoped>
.oil-abstracts {
  height: 100%;
  width: 100%;

  .abstract-autumn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: $primary-text-color;

    .description {
      margin: 10px 0px;
    }
  }
}
</style>
