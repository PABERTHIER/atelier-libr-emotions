<template>
  <div class="welcome-container" :class="{'hidden': !show}">
    <div class="welcome">
      <div class="logo-container">
        <Logo />
      </div>
      <div class="text">
        <TextTyping :text="appName" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const appName = t('app.name')

const show = ref(true)
function start() : void {
  setTimeout(() => {
    show.value = false
  }, 2000)
}

onMounted(() => {
  start()
})
</script>

<style lang="scss" scoped>
.welcome-container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $welcome-animation-z-index;
  background-color: $animation-background-color;
  color: $primary-color;

  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo-container {
      margin-right: 15px;
    }
  
    .text {
      font-size: 30px;
    }
  }
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s linear;
}
</style>
