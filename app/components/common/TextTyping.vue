<template>
  <span class="text-typing">
    <span class="text-typing__accessible">{{ text }}</span>
    <span aria-hidden="true">{{ displayedText }}</span>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    waitingTime?: number
  }>(),
  { waitingTime: 50 }
)

const displayedText = ref('')

let timer: ReturnType<typeof setTimeout> | undefined
let motionPreference: MediaQueryList | undefined
let mounted = false

function stopTyping() {
  clearTimeout(timer)
  timer = undefined
}

function startTyping() {
  stopTyping()

  if (motionPreference?.matches || props.waitingTime <= 0) {
    displayedText.value = props.text

    return
  }

  const characters = Array.from(props.text)
  let index = 0

  displayedText.value = ''

  function typeNextCharacter() {
    index++
    displayedText.value = characters.slice(0, index).join('')

    if (index < characters.length) {
      timer = setTimeout(typeNextCharacter, props.waitingTime)
    }
  }

  if (characters.length > 0) {
    timer = setTimeout(typeNextCharacter, props.waitingTime)
  }
}

watch(
  () => [props.text, props.waitingTime],
  () => {
    if (mounted) {
      startTyping()
    }
  }
)

onMounted(() => {
  mounted = true
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', startTyping)
  startTyping()
})

onBeforeUnmount(() => {
  stopTyping()
  motionPreference?.removeEventListener('change', startTyping)
})
</script>

<style lang="scss" scoped>
.text-typing {
  white-space: pre-wrap;
  overflow-wrap: anywhere;

  &__accessible {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
}
</style>
