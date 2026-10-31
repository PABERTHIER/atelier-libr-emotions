<template>
  <nav
    v-if="previousPage || nextPage"
    class="page-navigation"
    :aria-label="t('components.page_navigation.label')">
    <NuxtLink
      v-if="previousPage"
      :to="localePath(previousPage.path)"
      class="nav-link prev-link">
      <Icon name="heroicons:arrow-left" aria-hidden="true" />
      <div class="nav-content">
        <span class="nav-title">{{ previousPage.title }}</span>
        <span class="nav-description">{{ previousPage.description }}</span>
      </div>
    </NuxtLink>

    <div v-else class="nav-placeholder" aria-hidden="true" />

    <NuxtLink
      v-if="nextPage"
      :to="localePath(nextPage.path)"
      class="nav-link next-link">
      <div class="nav-content">
        <span class="nav-title">{{ nextPage.title }}</span>
        <span class="nav-description">{{ nextPage.description }}</span>
      </div>
      <Icon name="heroicons:arrow-right" aria-hidden="true" />
    </NuxtLink>

    <div v-else class="nav-placeholder" aria-hidden="true" />
  </nav>
</template>

<script setup lang="ts">
import type { PageNavigation } from '~/types/page'

defineProps<{ previousPage?: PageNavigation; nextPage?: PageNavigation }>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.page-navigation {
  display: flex;
  justify-content: space-between;
  gap: $space-20;
  margin: $space-60 auto 0;

  .nav-link {
    min-width: 0;
    min-height: $control-size;
    max-width: min($page-navigation-link-width, 100%);
    position: relative;
    display: flex;
    align-items: center;
    gap: $space-12;
    padding: $space-16 $space-24;
    background-color: $white-color;
    border-radius: $radius-panel;
    text-decoration: none;
    box-shadow: 0 $space-4 $space-16 $box-shadow-color;

    &::before {
      position: absolute;
      inset: 0;
      padding: $space-2;
      border-radius: $radius-panel;
      background: linear-gradient(
        90deg,
        $light-grey-color-2 0%,
        $light-grey-color-2 25%,
        $grey-blue-color 50%,
        $dark-red-color 75%,
        $grey-blue-color 100%
      );
      opacity: 0;
      background-size: 400% auto;
      transition:
        background-position 0.4s ease-in-out,
        opacity 0.2s ease-in-out;
      // Mask the center: show only the border (content-box)
      -webkit-mask:
        linear-gradient($white-color 0 0) content-box,
        linear-gradient($white-color 0 0);
      mask:
        linear-gradient($white-color 0 0) content-box,
        linear-gradient($white-color 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      content: '';
      pointer-events: none;
    }

    &:hover::before,
    &:focus-visible::before {
      background-position: -50% 0;
      opacity: 1;
    }

    .nav-content {
      min-width: 0;
      overflow-wrap: anywhere;
      display: flex;
      flex-direction: column;
      gap: $space-4;

      .nav-title {
        font-size: 0.9375rem;
        color: $grey-color-2;
        font-weight: 500;
      }

      .nav-description {
        font-size: 0.875rem;
        color: $primary-text-color;
      }
    }

    &.prev-link {
      .nav-content {
        align-items: flex-start;
      }
    }

    &.next-link {
      .nav-content {
        align-items: flex-end;
      }
    }

    :deep(.iconify) {
      color: $navigation-accent-color;
      flex-shrink: 0;
      width: $space-20;
      height: $space-20;
    }
  }

  .nav-placeholder {
    width: $border-width;
  }
}

@media (max-width: $md) {
  .page-navigation {
    flex-direction: column;
    align-items: center;
    margin-top: $space-50;
    gap: $space-12;

    .nav-link {
      width: 100%;
      justify-content: center;

      &.next-link {
        .nav-content {
          align-items: flex-start;
        }
      }
    }

    .nav-placeholder {
      display: none;
    }
  }
}

@media (max-width: $sm) {
  .page-navigation {
    margin-top: $space-40;

    .nav-link {
      padding: $space-14 $space-18;
      gap: $space-10;

      .nav-content {
        .nav-title {
          font-size: 0.875rem;
        }

        .nav-description {
          font-size: 0.8125rem;
        }
      }
    }
  }
}

@media (forced-colors: active) {
  .page-navigation .nav-link {
    border: $border-width solid LinkText;
  }
}
</style>
