---
name: gallery-page
description: >
  Create a new painting or ceramic gallery page end-to-end:
  i18n translations, Vue page component, Menu.vue link update, and navigation.
  Use when asked to add a new gallery page to the site.
disable-model-invocation: true
argument-hint: "<technique> - <category> (e.g. Porcelaine - Fleurs)"
---

You are creating a new gallery page for Atelier Libr'Émotions: $ARGUMENTS

Read AGENTS.md for full project context before starting.
Use the existing page `app/pages/ceramic/porcelain/flowers/index.vue` as the canonical reference.

---

## Required Information

If any of the following is missing, ask before proceeding:

1. **Domain** — `painting` or `ceramic`
2. **Technique** — e.g., Porcelaine, Acrylique, Raku et enfumage
3. **Category** — e.g., Fleurs, Abstraits, Nature
4. **Description** (optional) — artist's text used to inspire the SEO `meta.content`
5. **Title** — displayed as the page subtitle
6. **Image filenames** — e.g., `FP1,...FP14`

---

## Workflow

### 1. Resolve naming

Before writing any code, derive these identifiers from the technique and category names:

| Context | Convention | Example |
|---|---|---|
| URL path | kebab-case | `raku-smouldering` |
| i18n key | snake_case | `raku_and_smouldering` |
| public/ folder | snake_case | `raku_smouldering` |
| Domain prefix (i18n pages) | singular | `ceramic` |
| Domain prefix (i18n pictures) | plural | `ceramics` |
| Image key | lowercase filename no ext | `FP1.webp` → `fp1` |

See the technique naming table in AGENTS.md.

### 2. Verify images

Check that `public/{domain_plural}/{technique_snake}/{category}/` contains the expected `.webp` files.
If images are missing, warn the user and continue scaffolding.

### 3. Add i18n translations (NON-NEGOTIABLE: both files in one edit)

**`i18n/locales/fr-FR.json`** — add under `pages.{domain}.{technique_snake}.{category_snake}`:
```json
{
  "tab_name": "{Technique FR} - {Catégorie FR}",
  "meta": { "content": "≤160 chars. Include Véronique Berthier. Rewrite artist's description for SEO." },
  "title": "{Technique FR} - {Catégorie FR}",
  "subtitle": "{Artist's title verbatim}"
}
```

**`i18n/locales/fr-FR.json`** — add under `pictures.{domain_plural}.{technique_snake}.{category_snake}`:
```json
{
  "fp1": { "title": "Fleur Porcelaine 1", "mobile_title": "FP1", "alt": "Fleur en porcelaine", "dimensions": "W x H cm" }
}
```

> **Note:** `dimensions` is required for paintings. Omit it for ceramics.

Then **`i18n/locales/en-US.json`** — same structure, natural English (not literal translation).

**meta.content rules:**
- ≤160 characters — Google truncates at 160
- Starts with "Galerie de…" / "Collection de…" (FR) or "Gallery of…" (EN)
- Mentions artist name "Véronique Berthier", technique, category
- Do NOT copy the artist's raw description verbatim

### 4. Create the Vue page file

Create `app/pages/{domain}/{technique-kebab}/{category-kebab}/index.vue`.

The script block must contain all of these in order:
1. Type import: `import type { ImageSource } from '~/types/image'`
2. Composables: `useI18n()`, `useRuntimeConfig()`, `useRoute()`
3. URL vars: `baseUrl`, `urlEndPath`, `ogImageEndPath`, `canonicalUrl`
4. `useHead()` with title, description, keywords, canonical, hreflang links
5. `useSeoMeta()` with OG, Twitter, article tags
6. Commented-out `defineOgImage` block (keep for future use)
7. `images: ImageSource[]` array
8. `previousPage` and `nextPage` objects

**Hreflang (NON-NEGOTIABLE):**
```typescript
{ rel: 'alternate', href: computed(() => `${baseUrl.value}/en/${urlEndPath}`), hreflang: 'en-US' },
{ rel: 'alternate', href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`), hreflang: 'fr-FR' },
{ rel: 'alternate', href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`), hreflang: 'x-default' },
// iOS home screen: overrides app.vue global apple-icon.jpg with this page's gallery artwork.
// `key` is required so Unhead deduplicates — page-level entry wins over app.vue.
{ rel: 'apple-touch-icon', sizes: '180x180', href: `/${ogImageEndPath}`, key: 'apple-touch-icon' },
```
`x-default` always points to `/fr/` — French is the default locale.

**Auto-import rule:** Do NOT manually import `ref`, `computed`, `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRuntimeConfig` — Nuxt auto-imports all of these.

**Reactive i18n in meta tags:** All `t()` calls inside `useHead()`/`useSeoMeta()` must be wrapped in `computed(() => t(...))` except `articleTag` array values which use `.value`.

**Style block:**
```scss
<style lang="scss" scoped>
.gallery-page {
  position: relative;
  width: 100%;

  .page-header {
    margin-bottom: 50px;
  }
}
</style>
```

### 5. Update Menu.vue

In `app/components/layout/Menu.vue`, inside `const sections = ref([...])`, find the subsection matching the technique. Update the link for this category from `url: '/wip'` to `url: '/{domain}/{technique-kebab}/{category-kebab}'`.

### 6. Update navigation links

- On the new page: set `previousPage`/`nextPage` to adjacent pages (use `/wip` + `wip.*` i18n keys for pages not yet created)
- On adjacent pages that previously pointed to `/wip` for this slot: update them to point to the new page

### 7. Verify

Run `yarn lint` and fix any issues before reporting completion.

---

## Checklist before reporting done

- [ ] Both `fr-FR.json` and `en-US.json` updated with page metadata and all image entries
- [ ] `meta.content` ≤ 160 chars in both locales
- [ ] Vue page created at correct path
- [ ] All images in the `images` array (one entry per image file), each with `src`, `title`, `mobileTitle`, `alt` — and `dimensions` for paintings (not ceramics)
- [ ] `useHead()` has canonical + all 3 hreflang entries + `apple-touch-icon` override pointing to `/${ogImageEndPath}`
- [ ] `useSeoMeta()` has OG + Twitter + articleTag
- [ ] Commented `defineOgImage` block present
- [ ] Menu.vue link updated from `/wip` to new path
- [ ] Navigation links updated on new and adjacent pages
- [ ] `yarn lint` passes
