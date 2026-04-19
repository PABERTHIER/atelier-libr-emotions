---
applyTo: "app/**/*.vue"
---

# Vue & Nuxt File Instructions

## Script Block

Always use `<script setup lang="ts">`. Never use Options API or `<script>` without `setup`.

### Auto-imports — NEVER import these manually

```typescript
// ❌ These will trigger lint errors (unnecessary imports)
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '#imports'
```

Nuxt auto-imports: `ref`, `computed`, `watch`, `watchEffect`, `reactive`, `toRef`, `toRefs`, `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRouter`, `useRuntimeConfig`, `useNuxtApp`, `useState`, `navigateTo`, `definePageMeta`, `useLocalePath`

### DO import types explicitly

```typescript
import type { ImageSource } from '~/types/image'
import type { PageNavigation } from '~/types/page'
```

---

## Template Block

- Components are auto-imported — never manually register or import them in `<script setup>`
- Always use `localePath()` for internal navigation links:
  ```vue
  <NuxtLink :to="localePath('/ceramic/porcelain/flowers')">...</NuxtLink>
  ```
- Use `:prop="value"` (v-bind shorthand) for dynamic props
- Prefer `v-show` over `v-if` for layout elements that toggle (like menu visibility)

---

## Style Block

Always `<style lang="scss" scoped>`. Never:
- Plain CSS (`<style>`)
- Unscoped styles (`<style lang="scss">` without `scoped`)
- Inline styles on elements

SCSS variables from `app/styles/variables.scss` are globally injected — use them without `@use`:
```scss
.my-class {
  color: $primary-text-color;       // ✅ correct
  background: $background-color;
}
```

---

## Reactive Values in Meta Tags

i18n values used in `useHead()` and `useSeoMeta()` must be wrapped in `computed()`:

```typescript
// ✅ correct — reactive
content: computed(() => t('pages.ceramic.porcelain.flowers.meta.content'))

// ❌ wrong — not reactive, won't update on locale switch
content: t('pages.ceramic.porcelain.flowers.meta.content')
```

Exception: `articleTag` array values use `.value` directly (already resolved):
```typescript
articleTag: [
  computed(() => t('miscellaneous.ceramic')).value,  // ✅
]
```

---

## TypeScript Strictness

- `strict: true` is enabled — no implicit `any`
- Always type reactive arrays: `const images: ImageSource[] = [...]`
- Use `const` for everything that doesn't need reassignment
