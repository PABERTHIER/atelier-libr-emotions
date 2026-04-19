---
name: nuxt-vue-patterns
description: >
  Vue 3 + Nuxt 4 conventions for this project: SFC structure, auto-imports,
  TypeScript, SCSS, components, and performance patterns.
  Use when writing or reviewing any .vue file.
disable-model-invocation: true
---

Reference for Vue 3 + Nuxt 4 patterns used in Atelier Libr'Émotions.

---

## SFC Structure (always in this order)

```vue
<template>
  <!-- markup -->
</template>

<script setup lang="ts">
// 1. Explicit type imports (the only manual imports needed)
import type { ImageSource } from '~/types/image'

// 2. Composables
const { t } = useI18n()

// 3. Reactive state / computed

// 4. Functions
</script>

<style lang="scss" scoped>
/* styles */
</style>
```

Rules:
- Always `<script setup lang="ts">` — never Options API, never `<script>` without `setup`
- Always `<style lang="scss" scoped>` — never plain CSS, never unscoped
- Template first, then script, then style

---

## Auto-Imports (NON-NEGOTIABLE: never import these manually)

Adding a manual import for any of these will cause lint errors:

**Vue reactivity:** `ref`, `computed`, `watch`, `watchEffect`, `reactive`, `readonly`, `toRef`, `toRefs`

**Nuxt composables:** `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRouter`, `useRuntimeConfig`, `useNuxtApp`, `useState`, `useFetch`, `useAsyncData`, `navigateTo`, `definePageMeta`, `useLocalePath`

**Components:** all components in `app/components/` are auto-imported — never import them in `<script setup>`

---

## What Must Be Manually Imported

```typescript
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'
import type { Heights } from '~/types/image'
```

Types are **never** auto-imported — always use `import type`.

---

## TypeScript Patterns

```typescript
// Always explicitly type reactive arrays
const images: ImageSource[] = [
  {
    src: '/ceramics/porcelain/flowers/FP1.webp',
    title: t('pictures.ceramics.porcelain.flowers.fp1.title'),
    mobileTitle: t('pictures.ceramics.porcelain.flowers.fp1.mobile_title'),
    alt: t('pictures.ceramics.porcelain.flowers.fp1.alt'),
  },
]

// Use const for everything not reassigned
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

`strict: true` is enabled in `tsconfig.json` — no implicit `any`, no unchecked nulls.

---

## Reactive i18n in meta tags (NON-NEGOTIABLE)

Inside `useHead()` and `useSeoMeta()`, **all** `t()` calls must be wrapped in `computed()`:

```typescript
// ✅ Reactive — updates when locale changes
content: computed(() => t('pages.ceramic.porcelain.flowers.meta.content'))

// ❌ Wrong — stale on locale switch
content: t('pages.ceramic.porcelain.flowers.meta.content')
```

Exception: `articleTag` array values resolve with `.value`:
```typescript
articleTag: [
  computed(() => t('miscellaneous.ceramic')).value,  // ✅ resolved string
]
```

---

## SCSS Variables

All variables from `app/styles/variables.scss` are globally injected via Vite — use them directly without `@use`:

```scss
<style lang="scss" scoped>
.gallery-page {
  color: $primary-text-color;      /* ✅ no @use needed */
  background: $background-color;

  @media (max-width: $md) {        /* breakpoint variable */
    padding: 16px;
  }
}
</style>
```

**Key variables:**

| Category | Variable | Value |
|---|---|---|
| Colors | `$primary-text-color` | #2C1810 |
| Colors | `$background-color` | #F7F5F2 |
| Colors | `$gold-color` | #D4AF37 |
| Z-index | `$menu-z-index` | 50 |
| Z-index | `$header-z-index` | 30 |
| Height | `$header-height-desktop` | 88px |
| Height | `$header-height-mobile` | 66px |
| Breakpoint | `$sm` | 640px |
| Breakpoint | `$md` | 768px |
| Breakpoint | `$lg` | 1024px |

---

## Key Components

### ImageGrid
```vue
<ImageGrid
  :images="images"
  :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
```
Handles lazy loading, responsive layout, hover titles, and error states automatically.

### PageNavigation
```vue
<PageNavigation :previous-page="previousPage" :next-page="nextPage" />
<!-- Omit the prop you don't need -->
<PageNavigation :next-page="nextPage" />
```

`previousPage` / `nextPage` shape: `{ path: string, title: string, description: string }`

### NuxtLink with locale
```vue
<!-- Always use localePath() for internal links -->
<NuxtLink :to="localePath('/ceramic/porcelain/flowers')">...</NuxtLink>
```

---

## Pre-rendering (Vercel)

When adding images to a new gallery page, also register them in `app/utils/generateImageRoutes.ts`:

```typescript
// Add inside the imagesConfig array
{
  imagePath: '/ceramics/porcelain/flowers/FP1.webp',
  sizes: [120, 160, 220, 300, 600],
},
```

This pre-renders the IPX-optimized routes at build time so Vercel serves them instantly.
Typical gallery sizes: `[120, 160, 220, 300, 600]`.

---

## Linting

```bash
yarn lint        # check
yarn lint:fix    # auto-fix
```

Rules to be aware of:
- `no-console: warn` — remove `console.log` before committing
- `vue/multi-word-component-names: off` — single-word names allowed
- Prettier is integrated — formatting is enforced automatically
