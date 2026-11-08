<template>
  <div ref="root" class="image-grid" :aria-busy="rows.length === 0">
    <template v-if="rows.length > 0">
      <div
        v-for="(row, rIdx) in rows"
        :key="`row-${rIdx}`"
        class="image-grid__row">
        <div
          v-for="(item, iIdx) in row.items"
          :key="`item-${rIdx}-${iIdx}`"
          class="image-grid__cell"
          :class="{ 'image-grid__cell--error': item.isOnError }"
          :style="{
            width: `${Math.round(item.renderWidth)}px`,
            '--artwork-height': `${Math.round(row.rowHeight)}px`,
          }"
          @focusin="finishEntranceAnimation">
          <ImageGridItem
            :item="item"
            :load="shouldLoadImages"
            :is-mobile="device.isMediumOrBelowScreen.value"
            @load="updateAspect(item, $event)"
            @error="markImageError(item)"
            @select="openViewer(item.imageSource, $event)" />
        </div>
      </div>
    </template>
    <div v-else class="image-grid__skeleton" role="status">
      <span class="sr-only">{{ t('components.image_grid.loading') }}</span>
    </div>

    <ImagePreviewModal
      :image="selectedImage ?? fallbackImage"
      :images="props.images"
      :opener="viewerOpener"
      :visible="selectedImage !== null"
      @select="selectedImage = $event"
      @close="closeViewer" />
  </div>
</template>

<script setup lang="ts">
import type { Heights, ImageSource, ItemInternal, Row } from '~/types/image'
import { imageDimensions } from '~/data/imageDimensions'

const props = defineProps({
  images: {
    type: Array as PropType<ImageSource[]>,
    required: true,
  },
  heights: {
    type: Object as PropType<Heights>,
    required: true,
  },
})

const { t } = useI18n()
const device = useScreenSize()

const root = ref<HTMLElement | null>(null)
const rows = ref<Row[]>([])
const internalItems = ref<ItemInternal[]>(createItems())
const shouldLoadImages = ref(false)
const selectedImage = ref<ImageSource | null>(null)
const viewerOpener = shallowRef<HTMLButtonElement | null>(null)
const fallbackImage = computed<ImageSource>(() => ({
  src: '',
  alt: t('components.image_preview_modal.image_unavailable'),
}))

const GAP_PX = 24
const TOLERANCE_WIDTH_PX = 20 // Small tolerance for "almost same" width
const TOLERANCE_SCROLLBAR_WIDTH_PX = 10

let resizeObserver: ResizeObserver | null = null
let visibilityObserver: IntersectionObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null
let lastContainerWidth = 0
let lastRowsSnapshot: Row[] | null = null

function finishEntranceAnimation(event: FocusEvent) {
  // Keyboard users can reach a tile before the observer callback runs
  activateImages()

  if (!(event.currentTarget instanceof HTMLElement)) {
    return
  }

  for (const animation of event.currentTarget.getAnimations()) {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName === 'fadeInUpBlock'
    ) {
      animation.finish()
    }
  }
}

function openViewer(image: ImageSource, event: MouseEvent) {
  viewerOpener.value =
    event.currentTarget instanceof HTMLButtonElement
      ? event.currentTarget
      : null
  selectedImage.value = image
}

function closeViewer() {
  selectedImage.value = null
  viewerOpener.value = null
}

function pickTargetHeightPx(containerWidth: number): number {
  if (containerWidth <= 480) {
    return props.heights.xs
  }

  if (containerWidth <= 768) {
    return props.heights.sm
  }

  if (containerWidth <= 1024) {
    return props.heights.md
  }

  return props.heights.lg
}

function activateImages() {
  shouldLoadImages.value = true
  visibilityObserver?.disconnect()
  visibilityObserver = null
}

function createItems(): ItemInternal[] {
  // Reserve every row without downloading artwork, including offscreen grids
  return props.images.map(imageSource => {
    const dimensions = imageDimensions[imageSource.src]

    return {
      imageSource,
      aspect: dimensions ? Math.max(0.01, dimensions[0] / dimensions[1]) : 1,
      renderWidth: 0,
      isOnError: false,
    }
  })
}

function updateAspect(item: ItemInternal, aspect: number) {
  const internalItem = internalItems.value.find(
    entry => entry.imageSource.src === item.imageSource.src
  )

  item.isOnError = false

  if (!internalItem) {
    return
  }

  internalItem.isOnError = false

  // An uncatalogued image can still correct its square placeholder on load
  if (
    !imageDimensions[item.imageSource.src] &&
    internalItem.aspect !== aspect
  ) {
    internalItem.aspect = aspect
    computeLayout(true)
  }
}

function markImageError(item: ItemInternal) {
  const internalItem = internalItems.value.find(
    entry => entry.imageSource.src === item.imageSource.src
  )

  item.isOnError = true

  if (internalItem) {
    internalItem.isOnError = true
  }
}

function buildRows(containerWidth: number, targetRowHeight: number): Row[] {
  const rowsLocal: Row[] = []
  const items = internalItems.value.slice()

  let idx = 0

  while (idx < items.length) {
    let sumAspect = 0
    const rowItems: ItemInternal[] = []

    while (idx < items.length) {
      const item = items[idx]

      // Always advance index to avoid infinite loops
      idx++

      if (!item) {
        continue
      }

      rowItems.push(item)
      sumAspect += item.aspect

      const projectedWidth =
        sumAspect * targetRowHeight + GAP_PX * (rowItems.length - 1)

      if (projectedWidth >= containerWidth) {
        break
      }
    }

    if (rowItems.length === 0) {
      break
    }

    const isLastRow = idx >= items.length
    const aspectLength = sumAspect > 0 ? sumAspect : rowItems.length
    const rowHeightFull =
      (containerWidth - GAP_PX * (rowItems.length - 1)) / aspectLength

    // For the last row that didn't reach width, keep the targetRowHeight to avoid overstretching
    const projectedWidthAtTarget =
      sumAspect * targetRowHeight + GAP_PX * (rowItems.length - 1)

    const finalHeight =
      isLastRow && projectedWidthAtTarget < containerWidth
        ? targetRowHeight
        : rowHeightFull

    for (const rowItem of rowItems) {
      rowItem.renderWidth = finalHeight * rowItem.aspect
    }

    rowsLocal.push({
      items: rowItems.map(x => ({ ...x })),
      rowHeight: finalHeight,
    })
  }
  return rowsLocal
}

function findBestMatchingPrevRow(
  newRow: Row,
  prevRows: Row[] | null
): Row | null {
  if (!prevRows || prevRows.length === 0) {
    return null
  }

  const newSrcs = new Set(newRow.items.map(it => it.imageSource.src))

  let bestMatch: Row | null = null
  let bestOverlap = 0

  for (const prevRow of prevRows) {
    let overlap = 0

    for (const item of prevRow.items) {
      if (newSrcs.has(item.imageSource.src)) {
        overlap++
      }
    }

    if (overlap > bestOverlap) {
      bestOverlap = overlap
      bestMatch = prevRow
    }
  }

  if (!bestMatch) {
    return null
  }

  const smallerLength = Math.min(newRow.items.length, bestMatch.items.length)

  if (smallerLength === 0) {
    return null
  }

  const overlapRatio = bestOverlap / smallerLength

  return overlapRatio >= 0.5 ? bestMatch : null
}

function computeLayout(force = false): void {
  if (!root.value) {
    return
  }

  const containerWidth = Math.max(1, Math.floor(root.value.clientWidth))
  const delta = Math.abs(containerWidth - lastContainerWidth)

  // Skip exact same width to avoid redundant recompute
  // Or skip with a tolerance when scrollbar can appear on the screen
  if (!force && (delta === 0 || delta < TOLERANCE_SCROLLBAR_WIDTH_PX)) {
    return
  }

  const targetHeight = pickTargetHeightPx(containerWidth)
  const newRows = buildRows(containerWidth, targetHeight)

  // Security to prevent layout flickering when being between two rows length choices
  // Prefer the layout with fewer images
  if (
    !force &&
    lastRowsSnapshot &&
    Math.abs(containerWidth - lastContainerWidth) <= TOLERANCE_WIDTH_PX
  ) {
    for (const newRow of newRows) {
      const matchedPrev = findBestMatchingPrevRow(newRow, lastRowsSnapshot)

      if (matchedPrev) {
        if (newRow.items.length > matchedPrev.items.length) {
          lastContainerWidth = containerWidth

          return
        }
      }
    }

    let matchedCount = 0

    for (const newRow of newRows) {
      if (findBestMatchingPrevRow(newRow, lastRowsSnapshot)) {
        matchedCount++
      }
    }

    if (newRows.length > 0 && matchedCount < Math.floor(newRows.length / 2)) {
      lastContainerWidth = containerWidth

      return
    }
  }

  rows.value = newRows

  lastRowsSnapshot = newRows.map(row => ({
    rowHeight: row.rowHeight,
    items: row.items.map(item => ({ ...item })),
  }))

  lastContainerWidth = containerWidth
}

onMounted(() => {
  computeLayout()

  if (root.value) {
    if ('IntersectionObserver' in window) {
      visibilityObserver = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            activateImages()
          }
        },
        { rootMargin: '300px 0px' }
      )

      visibilityObserver.observe(root.value)
    } else {
      activateImages()
    }

    resizeObserver = new ResizeObserver(() => {
      // Debounce rapid resize
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }

      resizeTimer = setTimeout(() => {
        computeLayout()
      }, 80)
    })

    resizeObserver.observe(root.value)
  }
})

onBeforeUnmount(() => {
  visibilityObserver?.disconnect()
  visibilityObserver = null

  if (resizeObserver && root.value) {
    resizeObserver.unobserve(root.value)
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (resizeTimer) {
    clearTimeout(resizeTimer)
    resizeTimer = null
  }
})

watch(
  () => props.images,
  images => {
    const items = rows.value.flatMap(row => row.items)
    const sameSources =
      items.length === images.length &&
      items.every((item, index) => item.imageSource.src === images[index]?.src)

    if (sameSources) {
      const updateSources = (entries: ItemInternal[]) => {
        entries.forEach((item, index) => {
          const source = images[index]

          if (source) {
            item.imageSource = source
          }
        })
      }

      updateSources(items)
      updateSources(internalItems.value)

      if (lastRowsSnapshot) {
        updateSources(lastRowsSnapshot.flatMap(row => row.items))
      }

      if (selectedImage.value) {
        selectedImage.value =
          images.find(image => image.src === selectedImage.value?.src) ?? null
      }

      return
    }

    lastContainerWidth = 0
    lastRowsSnapshot = null
    internalItems.value = createItems()

    computeLayout()
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.image-grid {
  width: 100%;
  min-width: 0;

  @media (prefers-reduced-motion: no-preference) {
    &__cell:not(.image-grid__cell--error) {
      animation: fadeInUpBlock 0.8s ease-out;
      animation-fill-mode: both;

      @for $i from 1 through 15 {
        &:nth-child(#{$i}) {
          animation-delay: #{$i * 0.1}s;
        }
      }
    }
  }

  &__row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: $space-24; // Must match GAP_PX constant
    margin-bottom: $space-24;
  }

  &__cell {
    position: relative;
    min-width: 0;
    border-radius: $radius-panel;
    box-shadow: 0 $space-4 $space-16 $box-shadow-color;
    background-color: transparent;

    &--error {
      box-shadow: none;
    }
  }

  @media ((min-width: $breakpoint-tablet) and (hover: hover)) {
    &__row {
      .image-grid__cell:not(.image-grid__cell--error) {
        overflow: hidden;
      }

      @media (prefers-reduced-motion: no-preference) {
        .image-grid__cell
          :deep(.grid-item__button:focus-visible .grid-item__image) {
          transform: scale($artwork-hover-scale);
        }

        @media (pointer: fine) {
          .image-grid__cell:hover :deep(.grid-item__image) {
            transform: scale($artwork-hover-scale);
          }
        }
      }
    }
  }

  // Mobile: show title on tap/touch or small screens
  @media (hover: none),
    (pointer: coarse),
    (max-width: calc($breakpoint-tablet - $border-width)) {
    &__row {
      margin-bottom: $space-20;

      .image-grid__cell {
        overflow: visible;
      }
    }

    .image-grid__cell--error {
      overflow: visible;
    }
  }
}

.image-grid__skeleton {
  width: 100%;
  min-height: 18.75rem;
  border-radius: $radius-panel;
  background: linear-gradient(
    90deg,
    var(--color-surface-warm) 25%,
    var(--color-skeleton-highlight) 50%,
    var(--color-surface-warm) 75%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s ease-in-out infinite;
}
</style>
