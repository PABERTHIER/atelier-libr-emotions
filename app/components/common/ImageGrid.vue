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
          class="image-cell"
          :style="{
            width: `${Math.round(item.renderWidth)}px`,
            height: `${Math.round(row.rowHeight)}px`,
          }">
          <NuxtLink :to="baseUrl + item.imageSource.src" class="cell-link">
            <NuxtImg
              :src="item.imageSource.src"
              :alt="item.imageSource.alt ?? ''"
              :title="item.imageSource.title ?? ''"
              densities="x1 x2"
              loading="lazy"
              placeholder
              v-bind="nuxtImgWidthBinding(item)"
              class="img" />
            <!-- <img
              :src="item.imageSource.src"
              :alt="item.imageSource.alt ?? ''"
              :title="item.imageSource.title ?? ''"
              loading="lazy"
              v-bind="nuxtImgWidthBinding(item)"
              class="img" /> -->
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
    type: Object as PropType<ImageSource[]>,
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
let resizeObserver: ResizeObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null

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
  internalItems.value = props.images.map(img => {
    return { imageSource: img, aspect: 0, renderWidth: 0 }
  })

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
          // fallback safe square
          item.aspect = 1
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

      if (!item) {
        continue
      }

      rowItems.push(item)
      sumAspect += item.aspect
      idx++

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

async function computeLayout(): Promise<void> {
  if (!root.value) {
    return
  }

  const containerWidth = Math.max(1, root.value.clientWidth)
  await ensureAspects()
  const targetHeight = pickTargetHeightPx(containerWidth)
  rows.value = buildRows(containerWidth, targetHeight)
}

onMounted(async () => {
  await computeLayout()

  if (root.value) {
    resizeObserver = new ResizeObserver(() => {
      // debounce rapid resize
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

  .image-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px; // Must match GAP_PX constant
    margin-bottom: 24px;
  }

  .image-cell {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 16px $box-shadow-color;
    background-color: transparent;

    .cell-link {
      width: 100%;
      height: 100%;
      display: block;
      line-height: 0;
      text-decoration: none;

      // img {
      //   width: 100%;
      //   height: 100%;
      //   display: block;
      //   transition: transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
      //   object-fit: contain;
      //   transform-origin: center center;
      //   -webkit-user-drag: none;
      //   user-select: none;
      // }
    }
  }

  .image-cell:hover .img,
  .image-cell:focus-within .img {
    transform: scale(1.12);
  }
}

// For NuxtImg
.img,
:deep(.nuxt-img) img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain; /* preserve whole image (no crop) */
  transform-origin: center center;
  transition: transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
  -webkit-user-drag: none;
  user-select: none;
}
</style>
