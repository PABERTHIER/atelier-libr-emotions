<template>
  <div class="menu-links" :class="{ 'menu-links--inverse': inverse }">
    <section
      v-for="group in groups"
      :key="group.label"
      class="menu-links__group">
      <h3 class="menu-links__heading">{{ t(group.label) }}</h3>
      <ul class="menu-links__list">
        <li v-for="link in group.links" :key="link.label">
          <NuxtLink
            v-if="link.path !== '/wip'"
            :to="localePath(link.path)"
            class="menu-links__link"
            @click="emit('navigate', $event, link.path)">
            <span>{{ t(link.label) }}</span>
            <Icon name="lucide:arrow-right" aria-hidden="true" />
          </NuxtLink>
          <span
            v-else
            class="menu-links__planned"
            aria-disabled="true"
            :aria-describedby="plannedNoteId">
            {{ t(link.label) }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NavigationGroup } from '~/types/navigation'

defineProps<{
  groups: NavigationGroup[]
  plannedNoteId: string
  inverse?: boolean
}>()

const emit = defineEmits<{ navigate: [event: MouseEvent, path: string] }>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.menu-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: $space-24;
  color: $primary-text-color;

  &__group {
    min-width: 0;
  }

  &__heading {
    margin: 0 0 $space-8;
    padding-bottom: $space-8;
    border-bottom: 1px solid $navigation-border-color;
    font-size: 1rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-8;
    min-height: $control-size;
    padding: $space-8;
    border-radius: $radius-control;
    font-weight: 600;
    line-height: 1.5;
    overflow-wrap: anywhere;
    text-decoration: underline;
    text-underline-offset: 0.2em;

    .iconify {
      flex: none;
      width: $menu-link-icon-size;
      height: $menu-link-icon-size;
    }

    &:hover,
    &[aria-current='page'] {
      background: $warm-beige;
    }

    &[aria-current='page'] {
      box-shadow: inset 3px 0 $navigation-accent-color;
    }
  }

  &__planned {
    display: block;
    padding: $space-8;
    color: $navigation-muted-color;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  &--inverse {
    color: $white-color;

    .menu-links__heading {
      border-color: $mobile-menu-border-color;
    }

    .menu-links__link:hover,
    .menu-links__link[aria-current='page'] {
      background: $dark-grey-blue-color;
    }

    .menu-links__link[aria-current='page'] {
      box-shadow: inset 3px 0 $light-blue-color;
    }

    .menu-links__planned {
      color: $light-grey-color;
    }
  }
}
</style>
