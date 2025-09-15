<template>
  <div class="about"></div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: computed(() => t('pages.about.tab_name')),
  meta: [
    { name: 'description', content: computed(() => t('app.meta.description')) },
  ],
})
</script>

<style lang="scss" scoped></style>
