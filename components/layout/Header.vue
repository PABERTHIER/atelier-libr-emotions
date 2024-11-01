<template>
  <div class="header-container">
    <div class="header">
      <div :class="logoContainerClass">
        <NuxtLink :to="localePath('/')">
          <Logo />
        </NuxtLink>
      </div>
      <Menu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScreenSize } from '~/composables/screen-size'

const localePath = useLocalePath()
const device = useScreenSize()

const logoContainerClass = computed(() => {
  return device.isMobile.value ? 'logo-container-mobile' : 'logo-container'
})
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  margin-bottom: 20px;
  background-color: $background-color;
  box-shadow: 0 2px 8px $box-shadow-color;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    .logo-container {
      padding: 15px;
      order: 0;
    }

    .logo-container-mobile {
      order: 2;
    }
  }
}
</style>
