<template>
  <div>
    <NuxtImg sizes="sm:200px, md:350px, lg:500px" src="/paintings/abstract_autumn.jpg" :alt="abstractAutumnPaintingAlt" :title="abstractAutumnPaintingTitle" />
    <div v-t="'pages.main.abstract_autumn_painting.description'" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('pages.main.tab_name'),
  meta: [
    { name: 'description', content: t('app.meta.description') },
    { property: 'og:title', content: t('pages.main.tab_name') }
  ],
})

const abstractAutumnPaintingTitle = t('pages.main.abstract_autumn_painting.title')
const abstractAutumnPaintingAlt = t('pages.main.abstract_autumn_painting.alt')
const abstractAutumnPaintingMeta = t('pages.main.abstract_autumn_painting.meta')
</script>

<style lang="scss" scoped>
</style>
