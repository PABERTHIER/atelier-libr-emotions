---
description: 'Use when editing Atelier Nuxt pages, components, layouts, application TypeScript or Nuxt configuration.'
applyTo: 'app/**/*.vue,app/**/*.ts,nuxt.config.ts'
---

# Vue And Nuxt Instructions

Use [nuxt-vue-patterns](../../.agents/skills/nuxt-vue-patterns/SKILL.md) for component contracts, TypeScript, SSR, lifecycle and validation.
Read the nearest implementation before choosing a new abstraction or treating an existing source limitation as a required pattern.

## Implementation Rules

- Keep the SFC order `<template>`, `<script setup lang="ts">`, then scoped SCSS.
  Prefer Nuxt auto-imports for registered composables and components; import shared types and unregistered utilities or library APIs explicitly.
- The default layout already supplies the main landmark, header and footer.
  Reuse `PageTitle` for its H1 and avoid a nested main or a second page H1.
  Preserve its skip link and focusable `page-container` destination.
- Keep menu destinations and translation keys in `app/data/navigation.ts`, shared rendering in `MenuLinks`, and cross-component close state in `useSiteNavigation()`.
  Keep expansion state separate from translated labels.
- Keep browser globals and DOM access in mounted hooks, event handlers or client plugins.
  Preserve stable SSR markup, the responsive-state fallback and cleanup for added listeners, timers and observers.
- Derive translated script-side arrays and objects with `computed()`.
  Preserve mutable interface state separately, and verify captions or navigation at an unchanged viewport after a locale switch.
- Use `useLocalePath()` for internal page destinations and `useSwitchLocalePath()` for locale changes.
  Public assets and external URLs do not receive a locale prefix.
- Reuse the existing Lenis integration and image/viewer components according to their actual contracts.
  Native gallery images and the standalone `NuxtImg` wrapper have different delivery and prerender requirements.
  Route scrolling belongs to `app/router.options.ts`; destination focus belongs to `navigation-focus.client.ts`.
  Overlays use `useOverlayScrollLock()` leases, not independent body-style mutations.

## Select Additional Guidance

| Concern in the task                                     | Guidance                                                                                                                    |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Gallery collection or navigation sequence               | [gallery-page](../../.agents/skills/gallery-page/SKILL.md)                                                                  |
| Locale messages or translated consumers                 | [i18n](../../.agents/skills/i18n/SKILL.md)                                                                                  |
| Page metadata, origins or indexing                      | [seo](../../.agents/skills/seo/SKILL.md) and [SEO maintenance](../../.agents/docs/SEO.md)                                   |
| Artwork paths, optimized images or prerender transforms | [artwork-assets](../../.agents/skills/artwork-assets/SKILL.md)                                                              |
| Appearance, responsive layout or interaction            | [styling instructions](styles.instructions.md) and [accessibility instructions](accessibility.instructions.md), as relevant |

Load only the guidance needed for the change.
Use [AGENTS.md verification](../../AGENTS.md#verification) for the relevant lint, build, generation and browser checks.
Run existing task-relevant checks and verify proposed infrastructure before documenting it as present.
