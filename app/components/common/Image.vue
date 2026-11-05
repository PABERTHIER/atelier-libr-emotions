<template>
  <div class="image">
    <a :href="src" :aria-label="imageLabel" :data-tooltip="title || undefined">
      <NuxtImg
        :key="imageKey"
        :src="src"
        :sizes="sizes"
        :alt="alt"
        densities="x1 x2"
        loading="lazy"
        placeholder
        :style="{ maxHeight }"
        :class="{ 'image-unavailable': imageError }"
        v-on="imageEvents" />
      <span v-if="imageError" role="status" class="image-error">
        {{ t('components.image_preview_modal.image_unavailable') }}
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  sizes: {
    type: String,
    required: true,
  },
  maxHeight: {
    type: String,
    required: false,
    default: '200px',
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  alt: {
    type: String,
    required: true,
    validator: (value: string) => value.trim().length > 0,
  },
})

const { t } = useI18n()

const imageBreakpoint = useBreakpoints(useImage().options.screens, {
  ssrWidth: 1024,
}).active()

const imageKey = computed(
  () => `${props.src}:${props.sizes}:${imageBreakpoint.value}`
)

const imageError = ref(false)
const imageLabel = computed(() => {
  const originalLabel = t('components.image.open_original', {
    title: props.title || props.alt,
  })

  return imageError.value
    ? `${t('components.image_preview_modal.image_unavailable')}. ${originalLabel}`
    : originalLabel
})

const imageEvents = computed(() => {
  const key = imageKey.value

  return {
    load: () => {
      if (imageKey.value === key) {
        imageError.value = false
      }
    },
    error: () => {
      if (imageKey.value === key) {
        imageError.value = true
      }
    },
  }
})

watch(imageKey, () => {
  imageError.value = false
})
</script>

<style lang="scss" scoped>
.image {
  :deep(a) {
    display: block;
    line-height: 0;
  }

  :deep(.image-unavailable) {
    display: none;
  }

  .image-error {
    display: block;
    line-height: 1.5;
    color: var(--color-subtle);
    overflow-wrap: anywhere;
  }
}
</style>
