<template>
  <ClientOnly>
    <div ref="root" class="image-grid">
      <div
        v-for="(row, rIdx) in rows"
        :key="`row-${rIdx}`"
        class="image-row"
        aria-hidden="false">
        <div
          v-for="(item, iIdx) in row.items"
          :key="`item-${rIdx}-${iIdx}`"
          :class="item.isOnError ? 'image-cell-error' : 'image-cell'"
          :style="
            !item.isOnError
              ? {
                  width: `${Math.round(item.renderWidth)}px`,
                  height: `${Math.round(row.rowHeight)}px`,
                }
              : {}
          ">
          <NuxtLink :to="baseUrl + item.imageSource.src" class="cell-link">
            <img
              :src="item.imageSource.src"
              :alt="item.imageSource.alt ?? ''"
              loading="lazy"
              v-bind="nuxtImgWidthBinding(item)"
              class="img" />
            <div v-if="item.imageSource.title" class="image-title-overlay">
              {{ item.imageSource.title }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </ClientOnly>
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

const root = ref<HTMLElement | null>(null)
const rows = ref<Row[]>([])
const internalItems = ref<ItemInternal[]>([])
const runtimeConfig = useRuntimeConfig()
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)

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

// Prepare NuxtImg binding for width (only send width if positive integer)
function nuxtImgWidthBinding(item: ItemInternal): Record<string, number> {
  const width = Math.max(1, Math.round(item.renderWidth))
  return { width }
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

      .cell-link {
        width: 100%;
        height: 100%;
        position: relative;
        display: block;
        line-height: 0;
        text-decoration: none;

        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 12px;
          transition: transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
          object-fit: contain;
          transform-origin: center center;
          -webkit-user-drag: none;
          user-select: none;
        }
      }
    }

    .image-cell-error {
      .cell-link {
        img {
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

        .cell-link {
          .image-title-overlay {
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            padding: 16px 12px 12px;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.3;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
            pointer-events: none;
            color: $white-color;
            background: linear-gradient(
              to top,
              rgba(44, 24, 16, 0.9) 0%,
              rgba(44, 24, 16, 0.7) 60%,
              transparent 100%
            );
          }
        }
      }

      .image-cell:hover .img,
      .image-cell:focus-within .img {
        transform: scale(1.12);
      }

      .image-cell:hover .image-title-overlay,
      .image-cell:focus-within .image-title-overlay {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  // Mobile: show title on tap/touch or small screens
  @media ((hover: none) or (max-width: $md)) {
    .image-row {
      margin-bottom: 40px;

      .image-cell {
        overflow: visible;

        .cell-link {
          img {
            transition: none;
          }

          .image-title-overlay {
            padding-top: 10px;
            text-align: center;
            font-size: 12px;
            text-wrap: wrap;
          }
        }
      }

      .image-cell-error {
        .cell-link {
          .image-title-overlay {
            font-size: 12px;
          }
        }
      }
    }

    .image-row .image-cell-error {
      margin-bottom: -20px;
    }
  }
}
</style>
