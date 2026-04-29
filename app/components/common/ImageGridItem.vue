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

@media ((min-width: $md) and (hover: hover)) {
  .grid-item {
    .image-title-overlay {
      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;
      padding: 16px 12px 12px;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.3;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
      pointer-events: none;
      color: $white-color;
      background: linear-gradient(
        to top,
        rgba(44, 24, 16, 0.9) 0%,
        rgba(44, 24, 16, 0.7) 60%,
        transparent 100%
      );
    }
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
