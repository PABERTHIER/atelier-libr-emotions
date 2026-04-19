---
name: i18n
description: >
  Manage translation entries in fr-FR.json and en-US.json.
  Use when adding, modifying, or reviewing i18n keys for gallery pages or shared labels.
disable-model-invocation: true
argument-hint: "<technique> <category> (e.g. porcelain flowers)"
---

You are managing i18n translations for: $ARGUMENTS

The project has two locale files that must always be kept in sync.
Read existing entries in `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json` before editing.

---

## The Two-File Rule (NON-NEGOTIABLE)

**Every change to `fr-FR.json` MUST have a matching change in `en-US.json` in the same edit.**
Never add a key to one file without the other. Never leave a key untranslated.

---

## Key Structure

```
pages.{domain}.{technique_snake}.{category_snake}.tab_name
pages.{domain}.{technique_snake}.{category_snake}.meta.content
pages.{domain}.{technique_snake}.{category_snake}.title
pages.{domain}.{technique_snake}.{category_snake}.subtitle

pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.title
pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.mobile_title
pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.alt
```

- `{domain}` = `painting` or `ceramic` (singular)
- `{domain_plural}` = `paintings` or `ceramics` (with s)
- `{image_key}` = lowercase filename without extension (`FP1.webp` → `fp1`, `AutomaticPainting1.webp` → `automatic_painting_1`)

---

## Technique Naming Table

| French | i18n snake_case | URL kebab-case | public/ folder |
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

---

## JSON Template for a New Gallery Page

### fr-FR.json — page metadata

```json
"pages": {
  "{domain}": {
    "{technique_snake}": {
      "{category_snake}": {
        "tab_name": "{Technique FR} - {Catégorie FR}",
        "meta": {
          "content": "≤160 chars. Include Véronique Berthier. Technique + category. Professional SEO copy."
        },
        "title": "{Technique FR} - {Catégorie FR}",
        "subtitle": "{Artist's subtitle verbatim}"
      }
    }
  }
}
```

### fr-FR.json — image entries

```json
"pictures": {
  "{domain_plural}": {
    "{technique_snake}": {
      "{category_snake}": {
        "{image_key}": {
          "title": "{Type} {N} : {WxH}cm",
          "mobile_title": "{PREFIX}{N}",
          "alt": "Short accessible description of what is depicted"
        }
      }
    }
  }
}
```

### en-US.json — same structure, natural English

The English `meta.content` must be independently written for English SEO — not a literal translation.

---

## Field Quality Rules

| Field | Rule |
|---|---|
| `meta.content` | ≤160 chars. Starts with "Galerie de…" (FR) or "Gallery of…" (EN). Includes artist name. |
| `tab_name` / `title` | "{Technique} - {Category}" format. Consistent across FR and EN. |
| `subtitle` | Artist's phrasing (FR), natural adaptation (EN). |
| `mobile_title` | Short code ≤10 chars, matches filename prefix. E.g., `FP1`, `EC3`, `PM2`. |
| `alt` | Describes what is visually depicted. 5–15 words. No "image of" prefix. |
| `title` (image) | Format: `"{Type} {N} : {W}x{H}"` when dimensions are known. |

---

## Miscellaneous Keys

`miscellaneous.*` holds shared labels used in the menu, SEO keywords, and throughout pages.

Before adding a new `miscellaneous` key, search both locale files first — it may already exist.
If adding a new one, add it to both files in the same edit.

---

## WIP Fallback Keys

When a page navigation link points to a page not yet created, use `/wip` as the path.
The `wip.*` keys (`wip.previous_page_name`, `wip.next_page_name`, etc.) are already defined in both files — do not redefine them.

---

## JSON Formatting Rules

- 2-space indent (matches `.editorconfig`)
- No trailing commas (strict JSON)
- Do not reformat or reorder unrelated sections when editing
- Preserve existing nesting depth and style
