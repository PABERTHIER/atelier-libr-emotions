<template>
  <div class="header-ornament-container" aria-hidden="true">
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
    margin: $space-25 0;

    .ornament-left,
    .ornament-right {
      width: $space-60;
      height: $border-width;
      background: linear-gradient(
        90deg,
        transparent,
        $gold-color,
        $copper-color
      );
    }

    .ornament-center {
      width: $space-20;
      height: $space-20;
      position: relative;
      margin: 0 $space-32;
      border: $space-2 solid $gold-color;
      border-radius: 50%;
      background: $cream-color;

      .center-diamond {
        width: $space-8;
        height: $space-8;
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
