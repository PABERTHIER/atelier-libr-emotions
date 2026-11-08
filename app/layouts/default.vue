<template>
  <div class="site-layout">
    <Welcome v-if="showWelcome" />
    <Header @skip="focusMain" />
    <main id="page-container" ref="main" class="site-main" tabindex="-1">
      <div class="page-content">
        <slot />
      </div>
    </main>
    <Footer />
    <SiteTooltip />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const main = useTemplateRef('main')

// Only introduce an initial homepage visit; never replay after navigation
const showWelcome = ref(getRouteBaseName(route) === 'index')

watch(
  () => route.path,
  () => {
    showWelcome.value = false
  }
)

function focusMain() {
  main.value?.focus({ preventScroll: true })
}
</script>

<style lang="scss" scoped>
.site-layout {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

.site-main {
  display: flex;
  flex: 1;
  min-width: 0;
}

.page-content {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  justify-content: center;
  padding: $shell-gutter;
  padding-inline: calc(#{$shell-gutter} + env(safe-area-inset-left, 0px))
    calc(#{$shell-gutter} + env(safe-area-inset-right, 0px));
}
</style>
