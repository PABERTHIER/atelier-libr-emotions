<template>
  <div class="about"></div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: computed(() => t('pages.about.tab_name')),
})
</script>

<style lang="scss" scoped>
.about {
  background: $background;
  padding: 10px;
}
</style>
