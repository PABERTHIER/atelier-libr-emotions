<template>
  <img
    :key="src"
    ref="image"
    class="image-v2"
    :class="{ 'image-v2--loading': skeleton && pending }"
    :src="src"
    :alt="alt"
    :width="width ?? dimensions?.[0]"
    :height="height ?? dimensions?.[1]"
    :loading="loading"
    decoding="async"
    @load="settle"
    @error="settle" />
</template>

<script setup lang="ts">
import { imageDimensions } from '~/data/imageDimensions'

const {
  src,
  alt,
  width = undefined,
  height = undefined,
  loading = 'lazy',
  skeleton = true,
} = defineProps<{
  src: string
  alt: string
  width?: number | string
  height?: number | string
  loading?: 'lazy' | 'eager'
  skeleton?: boolean
}>()

const dimensions = computed(() => imageDimensions[src])

const image = ref<HTMLImageElement | null>(null)
const pending = ref(false)

let placeholderTimer: ReturnType<typeof setTimeout> | undefined

function settle() {
  clearTimeout(placeholderTimer)
  pending.value = false
}

function trackLoading() {
  settle()

  if (!skeleton || image.value?.complete) {
    return
  }

  // Avoid a placeholder flash for cached and quickly loaded images
  // Keep the native image visible for progressive loading and no-JS use
  placeholderTimer = setTimeout(() => {
    pending.value = !image.value?.complete
  }, 150)
}

onMounted(trackLoading)

watch([() => src, () => skeleton], trackLoading, { flush: 'post' })

onBeforeUnmount(settle)
</script>

<style lang="scss" scoped>
.image-v2 {
  display: block;
  min-width: 0;
  max-width: 100%;
  height: auto;
  object-fit: contain;

  &--loading {
    background: linear-gradient(
      110deg,
      var(--color-surface-warm) 20%,
      var(--color-skeleton-highlight) 50%,
      var(--color-surface-warm) 80%
    );
    background-size: 200% 100%;
    border-radius: $radius-control;
  }
}

@media screen and (prefers-reduced-motion: no-preference) {
  .image-v2--loading {
    animation: skeletonShimmer 1.8s ease-in-out infinite;
  }
}
</style>
