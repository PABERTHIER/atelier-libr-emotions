<template>
  <Transition name="welcome-fade" :css="animateExit">
    <div v-if="show" class="welcome" aria-hidden="true" inert>
      <div class="welcome__content">
        <Logo class="welcome__logo" />
        <div class="welcome__text">
          <TextTyping :text="t('app.name')" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n()

const show = ref(true)
const animateExit = ref(true)

let timer: ReturnType<typeof setTimeout> | undefined

function removeInteractionListeners() {
  document.removeEventListener('pointerdown', dismiss, true)
  document.removeEventListener('keydown', dismiss, true)
  document.removeEventListener('focusin', dismiss, true)
}

function dismiss(event?: Event) {
  if (event) {
    animateExit.value = false
  }

  show.value = false

  clearTimeout(timer)
  removeInteractionListeners()
}

onMounted(() => {
  if (document.activeElement?.matches(':focus-visible')) {
    animateExit.value = false

    dismiss()

    return
  }

  timer = setTimeout(() => dismiss(), 2000)

  document.addEventListener('pointerdown', dismiss, {
    capture: true,
    passive: true,
  })
  document.addEventListener('keydown', dismiss, true)
  document.addEventListener('focusin', dismiss, true)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  removeInteractionListeners()
})
</script>

<style lang="scss" scoped>
.welcome {
  position: fixed;
  z-index: $welcome-animation-z-index;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  padding: calc(#{$space-16} + env(safe-area-inset-top, 0px))
    calc(#{$space-16} + env(safe-area-inset-right, 0px))
    calc(#{$space-16} + env(safe-area-inset-bottom, 0px))
    calc(#{$space-16} + env(safe-area-inset-left, 0px));
  background: $animation-background-color;
  color: $primary-color;
  pointer-events: none;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-16;
    max-width: 100%;
  }

  &__logo {
    flex: none;
  }

  &__text {
    min-width: 0;
    font-size: clamp(1rem, 4.5vw, 1.875rem);
    line-height: 1.5;
    text-align: center;
    overflow-wrap: anywhere;
  }
}

.welcome-fade-leave-active {
  transition: opacity $transition-ui;
}

.welcome-fade-leave-to {
  opacity: 0;
}

@media (scripting: none) {
  .welcome {
    display: none;
  }
}
</style>
