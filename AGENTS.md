# AGENTS.md

This file provides shared guidance for AI coding agents (Claude Code, GitHub Copilot, and others)
when working with code in this repository.

---

## Project Overview

**Atelier Libr'Émotions** is an artist portfolio website for a painter and ceramicist. It showcases paintings, ceramics, events, and artist information. Built with **Nuxt 4** (Vue 3 + TypeScript), deployed on **Vercel** as a statically pre-rendered site.

The primary development workflow is **adding new gallery pages** — each page displays a collection of artwork images for a specific technique and category (e.g., painting/acrylic/abstracts, ceramic/porcelain/flowers).

---

## Repository Layout

```
atelier-libr-emotions/
├── app/
│   ├── pages/                    # Nuxt file-based routing
│   │   ├── painting/             # Painting gallery pages
│   │   │   ├── acrylic/abstracts/index.vue
│   │   │   ├── oil/abstracts/index.vue
│   │   │   └── inks/nature/index.vue
│   │   ├── ceramic/              # Ceramic gallery pages
│   │   │   ├── electric-kiln/nature/index.vue
│   │   │   ├── porcelain/flowers/index.vue
│   │   │   └── raku-smouldering/nature/index.vue
│   │   ├── about/                # Artist pages (approach, career, CV)
│   │   ├── contact/              # Contact page
│   │   └── wip/                  # Work-in-progress placeholder
│   ├── components/
│   │   ├── layout/               # Header, Menu, Footer
│   │   ├── ImageGrid.vue         # Responsive masonry gallery
│   │   ├── Image.vue             # NuxtImg wrapper
│   │   ├── PageTitle.vue         # Page heading
│   │   ├── PageHeaderOrnament.vue
│   │   └── PageNavigation.vue    # Previous/Next navigation
│   ├── composables/              # screen-size, shared logic
│   ├── types/                    # TypeScript types (ImageSource, Heights, PageNavigation)
│   ├── utils/                    # generateImageRoutes for pre-rendering
│   ├── styles/                   # SCSS variables and keyframes
│   ├── layouts/                  # Default layout
│   └── app.vue                   # Root component
├── i18n/locales/                 # Translation files
│   ├── fr-FR.json                # French (default locale)
│   └── en-US.json                # English
├── public/                       # Static image assets
│   ├── paintings/                # Painting images by technique/category
│   └── ceramics/                 # Ceramic images by technique/category
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Dependencies and scripts
├── eslint.config.mjs             # ESLint + Prettier rules
└── .editorconfig                 # Editor formatting rules
```

---

## Tech Stack

| Purpose            | Technology                          |
|--------------------|-------------------------------------|
| Framework          | Nuxt 4 (Vue 3 + TypeScript)        |
| Styling            | SCSS with global variables          |
| Image optimization | @nuxt/image (IPX provider)          |
| i18n               | @nuxtjs/i18n (prefix strategy)     |
| SEO                | @nuxtjs/seo (OG, Twitter, Schema)  |
| UI components      | @nuxt/ui                            |
| Fonts              | @nuxt/fonts (Google Fonts)          |
| Smooth scroll      | Lenis                               |
| Linting            | ESLint + Prettier                   |
| Package manager    | Yarn 4.13.0                         |
| Deployment         | Vercel (static pre-rendering)       |

---

## Git Policy — AI Agents Must Never Commit or Push

**AI agents (Claude Code, GitHub Copilot, and any other tool) are strictly forbidden from running any destructive or history-altering git commands without explicit user instruction.**

### Permanently forbidden without explicit user request

- `git commit` — never commit on behalf of the user
- `git push` — never push to any remote
- `git reset` — never alter HEAD or the index
- `git rebase` — never rebase branches
- `git merge` — never merge branches
- `git cherry-pick` — never cherry-pick commits
- `git revert` — never create revert commits
- `git stash` — never stash changes
- `git tag` — never create or delete tags
- `git branch -D` — never delete branches
- `git am` — never apply patches

### Allowed read-only git operations

- `git status`, `git diff`, `git log`, `git show` — inspection only

### Rule

If the user says "commit the changes" or "push", **ask for confirmation first** and show exactly what will be committed/pushed before running the command. Never commit speculatively at the end of a task.

---

## Build and Dev Commands

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Build for production
yarn build

# Generate static site
yarn generate

# Preview production build
yarn preview

# Lint
yarn lint

# Lint and auto-fix
yarn lint:fix
```

---

## Code Style

- **Indent**: 2 spaces
- **End of line**: LF
- **Charset**: utf-8
- **Vue SFC order**: `<template>`, `<script setup lang="ts">`, `<style lang="scss" scoped>`
- **Prefer Composition API** with `<script setup>`
- **Use Nuxt auto-imports** — `useI18n()`, `useHead()`, `useSeoMeta()`, `useRoute()`, `useRuntimeConfig()`, `ref()`, `computed()` are auto-imported
- **Import types explicitly**: `import type { ImageSource } from '~/types/image'`
- **SCSS scoped styles**: all component styles use `<style lang="scss" scoped>`
- **No inline comments** unless the logic is genuinely non-obvious
- Run `yarn lint` before committing

---

## Internationalization (i18n)

**Default locale**: French (`fr`)
**Strategy**: Prefix-based (`/fr/path` and `/en/path`)
**Base URL**: `https://atelierlibremotions.vercel.app`

### Translation Key Structure

Translation files are located in `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`.

**Page metadata keys** follow the pattern:

```
pages.{domain}.{technique_snake_case}.{category_snake_case}.tab_name
pages.{domain}.{technique_snake_case}.{category_snake_case}.meta.content
pages.{domain}.{technique_snake_case}.{category_snake_case}.title
pages.{domain}.{technique_snake_case}.{category_snake_case}.subtitle
```

**Image description keys** follow the pattern:

```
pictures.{domain_plural}.{technique_snake_case}.{category_snake_case}.{image_key}.title
pictures.{domain_plural}.{technique_snake_case}.{category_snake_case}.{image_key}.mobile_title
pictures.{domain_plural}.{technique_snake_case}.{category_snake_case}.{image_key}.alt
pictures.{domain_plural}.{technique_snake_case}.{category_snake_case}.{image_key}.dimensions  (paintings only, optional)
```

**Shared labels** are in `miscellaneous.*` and `about.*`.

### Convention for domain names in i18n keys vs URL paths

| Context       | Paintings domain | Ceramics domain       |
|---------------|------------------|-----------------------|
| URL path      | `painting`       | `ceramic`             |
| i18n page key | `painting`       | `ceramic`             |
| i18n pictures | `paintings`      | `ceramics`            |
| Public folder | `paintings`      | `ceramics`            |

Technique names use **snake_case** in i18n keys (e.g., `electric_kiln`, `raku_and_smouldering`) but **kebab-case** in URL paths (e.g., `electric-kiln`, `raku-smouldering`).

---

## Image Conventions

### Storage

Images are stored in `public/` with the following structure:

```
public/paintings/{technique}/{category}/{Filename}.webp
public/ceramics/{technique_snake_case}/{category}/{Filename}.webp
```

### Format

- All images must be in **WebP** format (`.webp`)
- Nuxt Image provides fallback to JPG/PNG

### Naming

- Image filenames use short prefix codes based on the artwork type
- Examples: `FP1.webp` (Fleur Porcelaine 1), `F1.webp` (Fleur 1), `EC1.webp` (Encre Chine 1), `AutomaticPainting1.webp`
- The user provides filenames — use them as-is

---

## Gallery Page Architecture (Core Pattern)

**This is the most important section.** All painting and ceramic gallery pages follow the same pattern.

### Template Structure

```vue
<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.{domain}.{technique}.{category}.title')"
        :subtitle="t('pages.{domain}.{technique}.{category}.subtitle')" />
    </div>

    <div class="gallery-container">
      <ImageGrid
        :images="images"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>
```

### Script Structure

Every gallery page script block must include:

1. **Imports**: `import type { ImageSource } from '~/types/image'`
2. **Composables**: `useI18n()`, `useRuntimeConfig()`, `useRoute()`
3. **URL configuration**: `baseUrl`, `urlEndPath`, `ogImageEndPath`, `canonicalUrl`
4. **`useHead()`**: title, meta description, keywords, canonical URL, hreflang alternates
5. **`useSeoMeta()`**: OG tags, Twitter cards, article tags
6. **Images array**: `ImageSource[]` with `src`, `title`, `mobileTitle`, `alt`, and optional `dimensions` (for paintings — use the `dimensions` i18n key)
7. **Navigation**: `previousPage` and/or `nextPage` objects with `path`, `title`, `description`

### Style Block

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

### SEO Keywords

Keywords should be relevant to the artwork type. Use `t('miscellaneous.X')` for each keyword.
Always include these base keywords: `art`, `artist`, `emotions`, `about.author`, `app.name`.
Add domain-specific keywords (e.g., `ceramic`, `ceramicist`, `porcelain` for a ceramic page).

### Navigation Links

- Pages that are not yet created should link to `/wip`
- `previousPage` and `nextPage` use i18n keys from the adjacent pages or `wip.*` keys

---

## Creating a New Gallery Page — Step-by-Step

When the user asks to create a new page, they provide:

- **Domain**: painting or ceramic
- **Section (technique)**: e.g., Porcelaine, Acrylique, Raku et enfumage
- **Category (type)**: e.g., Fleurs, Abstraits, Nature
- **Description** (optional): Artist's description — use it to write the `meta.content` (SEO meta description), do NOT use it as-is
- **Title**: Used for the subtitle of the page
- **Image filenames**: e.g., FP1,...FP14

### Step 1: Add images to public/

Verify images exist in the correct folder:

```
public/{domain_plural}/{technique_snake_case}/{category}/{Filename}.webp
```

### Step 2: Add i18n translations

In **both** `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`:

1. Add page metadata under `pages.{domain}.{technique_snake}.{category_snake}`:
   - `tab_name`: Browser tab title (e.g., "Porcelaine - Fleurs")
   - `meta.content`: SEO meta description (rewrite the artist's description into a proper SEO-friendly sentence)
   - `title`: Page heading (e.g., "Porcelaine - Fleurs")
   - `subtitle`: Artist's title for the category

2. Add image descriptions under `pictures.{domain_plural}.{technique_snake}.{category_snake}`:
   - For each image: `{image_key}` with `title`, `mobile_title`, `alt`, and `dimensions` (paintings only)

3. Add any missing `miscellaneous.*` keys needed for menu labels and SEO keywords

### Step 3: Create the page Vue file

Create `app/pages/{domain}/{technique-kebab}/{category-kebab}/index.vue` following the gallery page pattern above.

### Step 4: Update Menu.vue

In `app/components/layout/Menu.vue`, find the link that currently points to `/wip` for this technique/category and update its `url` to the new page path.

### Step 5: Update page navigation

Update `previousPage`/`nextPage` references in:

- The newly created page (point to adjacent pages)
- Adjacent pages that should now link to the new page instead of `/wip`

---

## Menu Structure

The menu in `app/components/layout/Menu.vue` is organized as:

```
Section (e.g., Painting, Ceramic, Events, The Artist)
└── Sub-section (technique, e.g., Acrylic, Porcelain)
    └── Links (category, e.g., Abstracts, Flowers, Nature)
```

Links that point to `/wip` indicate pages not yet created. When creating a new page, the corresponding `/wip` link must be updated.

---

## Available Skills

Invoke with `/skill-name` in Copilot Chat. Claude Code loads them via `CLAUDE.md` imports.

| Skill | When to use |
|---|---|
| `/gallery-page` | Creating a new gallery page (painting or ceramic) — full template pattern |
| `/seo` | Writing or reviewing SEO metadata: `useHead`, `useSeoMeta`, keywords, hreflang, OG |
| `/i18n` | Managing translations: key structure, naming conventions, two-locale rule |
| `/nuxt-vue-patterns` | Vue 3 / Nuxt 4 conventions: Composition API, auto-imports, SCSS, components |

---

## Available Prompts (Copilot Chat) / Commands (Claude Code)

| Name | Copilot (`/`) | Claude Code (`/`) | When to use |
|---|---|---|---|
| `new-gallery-page` | ✅ | ✅ | Full end-to-end gallery page creation |
| `add-translations` | ✅ | ✅ | Add i18n entries to both locale files only |

---

## Available Instructions (auto-applied by Copilot)

| File | Applies to |
|---|---|
| `gallery-page.instructions.md` | `app/pages/painting/**` and `app/pages/ceramic/**` |
| `vue-nuxt.instructions.md` | `app/**/*.vue` — Composition API, auto-imports, SCSS |
| `i18n.instructions.md` | `i18n/**/*.json` — key structure, two-locale rule, quality |
