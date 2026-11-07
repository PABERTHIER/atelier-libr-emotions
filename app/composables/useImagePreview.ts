import type { ImageSource } from '~/types/image'

export function useImagePreview(images: () => readonly ImageSource[]) {
  const selectedIndex = ref(0)
  const isOpen = ref(false)

  const viewerOpener = shallowRef<HTMLElement | null>(null)

  const viewerImage = computed(() => images()[selectedIndex.value])
  const viewerVisible = computed(
    () => isOpen.value && viewerImage.value !== undefined
  )

  function openViewer(index: number, event: MouseEvent) {
    if (!images()[index]) {
      return
    }

    viewerOpener.value =
      event.currentTarget instanceof HTMLElement ? event.currentTarget : null
    selectedIndex.value = index
    isOpen.value = true
  }

  function selectImage(image: ImageSource) {
    const index = images().findIndex(candidate => candidate.src === image.src)

    if (index >= 0) {
      selectedIndex.value = index
    }
  }

  function closeViewer() {
    isOpen.value = false
    viewerOpener.value = null
  }

  return {
    viewerImage,
    viewerVisible,
    viewerOpener,
    openViewer,
    selectImage,
    closeViewer,
  }
}
