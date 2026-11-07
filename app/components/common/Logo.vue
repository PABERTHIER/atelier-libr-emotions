<template>
  <div class="logo">
    <Image
      :skeleton="false"
      src="/logo.svg"
      :alt="t('app.logo_alt')"
      loading="eager" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
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
