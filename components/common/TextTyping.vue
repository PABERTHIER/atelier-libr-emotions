<template>
  <div class="text-typing">
    <div v-for="(char, index) in chars" :key="index" v-html="char" class="char" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  waitingTime: {
    type: Number,
    required: false,
    default: 50
  }
})

const chars = ref<string[]>([])
let currentIndex = 0

onMounted(() => {
  start()
})

function start() : void {
  setTimeout(() => {
    if (props.text[currentIndex] === ' ') {
      chars.value.push('&nbsp;')
    } else {
      chars.value.push(props.text[currentIndex]!)
    }

    currentIndex++

    if (currentIndex < props.text.length) {
      start()
    }

   }, props.waitingTime)
}
</script>

<style lang="scss" scoped>
.text-typing {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
