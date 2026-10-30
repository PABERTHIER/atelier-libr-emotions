<template>
  <div class="error-page">
    <a class="error-page__skip" href="#error-content">{{ t('error.skip') }}</a>
    <header class="error-page__header">
      <a
        :href="homePath"
        :aria-label="t('components.header.logo_link_label')"
        class="error-page__brand"
        @click.prevent="recover(homePath)">
        <img src="/logo.svg" width="48" height="48" :alt="t('app.logo_alt')" />
        <span>{{ siteName }}</span>
      </a>
    </header>
    <main id="error-content" class="error-page__content" tabindex="-1">
      <p class="error-page__code">
        {{ t('error.code', { code: statusCode }) }}
      </p>
      <h1>{{ t(`error.${errorKind}.heading`) }}</h1>
      <p class="error-page__description">{{ description }}</p>
      <nav class="error-page__actions" :aria-label="t('error.home')">
        <a :href="homePath" @click.prevent="recover(homePath)">
          <Icon name="lucide:arrow-left" mode="svg" aria-hidden="true" />
          {{ t('error.home') }}
        </a>
        <a :href="galleryPath" @click.prevent="recover(galleryPath)">
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
  },
}))

async function recover(path: string) {
  await clearError({ redirect: path })
}
</script>

<style lang="scss" scoped>
.error-page {
  box-sizing: border-box;
  min-height: 100svh;
  padding: max(20px, env(safe-area-inset-top))
    max(20px, env(safe-area-inset-right)) max(32px, env(safe-area-inset-bottom))
    max(20px, env(safe-area-inset-left));
  background: $background-color;
  color: $primary-text-color;
  font-family: 'Nunito', sans-serif;
  line-height: 1.6;
  overflow-wrap: anywhere;

  a:focus-visible {
    outline: 3px solid $primary-text-color;
    outline-offset: 4px;
  }

  &__skip {
    position: fixed;
    top: 12px;
    left: 12px;
    padding: 12px;
    background: $white-color;
    transform: translateY(-200%);

    &:focus {
      transform: none;
    }
  }

  &__header,
  &__content {
    max-width: 960px;
    margin-inline: auto;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 48px;
    color: inherit;
    text-decoration: none;

    img {
      flex-shrink: 0;
    }
  }

  &__content {
    padding-block: 48px;

    h1 {
      margin-block: 12px 20px;
      font-size: 2rem;
      line-height: 1.2;
      text-wrap: balance;
    }
  }

  &__code {
    color: $grey-color-2;
  }

  &__description {
    max-width: 52ch;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;
    margin-top: 24px;

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      color: inherit;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
}
</style>
