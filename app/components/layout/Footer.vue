<template>
  <footer class="site-footer">
    <LangSwitcher />
    <p class="site-footer__copyright">{{ t('about.author') }} © {{ year }}</p>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()

const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $space-8;
  min-height: $footer-min-height;
  padding: $space-4 $shell-gutter;
  padding-inline: calc(
    #{$shell-gutter} +
      max(env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))
  );
  padding-bottom: calc(#{$space-4} + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid rgba($primary-text-color, 0.05);
  background: $footer-background-color;
  box-shadow: 0 -2px 8px rgba($primary-text-color, 0.08);
  text-align: center;

  &__copyright {
    margin: 0;
    font-size: 0.75rem;
    overflow-wrap: anywhere;
  }
}

@media (max-width: $md), (max-height: $navigation-compact-height) {
  .site-footer {
    justify-content: space-around;
    column-gap: $space-24;
    padding-top: $space-8;
    padding-bottom: calc(#{$space-8} + env(safe-area-inset-bottom, 0px));
  }
}
</style>
