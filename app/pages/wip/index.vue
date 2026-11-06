<template>
  <article class="wip-page">
    <h1 class="sr-only">{{ t('wip.title') }}</h1>
    <ImagePreviewButton
      class="wip-page__image"
      :image="previewImage"
      loading="eager"
      @select="openViewer(0, $event)" />
    <p class="wip-page__description">{{ t('wip.description') }}</p>
    <NuxtLink
      :to="localePath('/painting/acrylic/abstracts')"
      class="wip-page__link">
      {{ t('pages.main.buttons.view_gallery') }}
    </NuxtLink>
    <ImagePreviewModal
      v-if="viewerImage"
      :image="viewerImage"
      :visible="viewerVisible"
      :opener="viewerOpener"
      @close="closeViewer" />
  </article>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()
const localePath = useLocalePath()

const isAnimationPlaying = ref(false)

const previewImage = computed<ImageSource>(() => ({
  src: isAnimationPlaying.value ? '/wip.gif' : '/wip-still.webp',
  title: t('wip.title'),
  alt: t('wip.image_alt'),
}))

const { viewerImage, viewerVisible, viewerOpener, openViewer, closeViewer } =
  useImagePreview(() => [previewImage.value])

let motionPreference: MediaQueryList | undefined

function updateAnimation() {
  isAnimationPlaying.value = motionPreference?.matches === false
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateAnimation()
  motionPreference.addEventListener('change', updateAnimation)
})

onBeforeUnmount(() => {
  motionPreference?.removeEventListener('change', updateAnimation)
})

useHead(usePageSeo('wip'))
</script>

<style lang="scss" scoped>
.wip-page {
  width: 100%;
  min-width: 0;
  max-width: 62.5rem;
  text-align: center;
  overflow-wrap: anywhere;

  :deep(img) {
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  &__image {
    width: 300px;
    margin-inline: auto;
  }

  &__description {
    margin: $space-20 0;
    line-height: 1.6;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: $control-size;
    max-width: 100%;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
}

@media (min-width: $md) {
  .wip-page__image {
    width: 400px;
  }
}

@media (min-width: $lg) {
  .wip-page__image {
    width: 500px;
  }
}
</style>
