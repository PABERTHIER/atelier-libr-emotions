---
description: "Create a new painting or ceramic gallery page end-to-end: i18n translations, page component, Menu.vue update, and navigation links."
---

# New Gallery Page

You are creating a new gallery page for the Atelier Libr'Émotions artist portfolio website.

## Required Information

Before starting, you **must** have all of the following. If any is missing, ask for it:

1. **Domain** — `painting` or `ceramic`
2. **Section (technique)** — e.g., Porcelaine, Acrylique, Raku et enfumage, Encres
3. **Category (type)** — e.g., Fleurs, Abstraits, Nature
4. **Description** (optional) — The artist's description of this category. Use it to craft the SEO `meta.content` — do NOT copy it verbatim.
5. **Title** — Used as the page subtitle (displayed under the main heading)
6. **Image filenames** — e.g., FP1,...FP14 (the prefix pattern and range)

## Pre-Implementation Checks

1. Verify the images exist in `public/{domain_plural}/{technique_snake}/{category}/` as `.webp` files.
2. Check `Menu.vue` to find the corresponding `/wip` link that needs updating.
3. Identify adjacent pages for `previousPage`/`nextPage` navigation.

## Implementation Steps

### Step 1: Add i18n translations

Update **both** `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`:

**Page metadata** — add under `pages.{domain}.{technique_snake}.{category_snake}`:
```json
{
  "tab_name": "{Technique} - {Category}",
  "meta": {
    "content": "SEO description crafted from the artist's description"
  },
  "title": "{Technique} - {Category}",
  "subtitle": "The artist's title for this category"
}
```

**Image descriptions** — add under `pictures.{domain_plural}.{technique_snake}.{category_snake}`:
```json
{
  "fp1": {
    "title": "Descriptive title",
    "mobile_title": "FP1",
    "alt": "Accessible description of the artwork",
    "dimensions": "W x H cm"
  }
}
```

> **Note:** `dimensions` is required for paintings. Omit it for ceramics.

**Shared labels** — add any missing keys in `miscellaneous.*` for menu labels and SEO keywords.

### Step 2: Create the page component

Create `app/pages/{domain}/{technique-kebab}/{category-kebab}/index.vue` using the gallery page skill (`/gallery-page`).

Use the reference page `app/pages/ceramic/porcelain/flowers/index.vue` as the canonical example.

### Step 3: Update Menu.vue

In `app/components/layout/Menu.vue`, find the link with `url: '/wip'` for this technique/category and change it to the new page path.

### Step 4: Update navigation links

- Set `previousPage` and `nextPage` in the new page
- Update any adjacent pages that should now link to this page

### Step 5: Verify

- Run `yarn lint` to check for issues
- Check that the page renders correctly with `yarn dev`

## Key Rules

- See `/gallery-page` skill for the exact template pattern
- See `gallery-page.instructions.md` for auto-applied conventions
- Images must be WebP format
- The artist's description becomes the SEO `meta.content` — rewrite it into a proper, concise SEO meta description
- Always update both FR and EN translation files
