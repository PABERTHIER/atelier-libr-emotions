---
name: i18n
description: "i18n management for Atelier Libr'Émotions: key structure, naming conventions, both-locale rule, and translation quality guidelines. Use this skill when adding or modifying translation entries."
---

# i18n Skill

The project uses `@nuxtjs/i18n` v10 with **two locales** — French (default) and English.
All user-visible text lives in the translation files. Never hardcode French or English strings in Vue files.

---

## Configuration

```typescript
// nuxt.config.ts
i18n: {
  defaultLocale: 'fr',          // French is default
  langDir: 'locales',           // relative to i18n/
  strategy: 'prefix',           // /fr/path and /en/path
  locales: [
    { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
    { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
  ],
}
```

**Files:** `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`

---

## Top-Level Key Structure

```
app.*                    — app name, logo alt, meta alt names
components.*             — header, menu, lang switcher labels
pages.*                  — page-specific metadata and content
  pages.main.*
  pages.painting.*
  pages.ceramic.*
  pages.about.*
  pages.development.*
  pages.cv.*
  pages.contact.*
about.*                  — artist info (name, email, location)
pictures.*               — image titles, mobile titles, alt text
  pictures.paintings.*
  pictures.ceramics.*
miscellaneous.*          — shared labels (technique names, category names, keywords)
wip.*                    — work-in-progress placeholder text
```

---

## Gallery Page Keys

### Page metadata

```
pages.{domain}.{technique_snake}.{category_snake}.tab_name
pages.{domain}.{technique_snake}.{category_snake}.meta.content
pages.{domain}.{technique_snake}.{category_snake}.title
pages.{domain}.{technique_snake}.{category_snake}.subtitle
```

Where:
- `{domain}` = `painting` or `ceramic` (singular, no 's')
- `{technique_snake}` = snake_case version of the technique (see table below)

### Image descriptions

```
pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.title
pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.mobile_title
pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.alt
```

Where:
- `{domain_plural}` = `paintings` or `ceramics` (with 's')
- `{image_key}` = **lowercase** filename without extension (`FP1.webp` → `fp1`, `AutomaticPainting1.webp` → `automatic_painting_1`)

---

## Technique Naming Table

| Technique (French) | i18n snake_case | URL kebab-case | public/ folder name |
|---|---|---|---|
| Four électrique | `electric_kiln` | `electric-kiln` | `electric_kiln` |
| Raku et enfumage | `raku_and_smouldering` | `raku-smouldering` | `raku_smouldering` |
| Porcelaine | `porcelain` | `porcelain` | `porcelain` |
| Acrylique | `acrylic` | `acrylic` | `acrylic` |
| Encres | `inks` | `inks` | `inks` |
| Huile | `oil` | `oil` | `oil` |
| Fusain | `charcoal` | `charcoal` | `charcoal` |
| Pastel | `pastel` | `pastel` | `pastel` |
| Technique mixte | `mixed_technique` | `mixed-technique` | `mixed_technique` |
| Tour (poterie) | `wheel_pottery` | `wheel-pottery` | `wheel_pottery` |

---

## Miscellaneous Keys

`miscellaneous.*` contains shared labels used in the menu and as SEO keywords.
Before adding a new `miscellaneous` key, **search both locale files** to check it doesn't already exist.

Existing keyword keys include (not exhaustive):
`painting`, `painter`, `acrylic`, `abstracts`, `automatic_painting`, `abstract_art`, `mish_mash`, `haphazardly`, `inks`, `indian_inks`, `oil_painting`, `ceramic`, `ceramicist`, `electric_kiln`, `porcelain`, `raku_and_smouldering`, `nature`, `flowers`, `landscape`, `roots`, `trees`, `water`, `water_jet`, `art`, `artist`, `emotions`, `faces`, `nudes`, `animals`, `miscellaneous`, `christmas`, `easter`

---

## The Two-File Rule (NON-NEGOTIABLE)

**Every change to `fr-FR.json` must have a matching change in `en-US.json`.**
Never add a key to one file without adding it to the other.
The English translation must be a proper natural English adaptation — not a word-for-word literal translation.

---

## In Vue Files

```typescript
const { t } = useI18n()

// Simple usage
t('pages.painting.acrylic.abstracts.title')

// Reactive (for meta tags — must be wrapped in computed())
computed(() => t('pages.ceramic.porcelain.flowers.meta.content'))

// In template
{{ t('miscellaneous.art') }}
```

---

## WIP Fallback Keys

When navigation points to a page not yet created, use `/wip` as the path and these keys:

```
wip.previous_page_name
wip.previous_page_description
wip.next_page_name
wip.next_page_description
```

These are already defined in both locale files.

---

## Translation Quality Guidelines

| Field | FR guideline | EN guideline |
|---|---|---|
| `tab_name` | "{Technique} - {Catégorie}" | "{Technique} - {Category}" |
| `meta.content` | ≤160 chars, starts with "Galerie de…" or "Collection de…", includes artist name | ≤160 chars, natural English, includes artist name |
| `title` | Same as `tab_name` | Same as `tab_name` |
| `subtitle` | Artist's exact phrasing | Natural English adaptation |
| `title` (image) | "{Type} {N} : {WxH}cm" format when dimensions known | Same format |
| `mobile_title` | Short code: "{PREFIX}{N}" e.g., "FP1", "EC3" | Same |
| `alt` | Short accessible description of what's depicted | Translated, descriptive |
