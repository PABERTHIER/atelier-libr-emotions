<template>
  <div class="button-container">
    <button :disabled="isDisabled" class="button" @click="click">
      {{ name }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
    default: '100%',
  },
})

const emit = defineEmits(['click'])

function click(): void {
  emit('click')
}
</script>

<style lang="scss" scoped>
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.button-container {
  cursor: pointer;

  button:disabled {
    cursor: not-allowed;
  }

  .button {
    position: relative;
    border-radius: 8px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    font-size: 20px;
    line-height: 25px;
    padding: 10px;
    text-align: center;
    width: v-bind(width);
  }

  .button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    padding: 2px;
    width: 100%;
    background-size: 400% auto;
    transition:
      background-position 0.3s ease-in-out,
      opacity 0.2s ease-in-out;
    -webkit-mask:
      linear-gradient($white-color 0 0) content-box,
      linear-gradient($white-color 0 0);
    mask:
      linear-gradient($white-color 0 0) content-box,
      linear-gradient($white-color 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .button:hover::before {
    background-position: -50% 0;
    opacity: 1;
  }
}

@media (prefers-color-scheme: light) {
  .button {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .button::before {
    background: linear-gradient(
      90deg,
      $light-grey-color-2 0%,
      $light-grey-color-2 25%,
      $grey-blue-color 50%,
      $dark-red-color 75%,
      $grey-blue-color 100%
    );
  }
}
</style>
