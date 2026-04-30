---
description: "Add i18n translations for a gallery page to both fr-FR.json and en-US.json without creating the page component."
---

# Add Gallery Page Translations

You are adding i18n translation entries for a gallery page in Atelier Libr'Émotions.

## Required Information

Before starting, you **must** have:

1. **Domain** — `painting` or `ceramic`
2. **Technique** — in French (e.g., Porcelaine, Four électrique, Acrylique)
3. **Category** — in French (e.g., Fleurs, Abstraits, Nature)
4. **Image list** — filenames with optional titles/dimensions (e.g., `FP1: Fleur Porcelaine 1, 12cm`)
5. **Artist's description** (optional) — used to craft the `meta.content`
6. **Artist's subtitle** — the `subtitle` field for the page

## What to produce

Edit **both** `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`.

### 1. Page metadata

Add under `pages.{domain}.{technique_snake}.{category_snake}` in each file:

```json
{
  "tab_name": "{Technique} - {Catégorie}",
  "meta": {
    "content": "≤160 chars, includes artist name Véronique Berthier, technique, category"
  },
  "title": "{Technique} - {Catégorie}",
  "subtitle": "{Artist's subtitle}"
}
```

### 2. Image descriptions

Add under `pictures.{domain_plural}.{technique_snake}.{category_snake}` in each file:

```json
{
  "{lowercase_filename_without_ext}": {
    "title": "{Type} {N}",
    "mobile_title": "{SHORT_CODE}",
    "alt": "{Short accessible description}",
    "dimensions": "{W x H cm}"
  }
}
```

> **Note:** `dimensions` is required for paintings. Omit it for ceramics.

## Rules

- Image key = lowercase filename without extension (`FP1.webp` → `fp1`)
- FR: write in French; EN: write in natural English (not a literal translation)
- `meta.content` ≤ 160 characters
- `mobile_title` ≤ 10 characters (e.g., `FP1`, `EC3`)
- `alt` must describe what is visually depicted
- Never add a key to one file without adding it to the other
- Preserve existing JSON structure — do not reformat unrelated sections

## Technique key reference

| French | JSON key |
|---|---|
| Four électrique | `electric_kiln` |
| Raku et enfumage | `raku_and_smouldering` |
| Porcelaine | `porcelain` |
| Acrylique | `acrylic` |
| Encres | `inks` |
| Huile | `oil` |
| Fusain | `charcoal` |
| Pastel | `pastel` |
| Technique mixte | `mixed_technique` |
