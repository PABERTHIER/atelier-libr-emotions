<template>
  <div class="about">
    <NuxtLink
      to="https://www.facebook.com/people/Atelier-LibrEmotions/100063484446329/">
      {{ 'Facebook' }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: computed(() => t('pages.about.tab_name')),
})
</script>

<style lang="scss" scoped>
.about {
  height: 100%;
  background: $background;
  padding: 10px;
}
</style>
