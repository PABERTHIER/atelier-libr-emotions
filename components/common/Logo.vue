<template>
  <div class="logo">
    <!-- TODO: Replace by the logo  -->
    <!-- <NuxtImg src="paintings/celestial-collision.jpg" :title="logoTitle" :alt="logoAlt" sizes="sm:20px, md:30px, lg:40px" densities="x1 x2" /> -->
    <Image src="/paintings/celestial-collision.jpg" :title="logoTitle" :alt="logoAlt" sizes="sm:20px, md:30px, lg:40px" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const logoTitle = computed(() => t('pages.main.tab_name'))
const logoAlt = computed(() => t('app.logo_alt'))
</script>

<style lang="scss" scoped></style>
