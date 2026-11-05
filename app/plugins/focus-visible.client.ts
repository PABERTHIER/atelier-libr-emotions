export default defineNuxtPlugin(nuxtApp => {
  const root = document.documentElement

  function handlePointerDown() {
    root.setAttribute('data-pointer-input', '')
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      ['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)
    ) {
      return
    }

    root.removeAttribute('data-pointer-input')
  }

  document.addEventListener('pointerdown', handlePointerDown, true)
  document.addEventListener('keydown', handleKeyDown, true)

  nuxtApp.vueApp.onUnmount(() => {
    document.removeEventListener('pointerdown', handlePointerDown, true)
    document.removeEventListener('keydown', handleKeyDown, true)
    root.removeAttribute('data-pointer-input')
  })
})
