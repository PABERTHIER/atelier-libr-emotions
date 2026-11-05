<template>
  <div class="error-page">
    <a
      class="error-page__skip"
      href="#error-content"
      @click.prevent="focusContent">
      {{ t('error.skip') }}
    </a>
    <header class="error-page__header">
      <a
        :href="homePath"
        :aria-label="`${siteName} — ${t('components.header.logo_link_label')}`"
        class="error-page__brand"
        @click="recover($event, homePath)">
        <img
          class="error-page__logo"
          src="/logo.svg"
          width="48"
          height="48"
          :alt="t('app.logo_alt')" />
        <span>{{ siteName }}</span>
      </a>
    </header>
    <main
      id="error-content"
      ref="content"
      class="error-page__content"
      tabindex="-1">
      <p class="error-page__code">
        {{ t('error.code', { code: statusCode }) }}
      </p>
      <h1 class="error-page__title">{{ t(`error.${errorKind}.heading`) }}</h1>
      <p class="error-page__description">{{ description }}</p>
      <nav class="error-page__actions" :aria-label="t('error.navigation')">
        <a
          :href="homePath"
          class="error-page__action"
          @click="recover($event, homePath)">
          <Icon name="lucide:arrow-left" mode="svg" aria-hidden="true" />
          {{ t('error.home') }}
        </a>
        <a
          :href="galleryPath"
          class="error-page__action"
          @click="recover($event, galleryPath)">
          {{ t('error.gallery') }}
          <Icon name="lucide:arrow-up-right" mode="svg" aria-hidden="true" />
        </a>
      </nav>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { imageDimensions } from '~/data/imageDimensions'
import { pageSeo, robotsContent } from '~/data/seo'
import { siteName } from '~/data/site'

const props = defineProps<{ error: NuxtError }>()

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()
const route = useRoute()
const content = useTemplateRef('content')
const { theme } = useSiteTheme()

useThemeHead()

const statusCode = computed(() => props.error.status || 500)
const errorKind = computed(() =>
  statusCode.value === 404 ? 'not_found' : 'unexpected'
)
const title = computed(() => t(`error.${errorKind.value}.title`))
const description = computed(() => t(`error.${errorKind.value}.description`))
const homePath = computed(() => localePath('/'))
const galleryPath = computed(() =>
  localePath(pageSeo.painting_acrylic_abstracts.path)
)

const imagePath = pageSeo.home.image
const [imageWidth, imageHeight] = imageDimensions[imagePath]!

if (import.meta.server) {
  // Error pages preserve their HTTP status and must never become search results
  useResponseHeader('X-Robots-Tag').value = robotsContent.blocked
}

useSeoMeta({
  robots: robotsContent.blocked,
  description,
  ogTitle: title,
  ogDescription: description,
  ogSiteName: siteName,
  ogType: 'website',
  ogUrl: () => new URL(route.path, site.url).href,
  ogLocale: () => localeProperties.value.language?.replace('-', '_'),
  ogImage: () => new URL(imagePath, site.url).href,
  ogImageAlt: () => t(pageSeo.home.imageAlt),
  ogImageType: 'image/webp',
  ogImageWidth: imageWidth,
  ogImageHeight: imageHeight,
  twitterCard: 'summary_large_image',
})
useHead(() => ({
  title: title.value,
  titleTemplate: '%s',
  htmlAttrs: {
    lang: localeProperties.value.language,
    dir: localeProperties.value.dir || 'ltr',
    'data-theme': theme.value ?? undefined,
  },
}))

function focusContent() {
  content.value?.focus({ preventScroll: true })
  content.value?.scrollIntoView({ behavior: 'instant', block: 'start' })
}

async function recover(event: MouseEvent, path: string) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  event.preventDefault()

  await clearError({ redirect: path })
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100svh;
  padding: calc(#{$space-20} + env(safe-area-inset-top, 0))
    calc(#{$space-20} + env(safe-area-inset-right, 0))
    calc(#{$space-32} + env(safe-area-inset-bottom, 0))
    calc(#{$space-20} + env(safe-area-inset-left, 0));
  background: var(--color-page);
  color: var(--color-text);
  font-family: $body-font;
  line-height: 1.6;
  overflow-wrap: anywhere;

  a:focus-visible {
    outline: $focus-width solid var(--focus-color);
    outline-offset: $space-4;
  }

  &__skip {
    position: fixed;
    top: calc(#{$space-12} + env(safe-area-inset-top, 0));
    left: calc(#{$space-12} + env(safe-area-inset-left, 0));
    z-index: $skip-link-z-index;
    max-width: calc(
      100% -
        #{$space-24} - env(safe-area-inset-left, 0) - env(
          safe-area-inset-right,
          0
        )
    );
    padding: $space-12;
    background: var(--color-surface);
    transform: translateY(-200%);

    &:focus {
      transform: none;
    }
  }

  &__header,
  &__content {
    max-width: 60rem;
    margin-inline: auto;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: $space-12;
    min-height: $control-size;
    color: inherit;
    text-decoration: none;
  }

  &__logo {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
  }

  &__content {
    padding-block: 3rem;
  }

  &__title {
    margin-block: $space-12 $space-20;
    font-size: 2rem;
    line-height: 1.2;
    text-wrap: balance;
  }

  &__code {
    color: var(--color-muted);
  }

  &__description {
    max-width: 52ch;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-16 $space-32;
    margin-top: $space-24;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    gap: $space-8;
    min-height: $control-size;
    color: inherit;
    text-decoration: underline;
    text-underline-offset: $space-4;
  }
}
</style>
