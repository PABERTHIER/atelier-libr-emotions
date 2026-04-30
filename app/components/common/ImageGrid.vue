<template>
  <div ref="root" class="image-grid">
    <template v-if="rows.length > 0">
      <div
        v-for="(row, rIdx) in rows"
        :key="`row-${rIdx}`"
        class="image-row"
        aria-hidden="false">
        <div
          v-for="(item, iIdx) in row.items"
          :key="`item-${rIdx}-${iIdx}`"
          :class="item.isOnError ? 'image-cell-error' : 'image-cell'"
          :style="{
            width: `${Math.round(item.renderWidth)}px`,
            height: `${Math.round(row.rowHeight)}px`,
          }">
          <ImageGridItem
            :item="item"
            :is-mobile="device.isMediumOrBelowScreen.value"
            @select="selectedImage = item.imageSource" />
        </div>
      </div>
    </template>
    <div v-else class="image-grid-skeleton" />

    <ImagePreviewModal
      :image="selectedImage ?? fallbackImage"
      :visible="selectedImage !== null"
      @close="selectedImage = null" />
  </div>
</template>

<script setup lang="ts">
import type { Heights, ImageSource, ItemInternal, Row } from '~/types/image'

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

const device = useScreenSize()

const root = ref<HTMLElement | null>(null)
const rows = ref<Row[]>([])
const internalItems = ref<ItemInternal[]>([])
const runtimeConfig = useRuntimeConfig()
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)

const selectedImage = ref<ImageSource | null>(null)
const fallbackImage: ImageSource = { src: '' }

const GAP_PX = 24
const TOLERANCE_WIDTH_PX = 20 // Small tolerance for "almost same" width
const TOLERANCE_SCROLLBAR_WIDTH_PX = 10

let resizeObserver: ResizeObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null
let lastContainerWidth = 0
let lastRowsSnapshot: Row[] | null = null

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

async function ensureAspects(): Promise<void> {
  internalItems.value = props.images.map(img => ({
    imageSource: img,
    aspect: 0,
    renderWidth: 0,
    isOnError: false,
  }))

  const promises: Promise<void>[] = []
  for (const item of internalItems.value) {
    const promise = new Promise<void>(resolve => {
      const image = new Image()
      image.src = baseUrl.value + item.imageSource.src

      if (image.complete) {
        const width = image.naturalWidth || 1
        const height = image.naturalHeight || 1
        item.aspect = Math.max(0.01, width / height)
        resolve()
      } else {
        image.onload = () => {
          const width = image.naturalWidth || 1
          const height = image.naturalHeight || 1
          item.aspect = Math.max(0.01, width / height)
          resolve()
        }
        image.onerror = () => {
          // Fallback safe square
          item.aspect = 1
          item.isOnError = true
          resolve()
        }
      }
    })

    promises.push(promise)
  }
  await Promise.all(promises)
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

async function computeLayout(): Promise<void> {
  if (!root.value) {
    return
  }

  const containerWidth = Math.max(1, Math.floor(root.value.clientWidth))
  const delta = Math.abs(containerWidth - lastContainerWidth)

  // Skip exact same width to avoid redundant recompute
  // Or skip with a tolerance when scrollbar can appear on the screen
  if (delta === 0 || delta < TOLERANCE_SCROLLBAR_WIDTH_PX) {
    return
  }

  await ensureAspects()
  const targetHeight = pickTargetHeightPx(containerWidth)
  const newRows = buildRows(containerWidth, targetHeight)

  // Security to prevent layout flickering when being between two rows length choices
  // Prefer the layout with fewer images
  if (
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

onMounted(async () => {
  await computeLayout()

  if (root.value) {
    resizeObserver = new ResizeObserver(() => {
      // Debounce rapid resize
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }

      resizeTimer = setTimeout(async () => {
        await computeLayout()
      }, 80)
    })

    resizeObserver.observe(root.value)
  }
})

onBeforeUnmount(() => {
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
  async () => {
    await computeLayout()
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
@use 'sass:color';

.image-grid {
  width: 100%;
  box-sizing: border-box;

  :deep(.image-cell) {
    animation: fadeInUpBlock 0.8s ease-out;
    animation-fill-mode: both;

    @for $i from 1 through 15 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }

  .image-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px; // Must match GAP_PX constant
    margin-bottom: 24px;

    .image-cell {
      position: relative;
      border-radius: 12px;
      box-shadow: 0 4px 16px $box-shadow-color;
      background-color: transparent;
    }

    .image-cell-error {
      position: relative;

      :deep(.grid-item) {
        .img {
          border-radius: 12px;
        }

        .image-title-overlay {
          text-align: center;
          font-size: 15px;
          text-wrap: wrap;
        }
      }
    }
  }

  @media ((min-width: $md) and (hover: hover)) {
    .image-row {
      .image-cell {
        overflow: hidden;
      }

      .image-cell:hover :deep(.img),
      .image-cell:focus-within :deep(.img) {
        transform: scale(1.12);
      }

      .image-cell:hover :deep(.image-title-overlay),
      .image-cell:focus-within :deep(.image-title-overlay) {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  // Mobile: show title on tap/touch or small screens
  @media ((hover: none) or (max-width: calc($md - 1px))) {
    .image-row {
      margin-bottom: 40px;

      .image-cell {
        overflow: visible;
      }

      .image-cell-error {
        :deep(.grid-item) {
          .image-title-overlay {
            font-size: 12px;
          }
        }
      }
    }

    .image-row .image-cell-error {
      overflow: visible;
    }
  }
}

.image-grid-skeleton {
  width: 100%;
  min-height: 300px;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    $warm-beige 25%,
    color.adjust($warm-beige, $lightness: 4%) 50%,
    $warm-beige 75%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s ease-in-out infinite;
}
</style>
