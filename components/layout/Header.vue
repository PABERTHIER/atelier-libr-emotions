<template>
  <div class="header-container">
    <div class="header">
      <ClientOnly>
        <div class="menu-container">
          <div :class="logoContainerClass">
            <NuxtLink :to="localePath('/')">
              <Logo />
            </NuxtLink>
          </div>
          <Menu />
        </div>
      </ClientOnly>
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
  background-color: $background-color;
  box-shadow: 0 2px 8px $box-shadow-color;

  .header {
    padding: 10px 14px;

    .menu-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo-container {
        order: 0;
      }
  
      .logo-container-mobile {
        order: 2;
      }
    }
  }
}
</style>
