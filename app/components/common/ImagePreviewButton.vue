<template>
  <button
    ref="button"
    type="button"
    class="image-preview-button"
    aria-haspopup="dialog"
    :aria-label="imageLabel"
    :data-tooltip="image.title || undefined"
    @click="emit('select', $event)">
    <Image
      :src="image.src"
      :alt="image.alt"
      :loading="loading"
      :class="{ 'image-preview-button__image--unavailable': imageError }"
      @load="updateImage"
      @error="updateImage" />
    <span v-if="imageError" role="status" class="image-preview-button__error">
      {{ t('components.image_preview_modal.image_unavailable') }}
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { image, loading = 'lazy' } = defineProps<{
  image: ImageSource
  loading?: 'lazy' | 'eager'
}>()

const emit = defineEmits<{ select: [event: MouseEvent] }>()

const { t } = useI18n()
const button = useTemplateRef('button')

const imageError = ref(false)

const imageLabel = computed(() => {
  const previewLabel = t('components.image.preview', {
    title: image.title || image.alt,
  })

  return imageError.value
    ? `${t('components.image_preview_modal.image_unavailable')}. ${previewLabel}`
    : previewLabel
})

function updateImage(event?: Event) {
  const element = button.value?.querySelector('img')

  if (
    !element ||
    element.getAttribute('src') !== image.src ||
    (event && event.target !== element)
  ) {
    return
  }

  if (event) {
    imageError.value = event.type === 'error'
  } else if (element.complete && element.currentSrc) {
    imageError.value = element.naturalWidth === 0
  }
}

watch(
  () => image.src,
  () => {
    imageError.value = false
  },
  { flush: 'sync' }
)

watch(
  () => image.src,
  () => updateImage(),
  { flush: 'post' }
)

onMounted(() => updateImage())
</script>

<style lang="scss" scoped>
.image-preview-button {
  display: block;
  width: fit-content;
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  line-height: 0;
  cursor: zoom-in;

  :deep(img.image-preview-button__image--unavailable) {
    display: none;
  }

  &__error {
    display: block;
    color: var(--color-subtle);
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
}
</style>
