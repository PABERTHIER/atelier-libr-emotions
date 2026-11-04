<template>
  <article class="wip-page">
    <h1 class="sr-only">{{ t('wip.title') }}</h1>
    <Image
      :src="isAnimationPlaying ? '/wip.gif' : '/wip-still.webp'"
      :alt="t('wip.image_alt')"
      sizes="sm:400px, md:700px, lg:1000px" />
    <p class="wip-page__description">{{ t('wip.description') }}</p>
    <NuxtLink
      :to="localePath('/painting/acrylic/abstracts')"
      class="wip-page__link">
      {{ t('pages.main.buttons.view_gallery') }}
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const isAnimationPlaying = ref(false)

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
    max-width: 100%;
    height: auto;
    object-fit: contain;
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
</style>
