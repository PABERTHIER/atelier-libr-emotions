---
name: nuxt-vue-patterns
description: Implement or refactor Atelier Libr'Émotions Nuxt 4 and Vue 3 pages, components, composables and client integrations using its TypeScript, SSR and scoped SCSS conventions. Use for application behavior and structure, not copy-only changes.
---

# Atelier Nuxt And Vue Patterns

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Read the nearest implementation and check [nuxt.config.ts](../../../nuxt.config.ts) and [package.json](../../../package.json) before choosing an API or adding a dependency.
Choose APIs and abstractions from the capabilities installed and used in this repository.

## Existing Building Blocks

| Concern                    | Local implementation                                                          | Contract                                                           |
| -------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Page shell                 | [default.vue](../../../app/layouts/default.vue)                               | Decorative Welcome, skip link, header, focusable main and footer   |
| Page introduction          | [PageTitle.vue](../../../app/components/common/PageTitle.vue)                 | `title` and optional `subtitle`; renders the H1                    |
| Gallery                    | [ImageGrid.vue](../../../app/components/common/ImageGrid.vue)                 | `ImageSource[]` and `Heights`; justified rows and image selection  |
| Artwork viewer             | [ImagePreviewModal.vue](../../../app/components/common/ImagePreviewModal.vue) | `image`, `visible` and `close`; zoom, fit and scroll restoration   |
| Standalone optimized image | [Image.vue](../../../app/components/common/Image.vue)                         | Required `src` and `sizes`; optional `maxHeight`, `title`, `alt`   |
| Adjacent pages             | [PageNavigation.vue](../../../app/components/common/PageNavigation.vue)       | Optional `previousPage` and `nextPage`; localizes each path        |
| Responsive state           | [screen-size.ts](../../../app/composables/screen-size.ts)                     | `useScreenSize()` returns breakpoint refs with `ssrWidth: 1024`    |
| Smooth scrolling           | [smooth-scroll.client.ts](../../../app/plugins/smooth-scroll.client.ts)       | Provides the existing `$lenis` instance                            |
| Style tokens               | [variables.scss](../../../app/styles/variables.scss)                          | Colors, layers, dimensions and breakpoints injected through Vite   |
| Menu catalogue             | [navigation.ts](../../../app/data/navigation.ts)                              | Ordered translation keys, groups and unprefixed destinations       |
| Navigation state           | [useSiteNavigation.ts](../../../app/composables/useSiteNavigation.ts)         | Close desktop/mobile navigation from any shared control            |
| Overlay locking            | [useOverlayScrollLock.ts](../../../app/composables/useOverlayScrollLock.ts)   | Acquire/release an independent scroll lease with automatic cleanup |

## Components And Types

Use `<template>`, `<script setup lang="ts">`, then `<style lang="scss" scoped>` for pages and components.
Keep intentional base rules in the existing global stylesheet or layout rather than making component rules global.
Prefer Composition API with typed props, emits and template refs.
Import shared types explicitly with `import type`, including `ImageSource`, `Heights` and `PageNavigation` when used.
Strict mode is configured in `nuxt.config.ts`; avoid `any` and handle missing DOM refs or optional values explicitly.

Prefer Nuxt auto-imports for registered Vue/Nuxt composables, lifecycle hooks and components.
Explicitly import external library APIs, utilities and data that are not registered for auto-import.
Do not assume that all non-type imports are forbidden or that a valid explicit import inherently causes a lint error.
Component registration uses `pathPrefix: false`, so `common/PageTitle.vue` is `PageTitle`; avoid colliding basenames in different folders.
Follow PascalCase component names and the existing `index.vue` route-directory convention.

Do not add a nested `<main>` inside pages using the default layout.
Reuse `PageTitle` rather than introducing a second H1.
For gallery creation, use [gallery-page](../gallery-page/SKILL.md); retain intentional differences in existing pages such as the standalone oil artwork page.

## State, Localization And SSR

Keep translated script-side data reactive with `computed()` and follow [i18n](../i18n/SKILL.md) for message keys and locale-aware navigation.
Preserve mutable interface state separately from translated derived data; menu expansion should not reset when labels recompute.
Choose `v-if` or `v-show` according to mounting and state needs rather than applying one universally.

Keep browser globals and DOM operations in client plugins, mounted hooks or user-event handlers.
Render stable initial markup on the server and client; prefer CSS over viewport-driven setup branches.
Preserve the SSR breakpoint fallback when changing `useScreenSize()`.
Do not hide entire pages behind `ClientOnly` to mask hydration problems.
Avoid mutable module-level visitor state that can leak between requests.

Remove added listeners, observers, timers and animation loops on unmount.
Reuse `$lenis` for scroll integration rather than creating a second instance.
Check client-only availability and coordinate overlays with native scrolling and scroll restoration.
Respect reduced-motion preferences when changing animations or smooth scrolling.
Use the shared overlay lease rather than setting body/root styles or restarting Lenis independently.
Mark native-scroll overlay regions with `data-lenis-prevent` so stopped Lenis leaves their touch and wheel events alone.
Route/history/anchor scrolling lives in `app/router.options.ts`; completed navigation focus lives in `navigation-focus.client.ts`.
Keep the CSS-first `100svh` shell and measured header clearance; no viewport resize writer is needed.
Preserve the two-second `Welcome`/`TextTyping` introduction without blocking interaction or announcing individual letters.
Its timers/listeners must clean up, typing must respect reduced motion, and any pointer, key or focus interaction dismisses it immediately.
Menu transitions must retain native modal focus containment and the scroll lease until the mobile exit completes.
Menu links navigate immediately, with the closing animation running over the destination.
Route focus and viewport scrolling await the shared overlay's release, not the route itself.
Modified clicks preserve native behavior; selecting the current page closes the menu, while mode changes and unmount dismiss immediately.

`ImageGrid` loads natural dimensions and computes browser rows after mount.
Its width-change guard can skip updates when only translated image props change.
When changing captions or translated image arrays, verify a locale switch at an unchanged viewport; computed page data alone does not establish that the grid updated.
Keep fixes to shared grid behavior within the requested task and report any unresolved limitation.

## Styling, Images And Controls

Read [design system](../../docs/design-system.md) when changing appearance, tokens or stylesheet ownership.
Use [UX principles](../../docs/ux-principles.md) when changing page composition, responsive behavior or visitor journeys.
Use injected tokens from `variables.scss` and shared keyframes without repeating their imports in component styles.
Global resets, typography, focus and motion belong in `default.scss`; reusable classes belong in `shared.scss`.
The config loads these CSS-emitting sheets once and injects only tokens.
Sass built-ins such as `sass:color` still need their own `@use` when used.
Keep page-specific layout with its page and shared behavior with its component.
Use existing `$sm`, `$md`, `$lg` and `$xl` breakpoints, checking their actual values instead of copying an old token list.
Inline dynamic measurements are appropriate for grid and zoom geometry; prefer scoped SCSS for static presentation.

Use [artwork-assets](../artwork-assets/SKILL.md) for image consumer selection and static delivery.
`ImageGridItem` and the preview modal currently use native `<img>`; the standalone `Image` wrapper uses `NuxtImg` and forces lazy loading.
Do not assume arbitrary attributes such as `loading="eager"` reach its nested image without checking its implementation.
Custom icons use the `ale-icon:` collection; interface icons also use the installed Heroicons or Lucide sets.
Keep an icon decorative when adjacent text already names the action.

Use [accessibility](../accessibility/SKILL.md) for interactive semantics, focus, dialogs and motion changes.
Do not copy existing click-only containers as the pattern for new controls.

## Verification

Use Yarn with the version pinned by `packageManager`; on PowerShell hosts that block `yarn.ps1`, invoke `yarn.cmd`.
Run `yarn lint` for application changes and `yarn build` for shared behavior, Nuxt configuration or SSR changes.
Use `yarn generate` for route or asset-delivery changes and inspect the relevant static output.
Do not invent `test`, `typecheck` or `format:check` scripts absent from `package.json`.
Check affected FR/EN pages in the browser for hydration errors, translated state, navigation and responsive behavior.
For shared components, cover their different consumers rather than assuming one page proves all usages.
Report checks actually run and any unavailable browser or device coverage.
