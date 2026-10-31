<template>
  <header ref="header" class="site-header">
    <div class="site-header__inner">
      <a class="skip-link" href="#page-container" @click="$emit('skip')">
        {{ t('components.layout.skip') }}
      </a>
      <NuxtLink
        :to="localePath('/')"
        class="site-header__home"
        :aria-label="t('components.header.logo_link_label')"
        @click="closeNavigation">
        <Logo aria-hidden="true" />
      </NuxtLink>
      <Menu />
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits<{ skip: [] }>()

const { t } = useI18n()
const localePath = useLocalePath()
const { closeNavigation } = useSiteNavigation()

const header = useTemplateRef('header')

let observer: ResizeObserver | undefined

function measureHeader() {
  if (header.value) {
    document.documentElement.style.setProperty(
      '--site-header-height',
      `${header.value.offsetHeight}px`
    )
  }
}

onMounted(() => {
  measureHeader()
  observer = new ResizeObserver(measureHeader)

  if (header.value) {
    observer.observe(header.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.documentElement.style.removeProperty('--site-header-height')
})
</script>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  z-index: $header-z-index;
  top: 0;
  padding: calc(#{$shell-gutter} + env(safe-area-inset-top, 0px))
    calc(#{$shell-gutter} + env(safe-area-inset-right, 0px)) 0
    calc(#{$shell-gutter} + env(safe-area-inset-left, 0px));
  background: $background-color;

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    gap: $space-16;
    min-height: $header-bar-min-height;
    padding: $space-8 $space-16;
    background: $white-color;
    box-shadow: $shadow-header;
  }

  &__home {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    min-width: $control-size;
    min-height: $control-size;
    border-radius: $radius-control;
  }
}

.skip-link {
  position: absolute;
  z-index: $skip-link-z-index;
  top: $space-8;
  left: $space-16;
  display: flex;
  align-items: center;
  min-height: calc(100% - #{$space-16});
  max-width: calc(100% - #{$space-32});
  padding: $space-12 $space-16;
  border: 2px solid $primary-text-color;
  border-radius: $radius-control;
  background: $white-color;
  color: $primary-text-color;
  font-weight: 700;
  clip-path: inset(50%);
  pointer-events: none;

  &:focus {
    position: relative;
    top: auto;
    left: auto;
    min-height: $control-size;
    clip-path: none;
    pointer-events: auto;
  }

  &:focus + .site-header__home {
    position: absolute;
    top: 0;
    bottom: 0;
    left: $space-16;
    height: max-content;
    margin-block: auto;
  }
}

@media (max-width: $md), (max-height: $navigation-compact-height) {
  .site-header__inner {
    justify-content: space-between;
    min-height: $control-size;
    padding: $space-8;
  }

  .skip-link {
    left: $space-8;
    max-width: calc(100% - #{$space-16 + $control-size + $space-16});

    &:focus {
      left: auto;
    }

    &:focus + .site-header__home {
      left: $space-8;
    }
  }
}

@media (max-height: 480px) {
  .site-header {
    position: relative;
  }
}
</style>
