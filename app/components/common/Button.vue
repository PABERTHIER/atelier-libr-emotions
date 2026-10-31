<template>
  <div class="button-container">
    <button
      v-bind="$attrs"
      type="button"
      :disabled="isDisabled"
      class="button"
      @click="emit('click', $event)">
      {{ name }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{ name: string; isDisabled?: boolean; width?: string }>(),
  { isDisabled: false, width: '100%' }
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()
</script>

<style lang="scss" scoped>
.button-container {
  min-width: 0;
}

.button {
  position: relative;
  width: v-bind(width);
  max-width: 100%;
  min-height: $control-size;
  padding: $space-20;
  border: 0;
  border-radius: $space-8;
  background: rgba($white-color, 0.3);
  color: inherit;
  font: inherit;
  font-size: 1.25rem;
  line-height: 1.25;
  text-align: center;
  overflow-wrap: anywhere;
  -webkit-backdrop-filter: blur($space-10);
  backdrop-filter: blur($space-10);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &::before {
    position: absolute;
    inset: 0;
    padding: $space-2;
    border-radius: $space-8;
    background: linear-gradient(
      90deg,
      $light-grey-color-2 0%,
      $light-grey-color-2 25%,
      $grey-blue-color 50%,
      $dark-red-color 75%,
      $grey-blue-color 100%
    );
    background-size: 400% auto;
    -webkit-mask:
      linear-gradient($white-color 0 0) content-box,
      linear-gradient($white-color 0 0);
    mask:
      linear-gradient($white-color 0 0) content-box,
      linear-gradient($white-color 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    content: '';
  }

  &:not(:disabled):hover::before,
  &:focus-visible::before {
    background-position: -50% 0;
  }
}

@media (max-width: $md) {
  .button {
    padding: $space-10;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .button::before {
    transition: background-position $transition-ui;
  }
}

@media (forced-colors: active) {
  .button {
    border: $border-width solid ButtonText;

    &::before {
      display: none;
    }
  }
}
</style>
