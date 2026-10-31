<template>
  <nav class="lang-switcher" :aria-label="changeLanguageLabel">
    <NuxtLink
      v-for="availableLocale in availableLocales"
      :key="availableLocale.code"
      class="lang-switcher__link"
      :class="{
        'lang-switcher__link--active': availableLocale.code === locale,
      }"
      :to="availableLocale.path"
      :lang="availableLocale.language"
      :hreflang="availableLocale.language"
      :aria-label="availableLocale.name"
      :aria-current="availableLocale.code === locale ? 'true' : undefined"
      @click="closeNavigation">
      <span class="lang-switcher__label" aria-hidden="true">
        {{ availableLocale.code.toUpperCase() }}
      </span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const { locale, locales, t } = useI18n()
const { closeNavigation } = useSiteNavigation()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  locales.value.map(localeInfo => ({
    code: localeInfo.code,
    name: localeInfo.name,
    language: localeInfo.language,
    path: switchLocalePath(localeInfo.code).replace(/#.*$/, ''),
  }))
)

const changeLanguageLabel = computed(() =>
  t('components.lang_switcher.change_language_label')
)
</script>

<style lang="scss" scoped>
@use 'sass:color';

.lang-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;

  &::before {
    position: absolute;
    inset-block: calc((100% - #{$lang-switcher-frame-height}) / 2);
    inset-inline: $space-2;
    border: $border-width solid rgba($gold-color, 0.35);
    border-radius: $radius-pill;
    background: rgba($warm-beige, 0.5);
    pointer-events: none;
    content: '';
  }

  &__link {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: $control-size;
    min-height: $control-size;
    color: $navigation-muted-color;
    border-radius: $radius-pill;
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: color $transition-ui;

    &:hover {
      color: $primary-text-color;
    }
  }

  &__label {
    padding: $space-5 $space-10;
    border-radius: $radius-pill;
  }

  &__link--active,
  &__link--active:hover {
    color: color.adjust($primary-text-color, $lightness: -5%);
    cursor: default;

    .lang-switcher__label {
      background: linear-gradient(120deg, $gold-color, $copper-color);
      box-shadow: 0 $space-2 $space-12 rgba($gold-color, 0.3);
    }
  }
}

@media (forced-colors: active) {
  .lang-switcher__link--active .lang-switcher__label {
    border: $border-width solid Highlight;
  }
}
</style>
