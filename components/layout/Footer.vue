<template>
  <div class="footer">
    <div class="left-part">
      <LangSwitcher />
    </div>
    <div class="right-part">{{ authorName }} © {{ new Date().getFullYear() }}</div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const authorName = computed(() => t('about.author'))

</script>

<style lang="scss" scoped>
.footer {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background-color: $footer-background-color;

  .right-part {
    font-size: 12px;
  }
}
</style>
