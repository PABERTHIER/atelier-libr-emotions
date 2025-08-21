<template>
  <div class="image">
    <NuxtLink :to="src">
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
defineProps({
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
</script>

<style lang="scss" scoped></style>
