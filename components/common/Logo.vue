<template>
  <div class="logo">
    <!-- TODO: Replace by the logo  -->
    <NuxtImg src="paintings/celestial-collision.jpg" :title="logoTitle" :alt="logoAlt" sizes="sm:20px, md:35px, lg:50px" densities="x1 x2" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const logoTitle = t('pages.main.tab_name')
const logoAlt = t('app.logo_alt')
</script>

<style lang="scss" scoped></style>
