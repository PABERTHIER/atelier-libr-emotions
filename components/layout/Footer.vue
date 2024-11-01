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

const authorName = t('about.author')

</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: $footer-background-color;

  .left-part {
    margin-left: 10px;
  }

  .right-part {
    font-size: 12px;
    margin-right: 10px;
  }
}
</style>
