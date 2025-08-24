<template>
  <div class="contact">
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
    <NuxtLink
      :to="instagramLink"
      aria-label="Instagram"
      title="Instagram"
      target="_blank">
      <Icon
        name="ale-icon:instagram"
        size="25px"
        mode="svg"
        aria-hidden="true" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: computed(() => t('pages.contact.tab_name')),
})

const facebookLink = computed(
  () => 'https://www.facebook.com/people/Atelier-LibrEmotions/100063484446329/'
)
const instagramLink = computed(
  () => 'https://www.instagram.com/atelier_libremotions'
)
</script>

<style lang="scss" scoped>
.contact {
  padding: 10px;
}
</style>
