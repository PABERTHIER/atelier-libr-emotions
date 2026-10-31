<template>
  <div ref="root" class="site-menu" @focusout="handleFocusOut">
    <nav
      class="desktop-navigation"
      :aria-label="t('components.menu.navigation')">
      <ul class="desktop-navigation__list">
        <li v-for="section in navigationSections" :key="section.id">
          <button
            :id="`menu-trigger-${section.id}`"
            type="button"
            class="desktop-navigation__trigger"
            :class="{ 'is-current': isCurrentSection(section) }"
            :aria-expanded="desktopSection === section.id"
            :aria-controls="`menu-panel-${section.id}`"
            @click="toggleSection(section.id)"
            @keydown.down.prevent="openSection(section.id)">
            {{ t(section.label) }}
            <Icon name="lucide:chevron-down" aria-hidden="true" />
          </button>
          <Transition name="desktop-panel">
            <section
              v-show="desktopSection === section.id"
              :id="`menu-panel-${section.id}`"
              class="desktop-navigation__panel"
              :aria-labelledby="`menu-heading-${section.id}`"
              :inert="desktopSection !== section.id"
              data-lenis-prevent>
              <div class="desktop-navigation__panel-header">
                <h2 :id="`menu-heading-${section.id}`">
                  {{ t(section.label) }}
                </h2>
                <button
                  type="button"
                  class="icon-button"
                  :aria-label="
                    t('components.menu.close_section', {
                      section: t(section.label),
                    })
                  "
                  @click="closeDesktop(true)">
                  <Icon name="lucide:x" aria-hidden="true" />
                </button>
              </div>
              <div class="desktop-navigation__panel-content" data-lenis-prevent>
                <p
                  :id="`menu-planned-${section.id}`"
                  class="desktop-navigation__note">
                  {{ t('components.menu.planned') }}
                </p>
                <MenuLinks
                  :groups="section.groups"
                  :planned-note-id="`menu-planned-${section.id}`"
                  @navigate="handleLinkClick" />
              </div>
            </section>
          </Transition>
        </li>
        <li>
          <NuxtLink
            :to="localePath('/contact')"
            class="desktop-navigation__contact"
            @click="handleLinkClick($event, '/contact')">
            {{ t('pages.contact.tab_name') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <button
      ref="menuToggle"
      type="button"
      class="mobile-menu-toggle icon-button"
      :aria-label="t('components.menu.open')"
      :aria-expanded="mobileMenuOpen"
      aria-controls="mobile-navigation"
      aria-haspopup="dialog"
      @click="mobileMenuOpen = true">
      <Icon name="lucide:menu" aria-hidden="true" />
    </button>

    <Teleport to="body">
      <dialog
        id="mobile-navigation"
        ref="dialog"
        class="mobile-navigation"
        :aria-label="t('components.menu.navigation')"
        data-lenis-prevent
        @cancel.prevent="closeNavigation"
        @keydown.esc.prevent.stop="closeNavigation"
        @close="handleDialogClose">
        <Transition name="mobile-menu" @after-leave="finishMobileClose">
          <div v-show="mobileMenuOpen" class="mobile-navigation__surface">
            <div class="mobile-navigation__header">
              <span>{{ t('components.menu.navigation') }}</span>
              <button
                type="button"
                class="icon-button"
                autofocus
                :aria-label="t('components.menu.close')"
                @click="closeNavigation">
                <Icon name="lucide:x" aria-hidden="true" />
              </button>
            </div>
            <nav
              class="mobile-navigation__content"
              :aria-label="t('components.menu.navigation')">
              <p id="mobile-menu-planned" class="mobile-navigation__note">
                {{ t('components.menu.planned') }}
              </p>
              <div
                v-for="section in navigationSections"
                :key="section.id"
                class="mobile-navigation__section">
                <h2>
                  <button
                    type="button"
                    class="mobile-navigation__trigger"
                    :aria-expanded="expandedSections.includes(section.id)"
                    :aria-controls="`mobile-section-${section.id}`"
                    @click="toggleMobileSection(section.id)">
                    {{ t(section.label) }}
                    <Icon name="lucide:chevron-down" aria-hidden="true" />
                  </button>
                </h2>
                <div
                  v-show="expandedSections.includes(section.id)"
                  :id="`mobile-section-${section.id}`"
                  class="mobile-navigation__groups">
                  <MenuLinks
                    :groups="section.groups"
                    planned-note-id="mobile-menu-planned"
                    inverse
                    @navigate="handleLinkClick" />
                </div>
              </div>
              <NuxtLink
                :to="localePath('/contact')"
                class="mobile-navigation__contact"
                @click="handleLinkClick($event, '/contact')">
                {{ t('pages.contact.tab_name') }}
                <Icon name="lucide:arrow-right" aria-hidden="true" />
              </NuxtLink>
            </nav>
          </div>
        </Transition>
      </dialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { navigationSections } from '~/data/navigation'
import type { NavigationSection } from '~/types/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { mobileMenuOpen, desktopSection, closeNavigation } = useSiteNavigation()
const { lockScroll, unlockScroll } = useOverlayScrollLock()

const root = useTemplateRef('root')
const dialog = useTemplateRef('dialog')
const menuToggle = useTemplateRef('menuToggle')

const expandedSections = ref<string[]>([])

let desktopNavigation = true
let navigationObserver: ResizeObserver | undefined

function handleLinkClick(event: MouseEvent, path: string) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  if (localePath(path) === route.path) {
    closeNavigation()
  }
}

function isCurrentSection(section: NavigationSection) {
  return section.groups.some(group =>
    group.links.some(
      link => link.path !== '/wip' && localePath(link.path) === route.path
    )
  )
}

function toggleSection(id: string) {
  desktopSection.value = desktopSection.value === id ? null : id
}

async function openSection(id: string) {
  desktopSection.value = id

  await nextTick()

  document
    .getElementById(`menu-panel-${id}`)
    ?.querySelector<HTMLElement>('a, button')
    ?.focus()
}

function closeDesktop(restoreFocus = false) {
  const id = desktopSection.value

  desktopSection.value = null

  if (restoreFocus && id) {
    document
      .getElementById(`menu-trigger-${id}`)
      ?.focus({ preventScroll: true })
  }
}

function toggleMobileSection(id: string) {
  expandedSections.value = expandedSections.value.includes(id)
    ? expandedSections.value.filter(section => section !== id)
    : [...expandedSections.value, id]
}

function handleFocusOut(event: FocusEvent) {
  if (
    event.relatedTarget instanceof Node &&
    !root.value?.contains(event.relatedTarget)
  ) {
    closeDesktop()
  }
}

function handleOutsidePointer(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) {
    closeDesktop()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && desktopSection.value) {
    event.preventDefault()
    closeDesktop(true)
  }
}

function handleBreakpointChange() {
  const desktop = menuToggle.value?.offsetParent === null

  if (desktop === desktopNavigation) {
    return
  }

  desktopNavigation = desktop

  const focusWasInMenu = root.value?.contains(document.activeElement)
  const dialogWasOpen = dialog.value?.open

  closeNavigation()
  finishMobileClose()

  if (desktop && dialogWasOpen) {
    void nextTick(() =>
      root.value
        ?.querySelector<HTMLButtonElement>('.desktop-navigation__trigger')
        ?.focus()
    )
  } else if (!desktop && focusWasInMenu) {
    void nextTick(() => menuToggle.value?.focus({ preventScroll: true }))
  }
}

function handleDialogClose() {
  if (dialog.value?.open) {
    return
  }

  mobileMenuOpen.value = false
  unlockScroll()
}

function finishMobileClose() {
  if (mobileMenuOpen.value) {
    return
  }

  dialog.value?.close()
  unlockScroll()
}

watch(
  mobileMenuOpen,
  open => {
    if (open) {
      closeDesktop()
      lockScroll()

      if (!dialog.value?.open) {
        dialog.value?.showModal()
      }
    } else if (!dialog.value?.open) {
      unlockScroll()
    }
  },
  { flush: 'post' }
)

watch(() => route.fullPath, closeNavigation)

onMounted(() => {
  desktopNavigation = menuToggle.value?.offsetParent === null
  navigationObserver = new ResizeObserver(handleBreakpointChange)

  if (root.value) {
    navigationObserver.observe(root.value)
  }

  document.addEventListener('pointerdown', handleOutsidePointer)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  navigationObserver?.disconnect()
  document.removeEventListener('pointerdown', handleOutsidePointer)
  document.removeEventListener('keydown', handleEscape)

  closeNavigation()
  finishMobileClose()
})
</script>

<style lang="scss" scoped>
.site-menu {
  flex: 1;
  min-width: 0;
}

.desktop-navigation {
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    gap: $space-8;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__trigger,
  &__contact {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $space-8;
    min-height: $control-size;
    padding: $space-8 $space-12;
    border: 0;
    border-radius: $radius-control;
    background: transparent;
    color: $primary-text-color;
    font: inherit;
    font-weight: 700;
    line-height: 1.5;
    text-align: center;

    &:hover,
    &[aria-expanded='true'] {
      background: $warm-beige;
    }

    &.is-current,
    &[aria-current='page'] {
      text-decoration: underline;
      text-decoration-color: $navigation-accent-color;
      text-decoration-thickness: 2px;
      text-underline-offset: 0.4em;
    }

    .iconify {
      flex: none;
      transition: transform $transition-ui;
    }

    &[aria-expanded='true'] .iconify {
      transform: rotate(180deg);
    }
  }

  &__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: $menu-z-index;
    top: calc(100% + #{$space-8});
    inset-inline: 0;
    max-height: calc(
      100dvh - var(--site-header-height, #{$header-height-desktop}) -
        #{$space-24}
    );
    overflow: hidden;
    padding-inline: $space-24;
    border: 1px solid $navigation-border-color;
    border-top: 3px solid $navigation-accent-color;
    border-radius: 0 0 $radius-panel $radius-panel;
    background: $white-color;
    box-shadow: $shadow-panel;
  }

  &__panel-header {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    gap: $space-16;
    padding-block: $space-12;
    background: $white-color;

    h2 {
      margin: 0;
      font-size: 1.25rem;
    }
  }

  &__panel-content {
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: $space-8 $space-8 $space-24;
    scroll-padding-block: $space-8;
  }

  &__note {
    margin: 0 0 $space-24;
    color: $navigation-muted-color;
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

.mobile-menu-toggle {
  display: none;
}

.icon-button {
  --menu-frame-size: #{$menu-control-size};
  position: relative;
  padding: 0;
  border: 0;
  background: transparent;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--menu-frame-size);
    height: var(--menu-frame-size);
    border: 1px solid currentColor;
    border-radius: $radius-control;
    transform: translate(-50%, -50%);
    pointer-events: none;
    content: '';
  }

  &:hover {
    background: transparent;
  }

  &:hover::before {
    background: rgba($navigation-muted-color, 0.12);
  }

  .iconify {
    position: relative;
    width: $menu-icon-size;
    height: $menu-icon-size;
  }
}

.desktop-panel-enter-active,
.desktop-panel-leave-active {
  transition:
    opacity $transition-ui,
    transform $transition-ui;
}

.desktop-panel-enter-from,
.desktop-panel-leave-to {
  opacity: 0;
  transform: translateY(-$space-8);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(-100%);
}

.mobile-navigation {
  --focus-color: #{$light-blue-color};
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100dvh;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: transparent;
  color: $white-color;

  &[open] {
    display: flex;
    flex-direction: column;
  }

  &::backdrop {
    background: transparent;
  }

  &__surface {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    background: $mobile-menu-background-color;
  }

  &__header {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    gap: $space-16;
    padding: calc(#{$space-12} + env(safe-area-inset-top, 0px))
      calc(#{$space-20} + env(safe-area-inset-right, 0px)) $space-12
      calc(#{$space-20} + env(safe-area-inset-left, 0px));
    border-bottom: 1px solid $mobile-menu-border-color;
    font-weight: 700;
  }

  &__content {
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: $space-16 calc(#{$space-20} + env(safe-area-inset-right, 0px))
      calc(#{$space-24} + env(safe-area-inset-bottom, 0px))
      calc(#{$space-20} + env(safe-area-inset-left, 0px));
    scroll-padding-block: $space-12;
  }

  &__note {
    margin: 0 0 $space-16;
    color: $light-grey-color;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  &__section {
    border-bottom: 1px solid $mobile-menu-border-color;

    h2 {
      margin: 0;
      font-size: 1.25rem;
    }
  }

  &__trigger,
  &__contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-16;
    width: 100%;
    min-height: $control-size;
    padding: $space-16 $space-4;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-weight: 700;
    text-align: start;

    .iconify {
      flex: none;
      width: $menu-link-icon-size;
      height: $menu-link-icon-size;
    }

    &[aria-expanded='true'] {
      color: $light-blue-color;

      .iconify {
        transform: rotate(180deg);
      }
    }
  }

  &__groups {
    padding: $space-8 $space-8 $space-24;
  }

  &__contact {
    border-bottom: 1px solid $mobile-menu-border-color;
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .desktop-panel-enter-active,
  .desktop-panel-leave-active,
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}

@media (min-width: $xl) {
  .desktop-navigation__trigger,
  .desktop-navigation__contact {
    font-size: 1.125rem;
  }
}

@media (max-width: $md), (max-height: $navigation-compact-height) {
  .site-menu {
    flex: none;
  }

  .desktop-navigation {
    display: none;
  }

  .mobile-menu-toggle {
    display: inline-grid;
  }

  .icon-button .iconify {
    width: $menu-icon-size-mobile;
    height: $menu-icon-size-mobile;
  }
}

@media (max-width: $sm) {
  .icon-button {
    --menu-frame-size: #{$menu-control-size-small};

    .iconify {
      width: $menu-icon-size-small;
      height: $menu-icon-size-small;
    }
  }
}
</style>
