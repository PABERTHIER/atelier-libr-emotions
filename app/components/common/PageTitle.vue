<template>
  <div class="page-title-container">
    <h1 class="page-title">
      {{ props.title }}
    </h1>
    <div class="subtitle">
      {{ props.subtitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.page-title-container {
  text-align: center;

  .page-title {
    position: relative;
    margin-top: 0px;
    margin-bottom: 25px;
    color: $primary-text-color;
    font-size: clamp(2.5rem, 3vw, 4rem);
    font-weight: 300;

    &::after {
      width: 80px;
      height: 2px;
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, transparent, $gold-color, transparent);
      content: '';
    }
  }

  .subtitle {
    font-size: 18px;
    line-height: 1.6;
    color: $grey-color-2;
    font-style: italic;
    font-weight: 300;
  }
}
</style>
