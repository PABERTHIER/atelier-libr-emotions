<template>
  <div class="page-navigation">
    <NuxtLink
      v-if="previousPage"
      :to="localePath(previousPage.path)"
      class="nav-link prev-link">
      <Icon name="heroicons:arrow-left" size="20px" />
      <div class="nav-content">
        <span class="nav-title">{{ previousPage.title }}</span>
        <span class="nav-description">{{ previousPage.description }}</span>
      </div>
    </NuxtLink>

    <div v-else class="nav-placeholder" />

    <NuxtLink
      v-if="nextPage"
      :to="localePath(nextPage.path)"
      class="nav-link next-link">
      <div class="nav-content">
        <span class="nav-title">{{ nextPage.title }}</span>
        <span class="nav-description">{{ nextPage.description }}</span>
      </div>
      <Icon name="heroicons:arrow-right" size="20px" />
    </NuxtLink>

    <div v-else class="nav-placeholder" />
  </div>
</template>

<script setup lang="ts">
import type { PageNavigation } from '~/types/page'

defineProps({
  previousPage: {
    type: Object as PropType<PageNavigation>,
    required: false,
    default: undefined,
  },
  nextPage: {
    type: Object as PropType<PageNavigation>,
    required: false,
    default: undefined,
  },
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.page-navigation {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 60px auto 0;

  .nav-link {
    max-width: 400px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background: $white-color;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 16px $box-shadow-color;
    transition: all 0.3s ease;
    border: 1px solid transparent;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      border-color: rgba(212, 175, 55, 0.3);
    }

    .nav-content {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .nav-title {
        font-size: 15px;
        color: $grey-color-2;
        font-weight: 500;
      }

      .nav-description {
        font-size: 14px;
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

    :deep(svg) {
      color: $gold-color;
      flex-shrink: 0;
    }
  }

  .nav-placeholder {
    width: 1px;
  }
}

@media (max-width: $md) {
  .page-navigation {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    gap: 12px;

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
    margin-top: 40px;

    .nav-link {
      padding: 14px 18px;
      gap: 10px;

      .nav-content {
        .nav-title {
          font-size: 14px;
        }

        .nav-description {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
