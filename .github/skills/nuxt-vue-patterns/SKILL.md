---
name: nuxt-vue-patterns
description: "Vue 3 + Nuxt 4 best practices for this project: Composition API, auto-imports, TypeScript, SCSS, component conventions, and responsive design patterns."
---

# Nuxt & Vue Patterns Skill

This skill documents the Vue 3 / Nuxt 4 conventions used across Atelier Libr'Émotions.
Follow these patterns for all new code and when modifying existing files.

---

## SFC Structure (always in this order)

```vue
<template>
  <!-- markup -->
</template>

<script setup lang="ts">
// imports (types only — everything else is auto-imported)
// composables
// reactive state
// computed properties
// functions
</script>

<style lang="scss" scoped>
/* styles */
</style>
```

**Rules:**
- Always `<script setup lang="ts">` — never Options API, never `<script>` without `setup`
- Always `lang="scss" scoped` on styles — never plain CSS, never unscoped
- Template first, then script, then style

---

## Auto-Imports — Do Not Import These

Nuxt auto-imports the following — adding a manual import is an error:

**Vue reactivity:** `ref`, `computed`, `watch`, `watchEffect`, `reactive`, `readonly`, `toRef`, `toRefs`

**Nuxt composables:** `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRouter`, `useRuntimeConfig`, `useNuxtApp`, `useState`, `useFetch`, `useAsyncData`, `navigateTo`, `definePageMeta`, `useLocalePath`

**Nuxt component helpers:** `defineNuxtComponent`, `defineNuxtPlugin`

---

## What Must Be Manually Imported

```typescript
// Types always require explicit import
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'
import type { Heights } from '~/types/image'
```

---

## SCSS Variables

Variables from `app/styles/variables.scss` are **globally injected** via Vite's `additionalData` and are available in every `.vue` scoped style block without any `@use` directive.

```scss
<style lang="scss" scoped>
.my-element {
  color: $primary-text-color;
  background: $background-color;
  height: $header-height-desktop;

  @media (max-width: $md) {
    height: $header-height-mobile;
  }
}
</style>
```

### Available SCSS variables

**Colors:** `$primary-text-color`, `$white-color`, `$gold-color`, `$copper-color`, `$cream-color`, `$warm-beige`, `$soft-bronze`, `$creativity-orange`, `$inspiration-purple`, `$background-color`

**Z-indexes:** `$welcome-animation-z-index` (9999), `$menu-z-index` (50), `$header-z-index` (30)

**Heights:** `$header-height-desktop` (88px), `$header-height-mobile` (66px), `$footer-height` (44px)

**Breakpoints:** `$xs` (320px), `$sm` (640px), `$md` (768px), `$lg` (1024px), `$xl` (1280px)

---

## Responsive Design

Use `$sm`, `$md`, `$lg`, `$xl` breakpoints from `variables.scss` in media queries.
For JS-side responsiveness, use the `useScreenSize()` composable:

```typescript
const device = useScreenSize()
// device.isMobile.value — true on mobile
// device.isDesktop.value — true on desktop/tablet
```

---

## TypeScript Patterns

### Explicit typing for reactive arrays
```typescript
const images: ImageSource[] = [...]
const previousPage: PageNavigation = { path: '...', title: '...', description: '...' }
```

### Computed with type inference
```typescript
// ✅ Let TypeScript infer the return type of computed
const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

// ✅ Use ref() for primitive reactive values
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
```

### Avoid `any`
The project has `strict: true` in `tsconfig.json`. Never use `any` — use proper types or `unknown`.

---

## Component Usage Patterns

### ImageGrid
```vue
<ImageGrid
  :images="images"
  :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
```
- `images`: `ImageSource[]`
- `heights`: object with breakpoint keys `xs`, `sm`, `md`, `lg` (pixel values)
- The component handles responsive layout, lazy loading, hover titles, and error states

### PageTitle
```vue
<PageTitle
  :title="t('pages.x.y.z.title')"
  :subtitle="t('pages.x.y.z.subtitle')" />
```

### PageNavigation
```vue
<!-- Both directions -->
<PageNavigation :previous-page="previousPage" :next-page="nextPage" />

<!-- Next only (first page in a series) -->
<PageNavigation :next-page="nextPage" />

<!-- Previous only (last page in a series) -->
<PageNavigation :previous-page="previousPage" />
```

### NuxtLink with localePath
```vue
<NuxtLink :to="localePath('/ceramic/porcelain/flowers')">...</NuxtLink>
```
Always use `localePath()` for internal links — it prepends the correct locale prefix.

### Image (NuxtImg wrapper)
```vue
<Image
  src="/paintings/abstract-autumn.webp"
  sizes="sm:150px, md:250px, lg:350px"
  max-height="400px"
  :title="t('...')"
  :alt="t('...')" />
```

---

## Icons

Custom SVG icons use the `ale-icon` collection (files in `app/assets/svg/`):
```vue
<Icon name="ale-icon:menu-icon" color="black" size="25px" mode="svg" />
```

---

## Performance Patterns

### Lazy-loaded images
`ImageGrid` handles lazy loading automatically. For standalone `<Image>` or `<NuxtImg>`, add `loading="lazy"` unless the image is above the fold.

### Pre-rendering
All gallery images must be registered in `app/utils/generateImageRoutes.ts` so Vercel pre-renders the IPX optimized versions at build time. Add entries for new image folders:

```typescript
{
  imagePath: '/ceramics/porcelain/flowers/FP1.webp',
  sizes: [120, 160, 220, 300, 600],
},
```

---

## Linting

```bash
yarn lint        # check
yarn lint:fix    # auto-fix
```

ESLint is configured with `eslint-plugin-prettier`. Rules:
- `no-console: warn` — remove debug logs before committing
- `vue/multi-word-component-names: off` — single-word component names allowed

---

## File Naming

| What | Convention | Example |
|---|---|---|
| Page files | `index.vue` in path directory | `app/pages/ceramic/porcelain/flowers/index.vue` |
| Component files | PascalCase | `ImageGrid.vue`, `PageTitle.vue` |
| Composable files | kebab-case | `screen-size.ts` |
| Type files | kebab-case | `image.ts`, `page.ts` |
| Util files | camelCase | `generateImageRoutes.ts` |
| i18n files | locale code | `fr-FR.json`, `en-US.json` |
| SCSS files | kebab-case | `variables.scss`, `keyframes.scss` |
