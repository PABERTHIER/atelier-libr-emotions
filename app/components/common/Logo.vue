<template>
  <div class="logo">
    <NuxtImg
      src="logo.svg"
      :title="logoTitle"
      :alt="logoAlt"
      sizes="xs:20px, sm:30px, md:35px, lg:40px"
      densities="x1 x2" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const logoTitle = computed(() => t('pages.main.tab_name'))
const logoAlt = computed(() => t('app.logo_alt'))
</script>

<style lang="scss" scoped>
.logo {
  max-height: $logo-size-desktop;
}

.logo :deep(img) {
  display: block;
  width: auto;
  max-height: $logo-size-desktop;
}

@media (max-width: $lg) {
  .logo {
    max-height: $space-40;
  }

  .logo :deep(img) {
    max-height: $space-40;
  }
}

@media (max-width: $md) {
  .logo {
    max-height: $space-30;
  }

  .logo :deep(img) {
    max-height: $space-30;
  }
}

@media (max-width: $sm) {
  .logo {
    max-height: $space-25;
  }

  .logo :deep(img) {
    max-height: $space-25;
  }
}
</style>
