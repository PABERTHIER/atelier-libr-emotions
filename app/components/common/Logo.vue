<template>
  <div class="logo">
    <!-- TODO: Replace by the logo  -->
    <NuxtImg
      src="paintings/celestial-collision.webp"
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
  max-height: 47px;
}

.logo img {
  max-height: 47px;
}

@media (max-width: $lg) {
  .logo {
    max-height: 40px;
  }

  .logo img {
    max-height: 40px;
  }
}

@media (max-width: $md) {
  .logo {
    max-height: 30px;
  }

  .logo img {
    max-height: 30px;
  }
}

@media (max-width: $sm) {
  .logo {
    max-height: 25px;
  }

  .logo img {
    max-height: 25px;
  }
}
</style>
