import type { Ref } from 'vue'

type Point = { x: number; y: number }
type Anchor = Point & { viewportX: number; viewportY: number }

export function useImageViewerGestures(
  container: Ref<HTMLElement | null>,
  baseSize: Ref<{ width: number; height: number }>,
  navigate: (direction: -1 | 1) => void
) {
  const zoom = ref(1)

  const maxZoom = 3
  const pointers = new Map<number, Point>()
  let pinchAnchor: Anchor | undefined
  let startPoint: Point | undefined
  let lastPoint: Point | undefined

  let pinchDistance = 0
  let pinchZoom = 1
  let moved = false
  let pinched = false
  let ignoreClick = false
  let startedAt = 0
  let zoomRequest = 0

  function anchorAt(scale: number, point?: Point): Anchor | undefined {
    const element = container.value

    if (!element || !baseSize.value.width || !baseSize.value.height) {
      return
    }

    const rect = element.getBoundingClientRect()
    const viewportX = point ? point.x - rect.left : element.clientWidth / 2
    const viewportY = point ? point.y - rect.top : element.clientHeight / 2
    const width = baseSize.value.width * scale
    const height = baseSize.value.height * scale

    return {
      x:
        (element.scrollLeft +
          viewportX -
          Math.max(0, (element.clientWidth - width) / 2)) /
        width,
      y:
        (element.scrollTop +
          viewportY -
          Math.max(0, (element.clientHeight - height) / 2)) /
        height,
      viewportX,
      viewportY,
    }
  }

  function setZoom(value: number, point?: Point, fixedAnchor?: Anchor) {
    const anchor = fixedAnchor || anchorAt(zoom.value, point)
    const scale = Math.max(1, Math.min(maxZoom, value))
    const request = ++zoomRequest

    zoom.value = scale

    nextTick(() => {
      const element = container.value

      if (!element || request !== zoomRequest) {
        return
      }

      if (scale === 1) {
        element.scrollLeft = 0
        element.scrollTop = 0
      } else if (anchor) {
        const width = baseSize.value.width * scale
        const height = baseSize.value.height * scale

        element.scrollLeft =
          anchor.x * width +
          Math.max(0, (element.clientWidth - width) / 2) -
          anchor.viewportX
        element.scrollTop =
          anchor.y * height +
          Math.max(0, (element.clientHeight - height) / 2) -
          anchor.viewportY
      }
    })
  }

  function pinchGeometry() {
    const [first, second] = [...pointers.values()]

    if (!first || !second) {
      return
    }

    return {
      distance: Math.hypot(second.x - first.x, second.y - first.y),
      center: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
    }
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const element = container.value

    if (!element) {
      return
    }

    const point = { x: event.clientX, y: event.clientY }

    pointers.set(event.pointerId, point)
    element.setPointerCapture(event.pointerId)

    if (pointers.size === 1) {
      startPoint = lastPoint = point
      moved = pinched = false
      ignoreClick = false
      startedAt = event.timeStamp
    } else {
      const pinch = pinchGeometry()

      if (pinch) {
        pinchDistance = pinch.distance
        pinchZoom = zoom.value
        pinchAnchor = anchorAt(zoom.value, pinch.center)
        pinched = true
      }
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!pointers.has(event.pointerId)) {
      return
    }

    const point = { x: event.clientX, y: event.clientY }
    pointers.set(event.pointerId, point)

    if (
      startPoint &&
      Math.hypot(point.x - startPoint.x, point.y - startPoint.y) > 8
    ) {
      moved = true
    }

    const pinch = pinchGeometry()

    if (pinch && pinchDistance > 0) {
      const rect = container.value?.getBoundingClientRect()

      const anchor =
        pinchAnchor && rect
          ? {
              ...pinchAnchor,
              viewportX: pinch.center.x - rect.left,
              viewportY: pinch.center.y - rect.top,
            }
          : undefined

      setZoom(
        (pinchZoom * pinch.distance) / pinchDistance,
        pinch.center,
        anchor
      )
    } else if (zoom.value > 1 && lastPoint) {
      pan(lastPoint.x - point.x, lastPoint.y - point.y)
    }

    lastPoint = point
  }

  function onPointerUp(event: PointerEvent) {
    if (!pointers.has(event.pointerId)) {
      return
    }

    pointers.delete(event.pointerId)

    if (pointers.size) {
      lastPoint = [...pointers.values()][0]

      return
    }

    ignoreClick = moved || pinched || event.type !== 'pointerup'

    if (
      event.type === 'pointerup' &&
      startPoint &&
      !pinched &&
      zoom.value === 1
    ) {
      const dx = event.clientX - startPoint.x
      const dy = event.clientY - startPoint.y

      if (
        Math.abs(dx) >= 50 &&
        Math.abs(dx) > Math.abs(dy) * 1.5 &&
        event.timeStamp - startedAt < 800
      ) {
        ignoreClick = true
        navigate(dx < 0 ? 1 : -1)
      }
    }

    startPoint = lastPoint = undefined
  }

  function onImageClick(event: MouseEvent) {
    if (ignoreClick || moved || pinched) {
      ignoreClick = false

      return
    }

    const point = { x: event.clientX, y: event.clientY }

    if (zoom.value === 1) {
      setZoom(2, point)

      return
    }

    const element = container.value
    const anchor = anchorAt(zoom.value, point)

    if (element && anchor) {
      setZoom(zoom.value, point, {
        ...anchor,
        viewportX: element.clientWidth / 2,
        viewportY: element.clientHeight / 2,
      })
    }
  }

  function pan(x: number, y: number) {
    const element = container.value

    if (element) {
      element.scrollLeft += x
      element.scrollTop += y
    }
  }

  function onWheel(event: WheelEvent) {
    // Browser zoom shortcuts must remain native
    if (event.ctrlKey || event.metaKey) {
      return
    }

    event.preventDefault()

    const factor =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? container.value?.clientHeight || 1
          : 1

    if (event.shiftKey) {
      pan(event.deltaY * factor, 0)
    } else {
      setZoom(zoom.value * Math.exp(-event.deltaY * factor * 0.002), {
        x: event.clientX,
        y: event.clientY,
      })
    }
  }

  function reset() {
    zoomRequest++

    for (const id of pointers.keys()) {
      if (container.value?.hasPointerCapture(id)) {
        container.value.releasePointerCapture(id)
      }
    }

    pointers.clear()

    startPoint = lastPoint = pinchAnchor = undefined
    pinchDistance = 0
    moved = pinched = false
    zoom.value = 1

    pan(-(container.value?.scrollLeft || 0), -(container.value?.scrollTop || 0))
  }

  onBeforeUnmount(reset)

  return {
    zoom,
    maxZoom,
    setZoom,
    pan,
    reset,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onImageClick,
    onWheel,
  }
}
