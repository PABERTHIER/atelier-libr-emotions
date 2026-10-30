<template>
  <div class="wip">
    <Image
      src="/wip.gif"
      :alt="t('wip.image_alt')"
      sizes="sm:400px, md:700px, lg:1000px" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead(usePageSeo('wip'))
</script>

<style lang="scss" scoped></style>
