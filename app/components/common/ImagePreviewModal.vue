<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="visible"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        :aria-label="t('components.image_preview_modal.aria_label')"
        @click.self="close"
        @keydown.escape="close">
        <div ref="modalContentRef" class="modal-content" tabindex="-1">
          <div class="modal-header">
            <h2 class="modal-title">{{ displayTitle }}</h2>
            <button
              ref="closeButtonRef"
              type="button"
              class="close-button"
              :aria-label="t('components.image_preview_modal.close_label')"
              :title="t('components.image_preview_modal.close_label')"
              @click="close">
              <span class="close-icon" aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="image-panel">
              <div
                ref="imageContainerRef"
                class="image-container"
                :class="{ zoomed: isZoomed }"
                @wheel.prevent="onContainerWheel">
                <div class="image-centering-wrapper">
                  <img
                    ref="imageRef"
                    :src="fullImageSrc"
                    :alt="image.alt ?? ''"
                    class="preview-image"
                    :class="{ hidden: imageError }"
                    :style="imageStyle"
                    draggable="false"
                    @load="onImageLoad"
                    @error="onImageError"
                    @click="onImageClick" />
                  <div v-if="imageError" class="image-error-placeholder">
                    <span class="image-error-icon" aria-hidden="true">🖼️</span>
                    <span class="image-error-text">
                      {{
                        displayTitle ||
                        image.alt ||
                        t('components.image_preview_modal.image_unavailable')
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="zoom-controls">
                <span class="zoom-label">
                  {{ t('components.image_preview_modal.zoom_label') }}
                </span>
                <input
                  type="range"
                  class="zoom-slider"
                  min="0"
                  max="100"
                  step="1"
                  :value="sliderRaw"
                  :aria-label="t('components.image_preview_modal.zoom_label')"
                  @input="onZoomSliderInput" />
                <span class="zoom-value">
                  {{ Math.round(zoomLevel * 100) }}%
                </span>
                <button
                  type="button"
                  class="zoom-fit-button"
                  @click="resetZoom">
                  {{ t('components.image_preview_modal.zoom_fit') }}
                </button>
              </div>
            </div>

            <div class="info-panel">
              <div v-if="image.title" class="info-row info-title">
                {{ image.title }}
              </div>

              <div v-if="image.alt" class="info-row info-description">
                {{ image.alt }}
              </div>

              <div v-if="image.dimensions" class="info-row info-dimensions">
                <span class="info-label">
                  {{ t('components.image_preview_modal.dimensions_label') }}:
                </span>
                <span class="info-value">
                  {{ image.dimensions }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const props = defineProps<{
  image: ImageSource
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

const modalContentRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLElement | null>(null)
const imageContainerRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)

const sliderRaw = ref(0)
const maxZoom = 3
const naturalWidth = ref(0)
const naturalHeight = ref(0)
const containerSize = ref({ width: 0, height: 0 })
const imageError = ref(false)

let triggerElement: HTMLElement | null = null
let scrollLockActive = false
let bodyScrollY = 0
// Stores the relative click position so the zoom watch can centre on it
let pendingClickPosition: { relX: number; relY: number } | null = null

const fullImageSrc = computed(() => props.image.src)
const displayTitle = computed(
  () => props.image.title || props.image.mobileTitle || ''
)

// Logarithmic mapping: slider 0→100 becomes zoom 1→maxZoom
const zoomLevel = computed(() => {
  if (sliderRaw.value === 0) {
    return 1
  }

  return Math.exp((sliderRaw.value / 100) * Math.log(maxZoom))
})

const isZoomed = computed(() => zoomLevel.value > 1)

// Pixel dimensions the image occupies at zoom=1 (mirrors object-fit:contain)
const baseDimensions = computed(() => {
  if (naturalWidth.value === 0 || containerSize.value.width === 0) {
    return { width: 0, height: 0 }
  }

  const cw = containerSize.value.width
  const ch = containerSize.value.height
  const imageAspect = naturalWidth.value / naturalHeight.value
  const containerAspect = cw / ch

  if (imageAspect > containerAspect) {
    return { width: cw, height: Math.round(cw / imageAspect) }
  } else {
    return { width: Math.round(ch * imageAspect), height: ch }
  }
})

// zoom=1: position:absolute+inset:0 fills the container reliably regardless of
//         the flex chain — object-fit:contain shows the whole image, centered.
// zoom>1: explicit px dimensions so scroll range matches the visible scaled size.
// baseDimensions=0 fallback: max-width/height+object-fit keeps image visible
//         while the container hasn't been measured yet (brief transient state).
const imageStyle = computed(() => {
  if (!isZoomed.value) {
    return {
      position: 'absolute' as const,
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'contain' as const,
      cursor: 'zoom-in',
    }
  }

  if (baseDimensions.value.width === 0) {
    return {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain' as const,
      cursor: 'zoom-out',
    }
  }

  return {
    width: `${Math.round(baseDimensions.value.width * zoomLevel.value)}px`,
    height: `${Math.round(baseDimensions.value.height * zoomLevel.value)}px`,
    cursor: 'zoom-out',
  }
})

function measureContainer() {
  if (!imageContainerRef.value) {
    return
  }

  const { clientWidth: w, clientHeight: h } = imageContainerRef.value

  if (w > 0 && h > 0) {
    containerSize.value = { width: w, height: h }
  }
}

function onImageLoad() {
  if (imageRef.value) {
    naturalWidth.value = imageRef.value.naturalWidth
    naturalHeight.value = imageRef.value.naturalHeight
  }

  // nextTick ensures the container has finished layout before measuring
  nextTick(measureContainer)
}

function onImageError() {
  imageError.value = true
  // Still measure so zoom controls are sized correctly if the user tries them
  nextTick(measureContainer)
}

function onZoomSliderInput(event: Event) {
  const target = event.target as HTMLInputElement
  sliderRaw.value = parseFloat(target.value)
}

function setZoomLevel(zoom: number) {
  sliderRaw.value =
    zoom <= 1
      ? 0
      : Math.round(
          (Math.log(Math.min(zoom, maxZoom)) / Math.log(maxZoom)) * 100
        )
}

// All scroll positioning is handled by the zoomLevel watcher (flush:'post').
// Here we only record the click position for the watcher to pick up.
function onImageClick(event: MouseEvent) {
  if (isZoomed.value) {
    resetZoom()
    return
  }

  const img = imageRef.value

  if (!img) {
    setZoomLevel(2)
    return
  }

  const rect = img.getBoundingClientRect()
  pendingClickPosition = {
    relX: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
    relY: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
  }

  setZoomLevel(2)
}

// Runs after every DOM update triggered by a zoom change.
// Three cases: click-zoom (scroll to clicked point), first slider zoom
// (centre the image), ongoing slider (keep the same visual centre).
// Uses container.clientWidth/Height (fresh, post-render) for the viewport size
// so scrollbar width is already accounted for.
watch(
  zoomLevel,
  (newZoom, oldZoom) => {
    if (newZoom <= 1) {
      return
    }

    const container = imageContainerRef.value

    if (!container || baseDimensions.value.width === 0) {
      return
    }

    // viewport dimensions post-render (shrunk by any visible scrollbar)
    const clientWidth = container.clientWidth
    const clientHeight = container.clientHeight
    const newWidth = baseDimensions.value.width * newZoom
    const newHeight = baseDimensions.value.height * newZoom

    if (pendingClickPosition) {
      const { relX, relY } = pendingClickPosition
      pendingClickPosition = null

      container.scrollLeft = Math.max(0, relX * newWidth - clientWidth / 2)
      container.scrollTop = Math.max(0, relY * newHeight - clientHeight / 2)
    } else if (oldZoom <= 1) {
      // Transitioning from fit → zoomed: centre the image
      container.scrollLeft = Math.max(0, (newWidth - clientWidth) / 2)
      container.scrollTop = Math.max(0, (newHeight - clientHeight) / 2)
    } else {
      // Slider adjustment: keep the same point at the centre of the viewport
      const oldWidth = baseDimensions.value.width * oldZoom
      const oldHeight = baseDimensions.value.height * oldZoom
      const cx = (container.scrollLeft + clientWidth / 2) / oldWidth
      const cy = (container.scrollTop + clientHeight / 2) / oldHeight

      container.scrollLeft = Math.max(0, cx * newWidth - clientWidth / 2)
      container.scrollTop = Math.max(0, cy * newHeight - clientHeight / 2)
    }
  },
  { flush: 'post' }
)

function resetZoom() {
  sliderRaw.value = 0
}

// Manually handle wheel events so the mouse wheel scrolls the image container
// instead of bubbling up to the (fixed) body. Shift+wheel scrolls horizontally.
function onContainerWheel(event: WheelEvent) {
  const container = imageContainerRef.value

  if (!container) {
    return
  }

  if (event.shiftKey) {
    container.scrollLeft += event.deltaY
  } else {
    container.scrollLeft += event.deltaX
    container.scrollTop += event.deltaY
  }
}

function close() {
  emit('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
    return
  }

  if (event.key === 'Tab') {
    trapFocus(event)
  }
}

function trapFocus(event: KeyboardEvent) {
  if (!modalContentRef.value) {
    return
  }

  const focusableElements = modalContentRef.value.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  if (focusableElements.length === 0) {
    return
  }

  const first = focusableElements[0]
  const last = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

// position:fixed on body is the only approach that reliably stops background
// scroll on both desktop AND iOS Safari (which ignores overflow:hidden on html/body).
// The current scrollY is saved so the page can be restored to its exact position
// when the modal closes.
// NOTE: position:fixed does NOT break overflow:auto scroll containers inside
//       position:fixed modals on desktop. On iOS, -webkit-overflow-scrolling:touch
//       on those containers (see CSS) restores momentum scroll.
function lockBodyScroll() {
  scrollLockActive = true
  bodyScrollY = window.scrollY
  document.documentElement.style.overflow = 'hidden'
  document.body.classList.add('no-scroll')
  document.body.style.position = 'fixed'
  document.body.style.top = `-${bodyScrollY}px`
  document.body.style.width = '100%'
}

function unlockBodyScroll() {
  if (!scrollLockActive) {
    return
  }

  scrollLockActive = false
  document.documentElement.style.overflow = ''
  document.body.classList.remove('no-scroll')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  window.scrollTo(0, bodyScrollY)
}

watch(
  () => props.visible,
  isVisible => {
    if (isVisible) {
      triggerElement = document.activeElement as HTMLElement
      document.addEventListener('keydown', onKeydown)
      lockBodyScroll()

      sliderRaw.value = 0
      naturalWidth.value = 0
      naturalHeight.value = 0
      containerSize.value = { width: 0, height: 0 }
      imageError.value = false
      pendingClickPosition = null

      nextTick(() => {
        closeButtonRef.value?.focus()
        measureContainer()
      })
    } else {
      document.removeEventListener('keydown', onKeydown)
      unlockBodyScroll()

      if (triggerElement) {
        triggerElement.focus()
        triggerElement = null
      }
    }
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  unlockBodyScroll()
})
</script>

<style lang="scss" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: $modal-z-index;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 16px;
  overscroll-behavior: none;

  .modal-content {
    display: flex;
    flex-direction: column;
    width: 92vw;
    max-width: 1100px;
    height: 90vh;
    background: $white-color;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    outline: none;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid $light-grey-color-2;
      flex-shrink: 0;

      .modal-title {
        font-size: 18px;
        font-weight: 600;
        color: $primary-text-color;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        padding-right: 16px;
      }

      .close-button {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        flex-shrink: 0;
        transition: background-color 0.2s ease;
        color: $primary-text-color;

        &:hover,
        &:focus-visible {
          background-color: $light-grey-color-2;
        }

        .close-icon {
          font-size: 24px;
          line-height: 1;
        }
      }
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      min-height: 0;

      .image-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;

        .image-container {
          flex: 1;
          overflow: auto;
          position: relative;
          min-height: 0;
          background: $cream-color;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;

          .image-centering-wrapper {
            min-width: 100%;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .preview-image {
            flex-shrink: 0;
            -webkit-user-drag: none;
            user-select: none;

            &.hidden {
              display: none;
            }
          }

          .image-error-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 24px;
            color: $grey-color;
            text-align: center;

            .image-error-icon {
              font-size: 48px;
              line-height: 1;
            }

            .image-error-text {
              font-size: 15px;
              font-style: italic;
              max-width: 260px;
            }
          }

          &.zoomed {
            cursor: grab;

            &:active {
              cursor: grabbing;
            }
          }
        }

        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-top: 1px solid $light-grey-color-2;
          flex-shrink: 0;
          background: $white-color;

          .zoom-label {
            font-size: 13px;
            font-weight: 500;
            color: $dark-grey-color;
            white-space: nowrap;
          }

          .zoom-slider {
            flex: 1;
            height: 4px;
            appearance: none;
            background: $light-grey-color-2;
            border-radius: 2px;
            outline: none;
            cursor: pointer;
            max-width: 200px;

            &::-webkit-slider-thumb {
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: $primary-text-color;
              cursor: pointer;
            }

            &::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: $primary-text-color;
              border: none;
              cursor: pointer;
            }
          }

          .zoom-value {
            font-size: 13px;
            font-weight: 500;
            color: $dark-grey-color;
            min-width: 42px;
            text-align: right;
          }

          .zoom-fit-button {
            all: unset;
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 4px;
            background: $warm-beige;
            color: $primary-text-color;
            cursor: pointer;
            white-space: nowrap;
            transition: background-color 0.2s ease;

            &:hover,
            &:focus-visible {
              background: $light-grey-color-2;
            }
          }
        }
      }

      .info-panel {
        padding: 14px 20px;
        border-top: 1px solid $light-grey-color-2;
        flex-shrink: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px 24px;
        align-items: baseline;
        background: $white-color;

        .info-row {
          font-size: 14px;
          color: $primary-text-color;
        }

        .info-title {
          width: 100%;
          font-weight: 600;
          font-size: 15px;
        }

        .info-description {
          flex: 1;
          color: $dark-grey-color;
          min-width: 150px;
        }

        .info-dimensions {
          display: flex;
          gap: 6px;
          white-space: nowrap;

          .info-label {
            font-weight: 500;
            color: $dark-grey-color;
          }

          .info-value {
            color: $grey-color;
          }
        }
      }
    }
  }
}

@media (max-width: $sm) {
  .modal-backdrop {
    padding: 8px;

    .modal-content {
      width: 100%;
      height: 80vh;
      border-radius: 8px;
    }

    .modal-header {
      padding: 12px 14px;

      .modal-title {
        font-size: 15px;
      }

      .close-button {
        width: 32px;
        height: 32px;
      }
    }

    .modal-body {
      .image-panel {
        .image-container {
          min-height: 0;
        }

        .zoom-controls {
          padding: 8px 14px;
          gap: 8px;
          flex-wrap: wrap;

          .zoom-slider {
            max-width: none;
            min-width: 80px;
          }
        }
      }

      .info-panel {
        padding: 10px 14px;
        gap: 4px 12px;

        .info-title {
          font-size: 14px;
        }

        .info-row {
          font-size: 13px;
        }
      }
    }
  }
}

@media (max-width: $md) and (min-width: calc($sm + 1px)) {
  .modal-content {
    width: 96vw;
    max-height: 94vh;
  }
}
</style>
