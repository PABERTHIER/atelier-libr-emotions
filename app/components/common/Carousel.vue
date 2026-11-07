<template>
  <section
    ref="carousel"
    class="carousel"
    :class="{ 'carousel--paused': !isRotating }"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId">
    <h2 :id="titleId" class="sr-only">{{ t('pages.main.carousel.title') }}</h2>
    <p :id="descriptionId" class="sr-only">
      {{ t('pages.main.carousel.description') }}
    </p>
    <div class="carousel__artworks-viewport">
      <div
        :id="artworksId"
        ref="artworks"
        class="carousel__artworks"
        aria-live="off"
        @pointerenter="handleArtworkPointerEnter"
        @pointerleave="isHovered = false"
        @pointerdown="isFocused = false"
        @focusin="handleArtworkFocusIn"
        @focusout="handleArtworkFocusOut">
        <div
          v-for="(artwork, index) in currentArtworks"
          :key="artwork.id"
          class="carousel__artwork"
          :class="`carousel__artwork--${artwork.id}`">
          <button
            type="button"
            class="carousel__preview"
            :data-carousel-track="artwork.id"
            aria-haspopup="dialog"
            :aria-label="imageLabel(artwork)"
            :data-tooltip="artwork.title"
            @click="openArtwork(index, $event)"
            @load.capture="updateImageState(index, $event)"
            @error.capture="updateImageState(index, $event)">
            <span
              class="carousel__frame"
              :class="{
                'carousel__frame--unavailable': imageFailures.has(artwork.src),
              }"
              :style="{ '--artwork-aspect': artwork.aspect }">
              <Transition
                name="artwork-change"
                @before-enter="showEnteringImage"
                @before-leave="hideLeavingImage"
                @after-enter="updateImageState(index)">
                <Image
                  :key="artwork.src"
                  :src="artwork.src"
                  :alt="artwork.alt"
                  loading="eager"
                  :class="{
                    'carousel__image--unavailable': imageFailures.has(
                      artwork.src
                    ),
                  }" />
              </Transition>
              <span
                v-if="imageFailures.has(artwork.src)"
                role="status"
                class="carousel__error">
                {{ t('components.image_preview_modal.image_unavailable') }}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="carousel__controls">
      <button
        type="button"
        class="carousel__control"
        :aria-controls="artworksId"
        :aria-label="t('pages.main.carousel.previous')"
        :data-tooltip="t('pages.main.carousel.previous')"
        @click="changeArtworks(-1)">
        <Icon name="lucide:chevron-left" aria-hidden="true" />
      </button>
      <button
        v-if="!prefersReducedMotion"
        type="button"
        class="carousel__control carousel__control--rotation"
        :aria-controls="artworksId"
        :aria-label="rotationLabel"
        :data-tooltip="rotationLabel"
        @click="toggleRotation">
        <Icon
          :name="isRotating ? 'lucide:pause' : 'lucide:play'"
          aria-hidden="true" />
      </button>
      <button
        type="button"
        class="carousel__control"
        :aria-controls="artworksId"
        :aria-label="t('pages.main.carousel.next')"
        :data-tooltip="t('pages.main.carousel.next')"
        @click="changeArtworks(1)">
        <Icon name="lucide:chevron-right" aria-hidden="true" />
      </button>
    </div>
    <p class="sr-only" role="status">{{ artworkAnnouncement }}</p>
    <ImagePreviewModal
      v-if="viewerImage"
      :image="viewerImage"
      :images="viewerImages"
      :visible="viewerVisible"
      :opener="viewerOpener"
      @select="selectImage"
      @close="closeArtworkViewer" />
  </section>
</template>

<script setup lang="ts">
import { imageDimensions } from '~/data/imageDimensions'
import type { ImageSource } from '~/types/image'

const { t } = useI18n()
const nuxtApp = useNuxtApp()
const carousel = useTemplateRef('carousel')
const artworks = useTemplateRef('artworks')
const carouselId = useId()

const titleId = `${carouselId}-title`
const descriptionId = `${carouselId}-description`
const artworksId = `${carouselId}-artworks`

const artworkTracks = [
  {
    id: 'paintings',
    entries: [
      ['/paintings/celestial-collision.webp', 'celestial_collision'],
      ['/paintings/abstract-autumn.webp', 'abstract_autumn'],
      [
        '/paintings/acrylic/abstracts/AutomaticPainting2.webp',
        'automatic_painting_2',
      ],
      ['/paintings/inks/nature/EC10.webp', 'ec10'],
      ['/paintings/mixed_technique/nature/TMn9.webp', 'tmn9'],
    ],
  },
  {
    id: 'ceramics',
    entries: [
      ['/ceramics/electric_kiln/animals/cats/Cats14.webp', 'cats14'],
      ['/ceramics/electric_kiln/animals/snails/Snails5.webp', 'snails5'],
      ['/ceramics/electric_kiln/animals/birds/Birds5.webp', 'birds5'],
      [
        '/ceramics/electric_kiln/animals/tortoises/Tortoises8.webp',
        'tortoises8',
      ],
      ['/ceramics/electric_kiln/nature/flowers/F7.webp', 'f7'],
      ['/ceramics/electric_kiln/nature/leaves/Feuilles8.webp', 'feuilles8'],
      [
        '/ceramics/electric_kiln/various_objects/boxes/Sgraffitto4.webp',
        'sgraffitto4',
      ],
      [
        '/ceramics/electric_kiln/vases_and_pots/intuitive_pots/PotsIntuitifs7.webp',
        'pots_intuitifs7',
      ],
      [
        '/ceramics/electric_kiln/vases_and_pots/single_flower_vases/Soliflores10.webp',
        'soliflores10',
      ],
      [
        '/ceramics/electric_kiln/vases_and_pots/round_vases/VasesRonds4.webp',
        'vases_ronds4',
      ],
      ['/ceramics/porcelain/nature/flowers/FP13.webp', 'fp13'],
    ],
  },
  {
    id: 'studio',
    entries: [
      ['/ceramics/CeramicInProgress.webp', 'ceramic_wip'],
      ['/og-images/contact.webp', 'creations'],
      ['/og-images/cv.webp', 'nature'],
      ['/og-images/my_artistic_approach.webp', 'my_artistic_approach'],
      ['/og-images/my_development.webp', 'my_development'],
    ],
  },
] as const

// Keep the existing state keys across locale remounts and return navigation
const currentIndices = useState('home-carousel-indices', () =>
  artworkTracks.map(() => 0)
)
const isPaused = useState('home-carousel-paused', () => false)

const isHovered = ref(false)
const isFocused = ref(false)
const isPlaybackRequested = ref(false)
const isPageVisible = ref(true)
const prefersReducedMotion = ref(false)
const hasManualSelection = ref(false)
const imageFailures = ref(new Set<string>())
const viewerTrack = ref(0)
const isViewerClosing = ref(false)

const trackImages = computed(() =>
  artworkTracks.map(track =>
    track.entries.map(([src, key]) => ({
      src,
      title: t(`pictures.carousel.${key}.title`),
      alt: t(`pictures.carousel.${key}.alt`),
    }))
  )
)

const currentArtworks = computed(() =>
  artworkTracks.map((track, index) => {
    const image = trackImages.value[index]![currentIndices.value[index]!]!
    const [width, height] = imageDimensions[image.src]!

    return { id: track.id, ...image, aspect: width / height }
  })
)

const viewerImages = computed(() => trackImages.value[viewerTrack.value]!)
const {
  viewerImage,
  viewerVisible,
  viewerOpener,
  openViewer,
  selectImage,
  closeViewer,
} = useImagePreview(() => viewerImages.value)

const artworkAnnouncement = computed(() =>
  hasManualSelection.value && !viewerVisible.value
    ? currentArtworks.value.map(artwork => artwork.title).join(', ')
    : ''
)

const isRotating = computed(
  () =>
    !isPaused.value &&
    (isPlaybackRequested.value || (!isHovered.value && !isFocused.value)) &&
    isPageVisible.value &&
    !prefersReducedMotion.value &&
    !viewerVisible.value &&
    !isViewerClosing.value
)
const rotationLabel = computed(() =>
  t(
    isRotating.value
      ? 'pages.main.carousel.pause'
      : 'pages.main.carousel.resume'
  )
)

let rotationTimer: ReturnType<typeof setInterval> | undefined
let motionPreference: MediaQueryList | undefined
let disposed = false
let viewerOpenedWithKeyboard = false

function stopRotation() {
  clearInterval(rotationTimer)
  rotationTimer = undefined
}

function advanceArtworks(direction: -1 | 1) {
  currentIndices.value = artworkTracks.map(
    (track, index) =>
      (currentIndices.value[index]! + direction + track.entries.length) %
      track.entries.length
  )
}

function changeArtworks(direction: -1 | 1) {
  isPaused.value = true
  hasManualSelection.value = true
  advanceArtworks(direction)
}

function toggleRotation() {
  isPaused.value = isRotating.value
  isPlaybackRequested.value = !isPaused.value
}

function syncRotation() {
  stopRotation()

  if (isRotating.value) {
    hasManualSelection.value = false
    rotationTimer = setInterval(() => advanceArtworks(1), 5000)
  }
}

function handleArtworkPointerEnter(event: PointerEvent) {
  isHovered.value = event.pointerType === 'mouse'
}

function handleArtworkFocusIn(event: FocusEvent) {
  isFocused.value =
    event.target instanceof HTMLElement &&
    event.target.matches(':focus-visible')
}

function handleArtworkFocusOut(event: FocusEvent) {
  const next = event.relatedTarget

  isFocused.value =
    next instanceof HTMLElement &&
    artworks.value?.contains(next) === true &&
    next.matches(':focus-visible')
}

function syncVisibility() {
  isPageVisible.value = !document.hidden
}

function syncMotionPreference() {
  prefersReducedMotion.value = motionPreference?.matches ?? false

  if (prefersReducedMotion.value) {
    isPaused.value = true
  }
}

function openArtwork(index: number, event: MouseEvent) {
  if (isViewerClosing.value) {
    return
  }

  viewerTrack.value = index
  viewerOpenedWithKeyboard = event.detail === 0
  isHovered.value = false

  openViewer(currentIndices.value[index]!, event)
}

async function closeArtworkViewer() {
  isViewerClosing.value = true
  closeViewer()

  // Hold the collage still until the modal has restored scrolling and focus
  await nuxtApp.$overlayScroll.whenUnlocked()

  if (!disposed) {
    // Modal focus return must not turn a pointer preview into a keyboard pause
    isFocused.value =
      viewerOpenedWithKeyboard &&
      document.activeElement instanceof HTMLElement &&
      artworks.value?.contains(document.activeElement) === true &&
      document.activeElement.matches(':focus-visible')

    isViewerClosing.value = false
  }
}

function imageLabel(image: ImageSource) {
  const label = t('components.image.preview', {
    title: image.title || image.alt,
  })

  return imageFailures.value.has(image.src)
    ? `${t('components.image_preview_modal.image_unavailable')}. ${label}`
    : label
}

function showEnteringImage(element: Element) {
  element.removeAttribute('aria-hidden')
}

function hideLeavingImage(element: Element) {
  element.setAttribute('aria-hidden', 'true')
}

function updateImageState(index: number, event?: Event) {
  const artwork = currentArtworks.value[index]!
  const image =
    event?.target instanceof HTMLImageElement
      ? event.target
      : carousel.value?.querySelector<HTMLImageElement>(
          `[data-carousel-track="${artwork.id}"] img:not([aria-hidden="true"])`
        )

  if (
    !image ||
    image.getAttribute('src') !== artwork.src ||
    (event && event.target !== image)
  ) {
    return
  }

  if (
    event?.type === 'error' ||
    (image.complete && image.currentSrc && !image.naturalWidth)
  ) {
    imageFailures.value.add(artwork.src)
  } else if (image.complete && image.naturalWidth) {
    imageFailures.value.delete(artwork.src)
  }
}

watch(
  artworkTracks.map((_, index) => () => currentArtworks.value[index]!.src),
  (sources, previousSources) => {
    sources.forEach((src, index) => {
      if (src !== previousSources[index]) {
        imageFailures.value.delete(src)
      }
    })
  }
)

watch(isRotating, syncRotation)

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', syncMotionPreference)
  document.addEventListener('visibilitychange', syncVisibility)

  syncMotionPreference()
  syncVisibility()
  syncRotation()

  artworkTracks.forEach((_, index) => updateImageState(index))
})

onBeforeUnmount(() => {
  disposed = true

  stopRotation()

  motionPreference?.removeEventListener('change', syncMotionPreference)
  document.removeEventListener('visibilitychange', syncVisibility)
})
</script>

<style lang="scss" scoped>
.carousel {
  --artwork-padding: #{$space-10};
  position: relative;
  width: 650px;
  min-width: 0;
  max-width: 100%;

  &__artworks {
    position: relative;
    height: 500px;
    width: 100%;
  }

  &__artwork {
    position: absolute;
    min-width: 0;

    &--paintings {
      --artwork-max-width: 200px;
      --artwork-max-height: 300px;
      top: 10%;
      left: 7.7%;
    }

    &--ceramics {
      --artwork-max-width: 180px;
      --artwork-max-height: 180px;
      --artwork-left: 64.6%;
      top: 30%;
      left: min(
        var(--artwork-left),
        calc(
          100% - var(--artwork-max-width) - 2 * var(--artwork-padding) -
            #{$space-5}
        )
      );
    }

    &--studio {
      --artwork-max-width: 150px;
      --artwork-max-height: 250px;
      top: 40%;
      left: 30.8%;
    }
  }

  &__frame {
    --artwork-width: min(
      var(--artwork-max-width),
      calc(var(--artwork-max-height) * var(--artwork-aspect))
    );
    position: relative;
    display: block;
    box-sizing: content-box;
    width: var(--artwork-width);
    height: calc(var(--artwork-width) / var(--artwork-aspect));
    padding: var(--artwork-padding);
    border-radius: $radius-panel;
    background: var(--color-surface);
    box-shadow: 0 $space-20 $space-40 $box-shadow-color;
    overflow-wrap: anywhere;

    &--unavailable {
      height: auto;
    }

    :deep(img) {
      position: absolute;
      top: var(--artwork-padding);
      left: var(--artwork-padding);
      display: block;
      width: calc(100% - 2 * var(--artwork-padding));
      max-width: none;
      height: calc(100% - 2 * var(--artwork-padding));
      object-fit: contain;
    }
  }

  &__controls {
    position: absolute;
    right: 0;
    bottom: $space-25;
    display: flex;
    padding: $space-2;
    border: $border-width solid var(--color-border);
    border-radius: $radius-pill;
    background: var(--color-floating-control);
    box-shadow: 0 $space-4 $space-12 $box-shadow-color;
  }

  &__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: $control-size;
    min-width: $control-size;
    height: $control-size;
    padding: $space-8;
    border: 0;
    border-radius: $radius-pill;
    background: transparent;
    color: var(--color-text);

    .iconify {
      flex: none;
      width: 1.5rem;
      height: 1.5rem;
    }

    &:hover {
      background: var(--color-surface-warm);
    }

    &:focus-visible {
      outline-offset: -$focus-width;
    }
  }
}

@media (max-width: $xl) {
  .carousel {
    width: 500px;

    &__artworks {
      height: 450px;
    }

    &__controls {
      bottom: $space-15;
    }

    &__artwork--paintings {
      --artwork-max-width: 175px;
      top: 17.8%;
      left: 2%;
    }

    &__artwork--ceramics {
      --artwork-max-width: 150px;
      --artwork-left: 66%;
      top: 38.9%;
    }

    &__artwork--studio {
      --artwork-max-width: 125px;
      top: 50%;
      left: 28%;
    }
  }
}

@media (max-width: $lg) {
  .carousel {
    width: 450px;

    &__artworks {
      height: 300px;
    }

    &__controls {
      position: relative;
      right: auto;
      bottom: auto;
      width: fit-content;
      margin: -$space-15 auto 0;
    }

    &__artwork--paintings {
      --artwork-max-width: 150px;
      --artwork-max-height: 240px;
      top: $space-20;
    }

    &__artwork--ceramics {
      --artwork-max-width: 130px;
      --artwork-max-height: 140px;
      --artwork-left: 68.75%;
      top: 25%;
    }

    &__artwork--studio {
      --artwork-max-width: 130px;
      --artwork-max-height: 135px;
      top: 41.7%;
      left: 30.25%;
    }
  }
}

@media (max-width: $sm) {
  .carousel {
    --artwork-padding: #{$space-5};
    width: 450px;

    &__artworks {
      height: 320px;
    }

    &__frame {
      border-radius: $space-5;
    }

    &__artwork--paintings {
      // Grow between 420px and 570px, then retain tablet sizes
      --artwork-max-width: clamp(120px, calc(20vw + 36px), 150px);
      left: 3.3%;
    }

    &__artwork--ceramics {
      --artwork-max-width: clamp(100px, calc(20vw + 16px), 130px);
      --artwork-left: 70%;
      top: 20%;
    }

    &__artwork--studio {
      --artwork-max-width: clamp(100px, calc(20vw + 16px), 130px);
    }
  }
}

@media (width < 420px) {
  .carousel {
    width: 360px;

    &__artworks {
      height: 250px;
    }

    &__controls {
      margin-top: -$space-30;
    }

    &__artwork--paintings {
      --artwork-max-width: 100px;
      --artwork-max-height: 180px;
      left: 3.3%;
    }

    &__artwork--ceramics {
      --artwork-max-width: 80px;
      --artwork-max-height: 130px;
      --artwork-left: 70%;
      top: 20%;
    }

    &__artwork--studio {
      --artwork-max-width: 80px;
      --artwork-max-height: 100px;
      top: 36%;
      left: 30%;
    }
  }
}

@media (max-width: $xs) {
  .carousel {
    &__artworks {
      min-width: 280px;
    }

    &__artwork--paintings {
      left: $space-4;
    }

    &__artwork--studio {
      top: 28%;
      left: 28%;
    }
  }
}

@media (max-width: calc($xs - $border-width)) {
  .carousel__artworks-viewport {
    overflow-x: auto;
    overscroll-behavior-x: contain;
  }

  .carousel__controls {
    margin-top: $space-12;
  }

  .carousel__artworks {
    height: 200px;
  }

  .carousel__artwork--paintings {
    --artwork-max-height: 170px;
  }

  .carousel__artwork--ceramics {
    top: $space-50;
  }

  .carousel__artwork--studio {
    top: $space-50 + $space-20;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .carousel {
    &__artwork {
      animation: floatBlock 8s ease-in-out infinite;

      &--ceramics {
        animation-delay: -2s;
      }

      &--studio {
        animation-delay: -4s;
      }
    }

    &--paused .carousel__artwork {
      animation-play-state: paused;
    }
  }

  .artwork-change-enter-active,
  .artwork-change-leave-active {
    transition: opacity $transition-viewer;
  }

  .artwork-change-enter-active {
    z-index: 1;
  }

  .artwork-change-enter-from {
    opacity: 0;
  }

  .carousel__frame {
    transition:
      width $transition-viewer,
      height $transition-viewer;
  }
}

@media (scripting: none) {
  .carousel__controls {
    display: none;
  }
}

@media (forced-colors: active) {
  .carousel__controls {
    border-color: ButtonText;
    background: Canvas;
  }

  .carousel__control {
    color: ButtonText;
  }
}

.carousel__preview {
  display: block;
  width: fit-content;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: inherit;
  line-height: 0;
  cursor: zoom-in;
}

.carousel__frame :deep(img.carousel__image--unavailable) {
  display: none;
}

.carousel__error {
  display: block;
  color: var(--color-subtle);
  line-height: 1.5;
}
</style>
