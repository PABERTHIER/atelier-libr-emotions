<template>
  <div class="grid-item" @click="emit('select')">
    <img
      :src="item.imageSource.src"
      :alt="item.imageSource.alt ?? ''"
      loading="lazy"
      v-bind="nuxtImgWidthBinding"
      class="img" />
    <div v-if="item.imageSource.title && !isMobile" class="image-title-overlay">
      {{ item.imageSource.title }}
    </div>
    <div
      v-else-if="item.imageSource.mobileTitle && isMobile"
      class="image-title-overlay">
      {{ item.imageSource.mobileTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemInternal } from '~/types/image'

const props = defineProps<{
  item: ItemInternal
  isMobile: boolean
}>()

const emit = defineEmits<{
  select: []
}>()

const nuxtImgWidthBinding = computed(() => {
  const width = Math.max(1, Math.round(props.item.renderWidth))
  return { width }
})
</script>

<style lang="scss" scoped>
.grid-item {
  all: unset;
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  line-height: 0;
  cursor: pointer;

  .img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 12px;
    transition: transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
    object-fit: fill;
    transform-origin: center center;
    -webkit-user-drag: none;
    user-select: none;
  }
}

@media ((hover: none) or (max-width: calc($md - 1px))) {
  .grid-item {
    .img {
      transition: none;
    }

    .image-title-overlay {
      max-height: 35px;
      padding-top: 5px;
      text-align: center;
      font-size: 11px;
      line-height: 0.9;
      text-wrap: wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
