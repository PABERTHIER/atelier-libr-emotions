<template>
  <div class="oil-abstracts">
    <div class="abstract-autumn-container">
      <Image
        src="/paintings/abstract-autumn.jpg"
        sizes="sm:200px, md:350px, lg:500px"
        max-height="500px"
        :title="abstractAutumnPaintingTitle"
        :alt="abstractAutumnPaintingAlt" />
      <div class="description">
        {{ t('pages.main.abstract_autumn_painting.description') }}
      </div>
      <div>{{ t('pages.main.abstract_autumn_painting.meta') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const abstractAutumnPaintingTitle = computed(() =>
  t('pages.main.abstract_autumn_painting.title')
)
const abstractAutumnPaintingAlt = computed(() =>
  t('pages.main.abstract_autumn_painting.alt')
)
</script>

<style lang="scss" scoped>
.oil-abstracts {
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
