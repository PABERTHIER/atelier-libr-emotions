<template>
  <Teleport :to="container">
    <div
      v-if="visible"
      ref="tooltip"
      class="site-tooltip"
      :class="{
        'site-tooltip--dialog': container !== 'body',
        'site-tooltip--above': position.above,
      }"
      role="tooltip"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
        visibility: positioned ? 'visible' : 'hidden',
      }">
      {{ label }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const route = useRoute()

const visible = ref(false)
const positioned = ref(false)
const label = ref('')
const container = shallowRef<HTMLElement | 'body'>('body')
const tooltip = useTemplateRef('tooltip')
const position = ref({ x: 0, y: 0, above: true })

let activeTarget: HTMLElement | null = null
let pendingTarget: HTMLElement | null = null
let openedByFocus = false
let delayTimer: ReturnType<typeof setTimeout> | undefined
let leaveTimer: ReturnType<typeof setTimeout> | undefined
let positionFrame = 0
let hoverMedia: MediaQueryList | null = null
let observer: MutationObserver | undefined
let resizeObserver: ResizeObserver | undefined

function tooltipTarget(event: Event) {
  if (!(event.target instanceof Element)) {
    return null
  }

  const target = event.target.closest<HTMLElement>('[data-tooltip]')

  return target?.matches(':disabled, [aria-disabled="true"]') ||
    target?.closest('[inert]')
    ? null
    : target
}

function cancelLeave() {
  clearTimeout(leaveTimer)
  leaveTimer = undefined
}

function hide() {
  clearTimeout(delayTimer)
  cancelLeave()

  observer?.disconnect()
  resizeObserver?.disconnect()

  delayTimer = undefined
  pendingTarget = null
  activeTarget = null
  openedByFocus = false

  visible.value = false
  positioned.value = false
  container.value = 'body'

  if (positionFrame) {
    cancelAnimationFrame(positionFrame)
    positionFrame = 0
  }
}

function updatePosition(target: HTMLElement) {
  const text = target.dataset.tooltip?.trim()
  const surface = container.value === 'body' ? null : container.value
  const dialog = surface?.closest('dialog')

  if (
    !target.isConnected ||
    !text ||
    !target.getClientRects().length ||
    target.matches(':disabled, [aria-disabled="true"]') ||
    target.closest('[inert]') ||
    (dialog && !dialog.matches('[open]'))
  ) {
    hide()
    return
  }

  label.value = text

  const rect = target.getBoundingClientRect()
  const bounds = surface?.getBoundingClientRect()

  // Page hints stay between the shell controls; hints on those controls stay free
  const header =
    !surface && !target.closest('.site-header')
      ? document.querySelector('.site-header')?.getBoundingClientRect()
      : null
  const footer =
    !surface && !target.closest('.site-footer')
      ? document.querySelector('.site-footer')?.getBoundingClientRect()
      : null

  const left = Math.max(0, bounds?.left ?? 0)
  const top = Math.max(0, bounds?.top ?? header?.bottom ?? 0)
  const right = Math.min(window.innerWidth, bounds?.right ?? window.innerWidth)
  const bottom = Math.min(
    window.innerHeight,
    bounds?.bottom ?? footer?.top ?? window.innerHeight
  )

  if (
    rect.bottom < top ||
    rect.top > bottom ||
    rect.right < left ||
    rect.left > right
  ) {
    hide()
    return
  }

  const width = tooltip.value?.offsetWidth ?? 0
  const height = tooltip.value?.offsetHeight ?? 0
  const gap = 18
  const gutter = 12
  const above =
    rect.top - top >= height + gap + gutter ||
    rect.top - top > bottom - rect.bottom

  const x = Math.max(
    left + gutter,
    Math.min(rect.left + (rect.width - width) / 2, right - width - gutter)
  )
  const y = Math.max(
    top + gutter,
    Math.min(
      above ? rect.top - height - gap : rect.bottom + gap,
      bottom - height - gutter
    )
  )

  position.value = {
    x:
      x -
      (bounds?.left ?? 0) -
      (surface?.clientLeft ?? 0) +
      (surface?.scrollLeft ?? 0),
    y:
      y -
      (bounds?.top ?? 0) -
      (surface?.clientTop ?? 0) +
      (surface?.scrollTop ?? 0),
    above,
  }
  positioned.value = true
}

function schedulePosition() {
  if (!visible.value || !activeTarget || positionFrame) {
    return
  }

  positionFrame = requestAnimationFrame(() => {
    positionFrame = 0

    if (activeTarget) {
      updatePosition(activeTarget)
    }
  })
}

function show(target: HTMLElement, fromFocus = false) {
  const text = target.dataset.tooltip?.trim()

  if (!text || !target.isConnected) {
    return
  }

  pendingTarget = null
  delayTimer = undefined
  activeTarget = target
  openedByFocus = fromFocus

  label.value = text
  container.value =
    target.closest<HTMLElement>('[data-tooltip-boundary], dialog[open]') ??
    'body'
  visible.value = true

  // Keep an open hint in sync with translated labels and changing control state
  observer?.observe(target, {
    attributes: true,
    attributeFilter: ['data-tooltip', 'disabled', 'aria-disabled'],
  })

  void nextTick(() => {
    if (activeTarget === target) {
      updatePosition(target)
      resizeObserver?.observe(target)

      if (tooltip.value) {
        resizeObserver?.observe(tooltip.value)
      }
    }
  })
}

function handlePointerOver(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !hoverMedia?.matches) {
    return
  }

  if (event.target instanceof Node && tooltip.value?.contains(event.target)) {
    cancelLeave()
    return
  }

  const target = tooltipTarget(event)

  if (target === activeTarget) {
    cancelLeave()
    return
  }

  if (!target || target === pendingTarget) {
    return
  }

  hide()

  pendingTarget = target
  delayTimer = setTimeout(() => show(target), 450)
}

function handlePointerOut(event: PointerEvent) {
  if (event.pointerType !== 'mouse') {
    return
  }

  const target = tooltipTarget(event)
  const fromTooltip =
    event.target instanceof Node && tooltip.value?.contains(event.target)
  const related = event.relatedTarget

  if (
    related instanceof Node &&
    (activeTarget?.contains(related) ||
      tooltip.value?.contains(related) ||
      pendingTarget?.contains(related))
  ) {
    return
  }

  if (target && target === pendingTarget) {
    hide()
  } else if ((target === activeTarget || fromTooltip) && !openedByFocus) {
    cancelLeave()
    leaveTimer = setTimeout(hide, 150)
  }
}

function handleFocusIn(event: FocusEvent) {
  const target = tooltipTarget(event)

  if (
    document.documentElement.hasAttribute('data-pointer-input') ||
    !target?.matches(':focus-visible')
  ) {
    return
  }

  const previousDialog =
    event.relatedTarget instanceof Element
      ? event.relatedTarget.closest('dialog')
      : null

  // Native modal entry/return moves focus automatically; wait for deliberate focus
  if (target.closest('dialog') !== previousDialog) {
    return
  }

  hide()
  show(target, true)
}

function handleFocusOut(event: FocusEvent) {
  if (tooltipTarget(event) === activeTarget) {
    hide()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && (visible.value || pendingTarget)) {
    // Dismiss the hint before an enclosing disclosure or modal handles Escape
    event.preventDefault()
    event.stopPropagation()

    hide()
  }
}

onMounted(() => {
  hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)')
  observer = new MutationObserver(schedulePosition)
  resizeObserver = new ResizeObserver(schedulePosition)

  document.addEventListener('pointerover', handlePointerOver)
  document.addEventListener('pointerout', handlePointerOut)
  document.addEventListener('focusin', handleFocusIn)
  document.addEventListener('focusout', handleFocusOut)
  document.addEventListener('pointerdown', hide, true)
  document.addEventListener('click', hide, true)
  document.addEventListener('keydown', handleKeydown, true)
  document.addEventListener('close', hide, true)
  window.addEventListener('scroll', schedulePosition, {
    capture: true,
    passive: true,
  })
  window.addEventListener('resize', schedulePosition)
})

onBeforeUnmount(() => {
  hide()
  hoverMedia = null

  document.removeEventListener('pointerover', handlePointerOver)
  document.removeEventListener('pointerout', handlePointerOut)
  document.removeEventListener('focusin', handleFocusIn)
  document.removeEventListener('focusout', handleFocusOut)
  document.removeEventListener('pointerdown', hide, true)
  document.removeEventListener('click', hide, true)
  document.removeEventListener('keydown', handleKeydown, true)
  document.removeEventListener('close', hide, true)
  window.removeEventListener('scroll', schedulePosition, true)
  window.removeEventListener('resize', schedulePosition)
})

watch(() => route.fullPath, hide)
</script>

<style lang="scss" scoped>
.site-tooltip {
  position: fixed;
  z-index: $tooltip-z-index;
  width: max-content;
  max-width: min(17.5rem, calc(100vw - #{$space-24}));
  padding: $space-8 $space-12;
  border: $border-width solid var(--color-tooltip-border);
  border-radius: $radius-control;
  background: var(--color-tooltip-background);
  color: var(--color-tooltip-text);
  box-shadow: $shadow-panel;
  font-family: $body-font;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  overflow-wrap: anywhere;

  // Bridge the visual gap so the hint remains reachable with a pointer
  &::before {
    position: absolute;
    right: 0;
    bottom: 100%;
    left: 0;
    height: $space-18;
    content: '';
  }

  &--above::before {
    top: 100%;
    bottom: auto;
  }

  &--dialog {
    position: absolute;
    max-width: min(17.5rem, calc(100% - #{$space-24}));
  }
}

@media (forced-colors: active) {
  .site-tooltip {
    border-color: CanvasText;
    background: Canvas;
    color: CanvasText;
    box-shadow: none;
  }
}
</style>
