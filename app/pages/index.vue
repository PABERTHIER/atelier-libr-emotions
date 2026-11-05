<template>
  <div class="home-page">
    <section class="home-page__hero" aria-labelledby="home-title">
      <div class="home-page__intro">
        <h1 id="home-title" class="home-page__title">
          <span class="home-page__title-line">{{ t('app.name') }}</span>
          <span class="home-page__title-line home-page__title-line--accent">
            {{ t('pages.main.hero_title') }}
          </span>
        </h1>
        <p class="home-page__description">
          {{ t('pages.main.hero_description') }}
        </p>
      </div>

      <section
        class="home-page__carousel"
        :class="{ 'home-page__carousel--paused': !isRotating }"
        aria-labelledby="carousel-title"
        aria-describedby="carousel-description"
        @focusin="isFocused = true"
        @focusout="handleCarouselFocusOut">
        <h2 id="carousel-title" class="sr-only">
          {{ t('pages.main.carousel.title') }}
        </h2>
        <p id="carousel-description" class="sr-only">
          {{ t('pages.main.carousel.description') }}
        </p>

        <div class="home-page__artworks-viewport">
          <div
            id="home-artworks"
            class="home-page__artworks"
            aria-live="off"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false">
            <div
              v-for="artwork in currentArtworks"
              :key="artwork.id"
              class="home-page__artwork"
              :class="`home-page__artwork--${artwork.id}`">
              <Transition name="artwork-change" mode="out-in">
                <div
                  :key="artwork.src"
                  class="home-page__frame"
                  :style="{ '--artwork-aspect': artwork.aspect }">
                  <Image
                    :src="artwork.src"
                    :sizes="artwork.sizes"
                    max-height="var(--artwork-max-height)"
                    :title="artwork.title"
                    :alt="artwork.alt" />
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <div class="home-page__carousel-controls">
          <button
            type="button"
            class="home-page__carousel-control"
            aria-controls="home-artworks"
            :aria-label="t('pages.main.carousel.previous')"
            :title="t('pages.main.carousel.previous')"
            @click="changeArtworks(-1)">
            <Icon name="lucide:chevron-left" aria-hidden="true" />
          </button>
          <button
            v-if="!prefersReducedMotion"
            type="button"
            class="home-page__carousel-control home-page__carousel-control--rotation"
            aria-controls="home-artworks"
            :aria-label="rotationLabel"
            :title="rotationLabel"
            @click="toggleRotation">
            <Icon
              :name="isPaused ? 'lucide:play' : 'lucide:pause'"
              aria-hidden="true" />
          </button>
          <button
            type="button"
            class="home-page__carousel-control"
            aria-controls="home-artworks"
            :aria-label="t('pages.main.carousel.next')"
            :title="t('pages.main.carousel.next')"
            @click="changeArtworks(1)">
            <Icon name="lucide:chevron-right" aria-hidden="true" />
          </button>
        </div>
        <p class="sr-only" role="status">{{ artworkAnnouncement }}</p>
      </section>

      <div class="home-page__actions">
        <NuxtLink
          :to="localePath('/painting/acrylic/abstracts')"
          class="home-page__action">
          {{ t('pages.main.buttons.view_gallery') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/about')" class="home-page__action">
          {{ t('pages.main.buttons.about') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { imageDimensions } from '~/data/imageDimensions'

const { t } = useI18n()
const localePath = useLocalePath()

const artworkTracks = [
  {
    id: 'paintings',
    sizes: 'xs:100px, sm:150px, md:150px, lg:175px, xl:200px',
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
    sizes: 'xs:80px, sm:130px, md:130px, lg:150px, xl:180px',
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
    sizes: 'xs:80px, sm:100px, md:100px, lg:125px, xl:150px',
    entries: [
      ['/ceramics/CeramicInProgress.webp', 'ceramic_wip'],
      ['/og-images/contact.webp', 'creations'],
      ['/og-images/cv.webp', 'nature'],
      ['/og-images/my_artistic_approach.webp', 'my_artistic_approach'],
      ['/og-images/my_development.webp', 'my_development'],
    ],
  },
] as const

const currentIndices = useState('home-carousel-indices', () =>
  artworkTracks.map(() => 0)
)
const isPaused = useState('home-carousel-paused', () => false)

const isHovered = ref(false)
const isFocused = ref(false)
const isPageVisible = ref(true)
const prefersReducedMotion = ref(false)
const hasManualSelection = ref(false)

const currentArtworks = computed(() =>
  artworkTracks.map((track, index) => {
    const [src, key] = track.entries[currentIndices.value[index]!]!
    const [width, height] = imageDimensions[src]!

    return {
      ...track,
      src,
      aspect: width / height,
      title: t(`pictures.carousel.${key}.title`),
      alt: t(`pictures.carousel.${key}.alt`),
    }
  })
)
const artworkAnnouncement = computed(() =>
  hasManualSelection.value
    ? currentArtworks.value.map(artwork => artwork.title).join(', ')
    : ''
)
const isRotating = computed(
  () =>
    !isPaused.value &&
    !isHovered.value &&
    !isFocused.value &&
    isPageVisible.value &&
    !prefersReducedMotion.value
)
const rotationLabel = computed(() =>
  t(isPaused.value ? 'pages.main.carousel.resume' : 'pages.main.carousel.pause')
)

let rotationTimer: ReturnType<typeof setInterval> | undefined
let motionPreference: MediaQueryList | undefined

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
  isPaused.value = !isPaused.value

  if (!isPaused.value) {
    // An explicit restart can run while this control retains keyboard focus
    isFocused.value = false
  }
}

function syncRotation() {
  stopRotation()

  if (isRotating.value) {
    hasManualSelection.value = false
    rotationTimer = setInterval(() => advanceArtworks(1), 5000)
  }
}

function handleCarouselFocusOut(event: FocusEvent) {
  if (
    event.currentTarget instanceof HTMLElement &&
    event.relatedTarget instanceof Node &&
    event.currentTarget.contains(event.relatedTarget)
  ) {
    return
  }

  isFocused.value = false
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

watch(isRotating, syncRotation)

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', syncMotionPreference)
  document.addEventListener('visibilitychange', syncVisibility)

  syncMotionPreference()
  syncVisibility()
  syncRotation()
})

onBeforeUnmount(() => {
  stopRotation()
  motionPreference?.removeEventListener('change', syncMotionPreference)
  document.removeEventListener('visibilitychange', syncVisibility)
})

useHead(usePageSeo('home'))
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  min-width: 0;

  &__hero {
    display: grid;
    grid-template-areas: 'intro' 'carousel' 'actions';
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    justify-items: center;
    gap: $space-30;
    max-width: 1664px;
    margin-inline: auto;
  }

  &__intro {
    grid-area: intro;
    width: 100%;
    min-width: 0;
    max-width: 45rem;
    text-align: start;
    overflow-wrap: anywhere;
  }

  &__title {
    margin: 0 0 $space-30;
    font-weight: 300;
    line-height: 1.1;
  }

  &__title-line {
    display: block;
    color: var(--color-heading);
    font-size: clamp(3rem, 8vw, 5rem);
    letter-spacing: -0.125rem;

    &--accent {
      background: linear-gradient(
        135deg,
        var(--color-red-text),
        var(--color-hero-accent)
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      font-size: clamp(3rem, 3vw, 4rem);
      font-weight: 500;
    }
  }

  &__description {
    margin: 0;
    max-width: 31.25rem;
    color: var(--color-muted);
    font-size: 1.125rem;
    line-height: 1.6;
  }

  &__carousel {
    --artwork-padding: #{$space-10};
    grid-area: carousel;
    position: relative;
    width: 650px;
    min-width: 0;
    max-width: 100%;
  }

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
    box-sizing: content-box;
    width: min(
      var(--artwork-max-width),
      calc(var(--artwork-max-height) * var(--artwork-aspect))
    );
    padding: var(--artwork-padding);
    border-radius: $radius-panel;
    background: var(--color-surface);
    box-shadow: 0 $space-20 $space-40 $box-shadow-color;
    overflow-wrap: anywhere;

    :deep(img) {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto;
      aspect-ratio: var(--artwork-aspect);
      object-fit: contain;
    }
  }

  &__carousel-controls {
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

  &__carousel-control {
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
      width: 1.125rem;
      height: 1.125rem;
    }

    &:hover {
      background: var(--color-surface-warm);
    }

    &:focus-visible {
      outline-offset: -$focus-width;
    }
  }

  &__actions {
    grid-area: actions;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $space-15 $space-10;
    width: 100%;
    max-width: 31.25rem;
  }

  &__action {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: $control-size;
    max-width: 100%;
    padding: $space-20;
    border-radius: $space-8;
    background: var(--color-control-glass);
    color: inherit;
    font-size: 1.25rem;
    line-height: 1.25;
    text-align: center;
    overflow-wrap: anywhere;
    -webkit-backdrop-filter: blur($space-10);
    backdrop-filter: blur($space-10);

    &::before {
      position: absolute;
      inset: 0;
      padding: $space-2;
      border-radius: inherit;
      background: linear-gradient(
        90deg,
        $light-grey-color-2 0%,
        $light-grey-color-2 25%,
        $grey-blue-color 50%,
        $dark-red-color 75%,
        $grey-blue-color 100%
      );
      background-size: 400% auto;
      -webkit-mask:
        linear-gradient($white-color 0 0) content-box,
        linear-gradient($white-color 0 0);
      mask:
        linear-gradient($white-color 0 0) content-box,
        linear-gradient($white-color 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      content: '';
    }

    &:hover::before,
    &:focus-visible::before {
      background-position: -50% 0;
    }
  }
}

@media (min-width: calc($lg + $border-width)) {
  .home-page {
    &__hero {
      grid-template-areas: 'intro carousel' 'actions carousel';
      grid-template-columns: min(45rem, 54%) minmax(0, 650px);
      justify-content: space-around;
      gap: $space-50 $space-40;
    }

    &__intro {
      align-self: end;
      justify-self: start;
      max-width: none;
    }

    &__actions {
      align-self: start;
      justify-self: start;
    }
  }
}

@media (max-width: $xl) {
  .home-page {
    &__hero {
      column-gap: $space-20;
    }

    &__title-line {
      font-size: clamp(3rem, 5vw, 4rem);

      &--accent {
        font-size: clamp(2rem, 3vw, 4rem);
      }
    }

    &__carousel {
      width: 500px;
    }

    &__artworks {
      height: 450px;
    }

    &__carousel-controls {
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
  .home-page {
    --home-copy-width: clamp(31.25rem, 60vw, 37.5rem);

    &__intro {
      max-width: var(--home-copy-width);
    }

    &__description {
      max-width: var(--home-copy-width);
    }

    &__title-line {
      font-size: clamp(3rem, 6vw, 4rem);

      &--accent {
        font-size: clamp(2rem, 3vw, 3rem);
      }
    }

    &__carousel {
      width: 450px;
    }

    &__artworks {
      height: 300px;
    }

    &__carousel-controls {
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
      left: 2.5%;
    }

    &__artwork--ceramics {
      --artwork-max-width: 130px;
      --artwork-max-height: 140px;
      --artwork-left: 68.75%;
      top: 25%;
    }

    &__artwork--studio {
      --artwork-max-width: 100px;
      --artwork-max-height: 150px;
      top: 41.7%;
      left: 31.25%;
    }
  }
}

@media (min-width: calc($lg + $border-width)) and (max-width: $xl) {
  .home-page__hero {
    grid-template-columns: min(40rem, 54%) minmax(0, 500px);
  }
}

@media (min-width: 420px) and (max-width: $lg) {
  .home-page__actions {
    width: max-content;
    max-width: 100%;
    margin-top: -$space-10;
    column-gap: $space-20;
  }

  .home-page__action {
    margin-inline: auto;
  }
}

@media (max-width: $md) {
  .home-page__action {
    padding: $space-10;
  }
}

@media (max-width: $sm) {
  .home-page {
    &__carousel {
      --artwork-padding: #{$space-5};
      width: 360px;
    }

    &__artworks {
      height: 250px;
    }

    &__frame {
      border-radius: $space-5;
    }

    &__carousel-controls {
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
  .home-page {
    &__title-line {
      font-size: clamp(2rem, 14vw, 3rem);

      &--accent {
        font-size: 2rem;
      }
    }

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

@media (width < 420px) {
  .home-page__actions {
    justify-content: center;
  }
}

@media (max-width: calc($xs - $border-width)) {
  .home-page__artworks-viewport {
    overflow-x: auto;
    overscroll-behavior-x: contain;
  }

  .home-page__carousel-controls {
    margin-top: $space-12;
  }

  .home-page__artworks {
    height: 200px;
  }

  .home-page__artwork--paintings {
    --artwork-max-height: 170px;
  }

  .home-page__artwork--ceramics {
    top: $space-50;
  }

  .home-page__artwork--studio {
    top: $space-50 + $space-20;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .home-page {
    &__artwork {
      animation: floatBlock 8s ease-in-out infinite;

      &--ceramics {
        animation-delay: -2s;
      }

      &--studio {
        animation-delay: -4s;
      }
    }

    &__carousel--paused .home-page__artwork {
      animation-play-state: paused;
    }

    &__action::before {
      transition: background-position $transition-ui;
    }
  }

  .artwork-change-enter-active,
  .artwork-change-leave-active {
    transition: opacity $transition-viewer;
  }

  .artwork-change-enter-from,
  .artwork-change-leave-to {
    opacity: 0;
  }
}

@media (scripting: none) {
  .home-page__carousel-controls {
    display: none;
  }
}

@media (forced-colors: active) {
  .home-page__title-line--accent {
    background: none;
    color: CanvasText;
  }

  .home-page__action {
    border: $border-width solid LinkText;

    &::before {
      display: none;
    }
  }

  .home-page__carousel-controls {
    border-color: ButtonText;
    background: Canvas;
  }

  .home-page__carousel-control {
    color: ButtonText;
  }
}
</style>
