<template>
  <div class="lang-switcher">
    <NuxtLink v-for="availableLocale in availableLocales" :key="availableLocale.code" :to="switchLocalePath(availableLocale.code)">
      {{ availableLocale.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(l => l.code !== locale.value)
})

</script>

<style lang="scss" scoped></style>
