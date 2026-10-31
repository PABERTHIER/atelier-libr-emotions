<template>
  <div class="grid-item" :class="{ 'grid-item--error': imageError }">
    <button
      type="button"
      class="grid-item__button"
      :data-artwork-src="item.imageSource.src"
      aria-haspopup="dialog"
      :aria-label="t('components.image_grid_item.open', { title: artworkName })"
      @click="emit('select', $event)">
      <span class="grid-item__frame">
        <img
          :key="item.imageSource.src"
          ref="imageRef"
          :src="item.imageSource.src"
          :alt="item.imageSource.alt"
          loading="lazy"
          v-bind="imageWidthBinding"
          class="grid-item__image"
          :class="{ 'grid-item__image--unavailable': imageError }"
          @error="onImageError"
          @load="onImageLoad" />
        <span v-if="imageError" class="grid-item__error" aria-hidden="true">
          <Icon name="heroicons:photo" aria-hidden="true" />
        </span>
      </span>
      <span v-if="caption" class="grid-item__caption" aria-hidden="true">
        {{ caption }}
      </span>
    </button>
    <span v-if="imageError" class="grid-item__error-message" role="status">
      {{ t('components.image_preview_modal.image_unavailable') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ItemInternal } from '~/types/image'

const props = defineProps<{ item: ItemInternal; isMobile: boolean }>()

const emit = defineEmits<{ select: [event: MouseEvent] }>()

const { t } = useI18n()

const imageRef = ref<HTMLImageElement | null>(null)
const imageError = ref(props.item.isOnError)

const imageWidthBinding = computed(() => ({
  width: Math.max(1, Math.round(props.item.renderWidth)),
}))

const caption = computed(() =>
  props.isMobile
    ? props.item.imageSource.mobileTitle || props.item.imageSource.title
    : props.item.imageSource.title
)

const artworkName = computed(() => {
  const image = props.item.imageSource
  const title = image.title || image.mobileTitle || image.alt

  return caption.value && caption.value !== title
    ? `${caption.value} (${title})`
    : title
})

function checkLoadedImage() {
  const image = imageRef.value

  if (image?.complete && image.currentSrc) {
    imageError.value = image.naturalWidth === 0
  }
}

function onImageLoad(event: Event) {
  if (event.target === imageRef.value) {
    imageError.value = false
  }
}

function onImageError(event: Event) {
  if (event.target === imageRef.value) {
    imageError.value = true
  }
}

watch(
  () => props.item.imageSource.src,
  () => {
    imageError.value = props.item.isOnError
    checkLoadedImage()
  },
  { flush: 'post' }
)

onMounted(() => {
  checkLoadedImage()
})
</script>

<style lang="scss" scoped>
.grid-item {
  position: relative;
  width: 100%;
  min-width: 0;

  &__button {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    border-radius: $radius-panel;
    background: transparent;
    line-height: 0;
    cursor: pointer;

    &:focus-visible {
      outline: none;

      .grid-item__frame::after {
        position: absolute;
        inset: $artwork-focus-width;
        border: $artwork-focus-width solid $focus-color;
        outline: $artwork-focus-width solid $white-color;
        border-radius: $radius-panel;
        pointer-events: none;
        content: '';
      }
    }
  }

  &__frame {
    position: relative;
    display: block;
    height: var(--artwork-height, 100%);
    overflow: hidden;
    border-radius: $radius-panel;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: $radius-panel;
    object-fit: fill;
    transform-origin: center;
    user-select: none;
    -webkit-user-drag: none;

    &--unavailable {
      visibility: hidden;
    }
  }

  &__caption {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    padding: $space-16 $space-12 $space-8;
    color: $white-color;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba($primary-text-color, 0.7) $space-16,
      rgba($primary-text-color, 0.86)
    );
    border-radius: 0 0 $radius-panel $radius-panel;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.3;
    text-shadow: 0 $border-width $space-2 rgba($primary-text-color, 0.8);
    overflow-wrap: anywhere;
    opacity: 0;
    pointer-events: none;
  }

  &__button:focus-visible &__caption {
    opacity: 1;
  }

  &__error {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: $space-8;
    background: $cream-color;
    color: $dark-grey-color;
    :deep(.iconify) {
      width: $space-24;
      height: $space-24;
    }
  }

  &__error-message {
    display: block;
    margin-top: $space-4;
    color: $dark-grey-color;
    font-size: 0.8125rem;
    line-height: 1.4;
    text-align: center;
    overflow-wrap: anywhere;
  }

  &--error &__caption {
    position: static;
    display: block;
    margin-top: $space-4;
    padding: 0;
    background: none;
    color: $primary-text-color;
    text-align: center;
    text-shadow: none;
    opacity: 1;
  }
}

@media (hover: hover) and (pointer: fine) {
  .grid-item:hover .grid-item__caption {
    opacity: 1;
  }
}

@media (hover: none), (pointer: coarse), (max-width: calc($md - 1px)) {
  .grid-item__caption {
    position: static;
    display: block;
    margin-top: $space-4;
    padding: 0;
    background: none;
    color: $primary-text-color;
    font-size: 0.8125rem;
    text-align: center;
    text-shadow: none;
    opacity: 1;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .grid-item__image {
    transition: transform $transition-artwork;
  }

  .grid-item__caption {
    transition: opacity $transition-ui;
  }
}

@media (forced-colors: active) {
  .grid-item__button {
    border: $border-width solid ButtonText;

    &:focus-visible .grid-item__frame::after {
      border-color: Highlight;
      outline-color: Canvas;
    }
  }

  .grid-item__caption {
    background: Canvas;
    color: CanvasText;
    text-shadow: none;
  }
}
</style>
