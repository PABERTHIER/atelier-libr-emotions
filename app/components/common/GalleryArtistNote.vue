<template>
  <details
    ref="disclosure"
    class="gallery-artist-note"
    :class="{ 'gallery-artist-note--closing': isClosing }">
    <summary class="gallery-artist-note__toggle" @click="toggleNote">
      <span class="gallery-artist-note__quote" aria-hidden="true">“</span>
      <span>{{ t('pages.gallery.artist_note') }}</span>
      <span class="gallery-artist-note__indicator" aria-hidden="true" />
    </summary>

    <div ref="content" class="gallery-artist-note__content">
      <figure class="gallery-artist-note__panel">
        <blockquote class="gallery-artist-note__text">
          <p>{{ props.text }}</p>
        </blockquote>
        <figcaption class="gallery-artist-note__signature">
          {{ artistName }}
        </figcaption>
      </figure>
    </div>
  </details>
</template>

<script setup lang="ts">
import { artistName } from '~/data/site'

const props = defineProps<{ text: string }>()

const { t } = useI18n()

const disclosure = useTemplateRef<HTMLDetailsElement>('disclosure')
const content = useTemplateRef<HTMLDivElement>('content')
const reducedMotion = useNativeMediaQuery('(prefers-reduced-motion: reduce)')

const isClosing = ref(false)

let animation: Animation | undefined
let targetOpen = false

function completeAnimation() {
  if (disclosure.value) {
    disclosure.value.open = targetOpen
  }

  animation?.cancel()

  animation = undefined
  isClosing.value = false
}

function toggleNote(event: MouseEvent) {
  const details = disclosure.value
  const panel = content.value

  if (!details || !panel) {
    return
  }

  event.preventDefault()

  targetOpen = animation ? !targetOpen : !details.open

  if (reducedMotion.value) {
    completeAnimation()
    return
  }

  // Reverse from the currently painted frame, including during rapid toggles
  const startHeight = details.open ? panel.getBoundingClientRect().height : 0
  const startOpacity = details.open ? getComputedStyle(panel).opacity : '0'

  animation?.cancel()

  details.open = true
  isClosing.value = !targetOpen

  const endHeight = targetOpen ? panel.getBoundingClientRect().height : 0

  const nextAnimation = panel.animate(
    [
      { height: `${startHeight}px`, opacity: startOpacity },
      { height: `${endHeight}px`, opacity: targetOpen ? 1 : 0 },
    ],
    { duration: 380, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' }
  )

  animation = nextAnimation

  nextAnimation.onfinish = () => {
    if (animation === nextAnimation) {
      completeAnimation()
    }
  }
}

watch(reducedMotion, reduced => {
  if (reduced && animation) {
    completeAnimation()
  }
})

onBeforeUnmount(() => {
  animation?.cancel()
})
</script>

<style lang="scss" scoped>
.gallery-artist-note {
  max-width: 44rem;
  margin: $space-20 auto 0;
  color: var(--color-text);

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-12;
    width: fit-content;
    min-height: $control-size;
    max-width: 100%;
    margin-inline: auto;
    padding: $space-8 $space-18;
    border: $border-width solid var(--color-border);
    border-radius: $radius-pill;
    background: var(--color-surface-soft);
    color: var(--color-accent);
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
    overflow-wrap: anywhere;
    list-style: none;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    &:hover,
    &:focus-visible {
      background: var(--color-surface-warm);
      border-color: var(--color-accent);
    }
  }

  &__quote {
    flex: none;
    height: $space-20;
    color: var(--color-copper-text);
    font-family: Georgia, serif;
    font-size: 2rem;
    line-height: 1;
  }

  &__indicator {
    position: relative;
    flex: none;
    width: $space-12;
    height: $space-12;

    &::before,
    &::after {
      position: absolute;
      inset: 0;
      width: $space-12;
      height: $space-2;
      margin: auto;
      background: currentColor;
      content: '';
    }

    &::after {
      transform: rotate(90deg);
    }
  }

  &[open]:not(&--closing) &__indicator::after {
    transform: rotate(0);
  }

  &__content {
    display: flow-root;
    overflow: hidden;
  }

  &__panel {
    margin: $space-18 0 0;
    padding: $space-25 $space-30;
    border: $border-width solid var(--color-border);
    border-inline-start: $space-2 solid var(--color-copper-text);
    border-radius: $radius-panel;
    background: var(--color-surface-soft);
    text-align: start;
    overflow-wrap: anywhere;
  }

  &__text {
    margin: 0;
    font-size: 1.0625rem;
    line-height: 1.8;

    p {
      margin: 0;
    }
  }

  &__signature {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $space-12;
    margin-top: $space-18;
    color: var(--color-copper-text);
    font-size: 0.9375rem;
    font-style: italic;

    &::before {
      flex: none;
      width: $space-24;
      height: $border-width;
      background: currentColor;
      content: '';
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .gallery-artist-note__panel {
    padding: $space-20;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .gallery-artist-note {
    &__toggle {
      transition:
        background-color $transition-ui,
        border-color $transition-ui;
    }

    &__indicator::after {
      transition: transform $transition-ui;
    }
  }
}

@media (forced-colors: active) {
  .gallery-artist-note__indicator::before,
  .gallery-artist-note__indicator::after {
    background: ButtonText;
  }
}
</style>
