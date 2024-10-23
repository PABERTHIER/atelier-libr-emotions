<template>
  <div class="image">
    <NuxtLink :to="link">
      <NuxtImg :src="src" :title="title" :alt="alt" :sizes="sizes" densities="x1 x2" loading="lazy" placeholder />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  alt: {
    type: String,
    required: false,
    default: ''
  },
  sizes: {
    type: String,
    required: true
  }
})

const runtimeConfig = useRuntimeConfig()
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const link = ref(baseUrl.value + props.src)
</script>

<style lang="scss" scoped>
</style>
