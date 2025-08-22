<template>
  <div class="about">
    <NuxtLink
      :to="facebookLink"
      aria-label="Facebook"
      title="Facebook"
      target="_blank">
      <Icon
        name="ale-icon:facebook"
        size="25px"
        mode="svg"
        aria-hidden="true" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: computed(() => t('pages.about.tab_name')),
})

const facebookLink = computed(
  () => 'https://www.facebook.com/people/Atelier-LibrEmotions/100063484446329/'
)
</script>

<style lang="scss" scoped>
.about {
  height: 100%;
  background: $background;
  padding: 10px;
}
</style>
