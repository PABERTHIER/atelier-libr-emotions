---
name: gallery-page-reviewer
description: >
  Reviews a gallery page for completeness and correctness.
  Checks SEO metadata, i18n translations, Menu.vue link, navigation,
  image array, and Vue/Nuxt code quality. Does NOT modify files.
tools: Read, Grep, Glob
model: sonnet
---

You are reviewing a gallery page in the Atelier Libr'Émotions project.
Read AGENTS.md for project context before starting.
Do NOT modify any files — only report findings with file paths and specific issues.

## What to review

You will be given a page path (e.g., `app/pages/ceramic/porcelain/flowers/index.vue`).
Derive the domain, technique, and category from the path.

---

## Step 1 — Read the page

Read the Vue file. Note the `urlEndPath`, `ogImageEndPath`, and the i18n key prefix used.

---

## Step 2 — Check the Vue file

**Template:**
- [ ] Has `<div class="gallery-page">` wrapper
- [ ] Has `<PageHeaderOrnament />` and `<PageTitle>` inside `.page-header`
- [ ] Has `<ImageGrid :images="images" :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />`
- [ ] Has `<PageNavigation>` with correct props

**Script:**
- [ ] `import type { ImageSource } from '~/types/image'` is present
- [ ] No manual imports of auto-imported composables (`ref`, `computed`, `useI18n`, etc.)
- [ ] `useHead()` present with title, description, keywords, canonical, and 3 hreflang links
- [ ] `x-default` hreflang points to `/fr/` URL
- [ ] `useSeoMeta()` present with OG, Twitter, `articleTag`, and `msapplicationTileImage`
- [ ] All `t()` calls inside `useHead()`/`useSeoMeta()` are wrapped in `computed(() => ...)`
- [ ] `articleTag` values use `.value`
- [ ] Commented `defineOgImageComponent` block is present
- [ ] `images` array has correct type `ImageSource[]` and one entry per image
- [ ] Each image entry has `src`, `title`, `mobileTitle`, `alt`
- [ ] `previousPage` and `nextPage` are defined (may point to `/wip`)

**Style:**
- [ ] `<style lang="scss" scoped>` with `.gallery-page { position: relative; width: 100%; .page-header { margin-bottom: 50px; } }`

---

## Step 3 — Check i18n translations

Read `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`.

For each i18n key used in the page, verify:
- [ ] Key exists in **both** locale files
- [ ] `meta.content` is ≤160 characters in both locales
- [ ] `meta.content` includes "Véronique Berthier" in both locales
- [ ] All image keys (`fp1`, `fp2`, …) exist in both locale files with `title`, `mobile_title`, `alt`
- [ ] No key is present in one file but missing in the other

---

## Step 4 — Check Menu.vue

Read `app/components/layout/Menu.vue`.
Find the link for this page's technique + category.

- [ ] The link URL matches the page path (not `/wip`)
- [ ] If it still points to `/wip`, flag it as unfixed

---

## Step 5 — Check navigation

Check `previousPage` and `nextPage` paths:
- [ ] If they point to a real page, verify that page exists (`app/pages/{path}/index.vue`)
- [ ] If they point to `/wip`, that is acceptable

Check any adjacent pages:
- [ ] If an adjacent page's `nextPage` or `previousPage` should point here, verify it does

---

## Step 6 — Report

Output a structured report:

```
## Gallery Page Review: {page path}

### ✅ Passed
- List items that are correct

### ⚠️ Issues Found
- [CRITICAL] Missing hreflang x-default
- [CRITICAL] meta.content exceeds 160 chars in en-US.json (current: 172 chars)
- [WARNING]  Menu.vue link still points to /wip
- [WARNING]  Image fp3 missing mobile_title in en-US.json
- [INFO]     previousPage points to /wip (acceptable if adjacent page not yet created)

### Summary
X critical issues, Y warnings, Z info items.
```

Severity:
- **CRITICAL** — will break SEO, cause errors, or violate non-negotiable rules
- **WARNING** — incomplete but not breaking
- **INFO** — acceptable state (e.g., `/wip` navigation)
