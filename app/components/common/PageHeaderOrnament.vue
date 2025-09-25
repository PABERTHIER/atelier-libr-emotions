<template>
  <div class="header-ornament-container">
    <div class="page-header-ornament">
      <div class="ornament-left" />
      <div class="ornament-center">
        <div class="center-diamond" />
      </div>
      <div class="ornament-right" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header-ornament-container {
  .page-header-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px 0px;

    .ornament-left,
    .ornament-right {
      width: 60px;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        $gold-color,
        $copper-color
      );
    }

    .ornament-center {
      width: 20px;
      height: 20px;
      position: relative;
      margin: 0 32px;
      border: 2px solid $gold-color;
      border-radius: 50%;
      background: $cream-color;

      .center-diamond {
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background: $copper-color;
      }
    }
  }
}
</style>
