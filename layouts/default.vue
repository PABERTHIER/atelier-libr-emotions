<template>
  <div id="layoutContainer">
    <div class="page-container">
      <!-- <Header /> -->
      <slot />
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<style lang="scss">
@import '~/styles/default.scss';

html {
  font-family: Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  color: $primary-text-color;
}

body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0px;

  #__nuxt,
  #__layout {
    height: 100%;
    width: 100%;
  }
}

#layoutContainer {
  height: 100%;
  background-color: $primary-color;
  overflow-y: auto;
  .page-container {
    padding: 20px;
  }
}
</style>
