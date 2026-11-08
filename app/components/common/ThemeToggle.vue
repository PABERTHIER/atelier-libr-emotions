<template>
  <button
    class="theme-toggle"
    type="button"
    :data-tooltip="themeLabel"
    @click="toggleTheme">
    <span class="theme-toggle__frame">
      <span class="theme-toggle__icons" aria-hidden="true">
        <Icon class="theme-toggle__moon" name="lucide:moon" mode="svg" />
        <Icon class="theme-toggle__sun" name="lucide:sun" mode="svg" />
      </span>
      <span>
        {{ themeLabel }}
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()

const { theme, setTheme } = useSiteTheme()

const systemDark = ref(false)

const isDark = computed(
  () => theme.value === 'dark' || (theme.value === null && systemDark.value)
)

const themeLabel = computed(() =>
  t(
    isDark.value
      ? 'components.theme_toggle.light'
      : 'components.theme_toggle.dark'
  )
)

let colorScheme: MediaQueryList | undefined

onMounted(() => {
  colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark.value = colorScheme.matches
  colorScheme.addEventListener('change', handleSystemTheme)
})

onBeforeUnmount(() => {
  colorScheme?.removeEventListener('change', handleSystemTheme)
})

function handleSystemTheme(event: MediaQueryListEvent) {
  systemDark.value = event.matches
}

function toggleTheme() {
  setTheme(isDark.value ? 'light' : 'dark')
}
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: $control-size;
  padding: $space-6 0;
  border: 0;
  border-radius: $radius-pill;
  background: transparent;
  color: var(--color-text);
  font-size: 0.8125rem;
  line-height: 1.4;

  &__frame {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $space-8;
    min-height: $lang-switcher-frame-height;
    padding: $space-4 $space-12;
    border: $border-width solid var(--color-border);
    border-radius: inherit;
    background: var(--color-surface-soft);
  }

  &:hover &__frame {
    border-color: var(--color-accent);
    background: var(--color-hover);
  }

  &__icons {
    display: grid;
    flex: none;
    place-items: center;
    width: $space-18;
    height: $space-18;
    color: var(--color-accent);

    .iconify {
      grid-area: 1 / 1;
      width: 100%;
      height: 100%;
    }
  }

  &__moon {
    visibility: var(--theme-moon-visibility);
  }

  &__sun {
    visibility: var(--theme-sun-visibility);
  }
}

@media (scripting: none) {
  .theme-toggle {
    display: none;
  }
}

@media (forced-colors: active) {
  .theme-toggle__frame {
    border-color: ButtonText;
  }
}
</style>
