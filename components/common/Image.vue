<template>
  <div class="image">
    <NuxtLink :to="link">
      <NuxtImg
        :src="src"
        :sizes="sizes"
        :title="title"
        :alt="alt"
        densities="x1 x2"
        loading="lazy"
        placeholder
        :style="{ maxHeight: maxHeight }" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  sizes: {
    type: String,
    required: true,
  },
  maxHeight: {
    type: String,
    required: false,
    default: '200px',
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  alt: {
    type: String,
    required: false,
    default: '',
  },
})

const runtimeConfig = useRuntimeConfig()
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const link = ref(baseUrl.value + props.src)
</script>

<style lang="scss" scoped>
.image {
  :deep(a) {
    display: block;
    line-height: 0;
  }
}
</style>
