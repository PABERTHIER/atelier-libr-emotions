<template>
  <div class="page-title-container">
    <h1 class="page-title">
      {{ props.title }}
    </h1>
    <p v-if="props.subtitle" class="subtitle">
      {{ props.subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string; subtitle?: string }>()
</script>

<style lang="scss" scoped>
.page-title-container {
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: center;

  .page-title {
    position: relative;
    margin-top: 0;
    margin-bottom: $space-25;
    color: $primary-text-color;
    font-size: clamp(2rem, 1.5rem + 2vw, 4rem);
    line-height: 1.2;
    font-weight: 300;

    &::after {
      width: $page-title-ornament-width;
      height: $space-2;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, transparent, $gold-color, transparent);
      content: '';
    }
  }

  .subtitle {
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.6;
    color: $grey-color-2;
    font-style: italic;
    font-weight: 300;
  }
}
</style>
