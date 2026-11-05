<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const localeHead = useLocaleHead({ seo: true })
const { theme } = useSiteTheme()

useThemeHead()

useHead(() => ({
  htmlAttrs: {
    ...localeHead.value.htmlAttrs,
    'data-theme': theme.value ?? undefined,
  },
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}))
</script>

<style lang="scss" scoped></style>
