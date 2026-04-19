# CLAUDE.md

This file provides project context for Claude Code.

## Core Reference

@AGENTS.md

---

## Claude Code — Specific Notes

### Environment

- **OS**: Windows. Use PowerShell commands (not bash).  
- **Package manager**: Yarn 4 — always use `yarn`, never `npm`.  
- **Dev server**: `yarn dev` (port 3000). After changes, `yarn lint` to verify.

### Auto-imports in this project

Nuxt auto-imports mean you must **never** manually import these in `.vue` files:
`ref`, `computed`, `watch`, `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRuntimeConfig`, `useLocalePath`, `navigateTo`, `definePageMeta`

You **must** manually import:

- Types: `import type { ImageSource } from '~/types/image'`
- Type: `import type { PageNavigation } from '~/types/page'`

### Where things live

| What | Where |
|---|---|
| Gallery pages | `app/pages/{painting\|ceramic}/{technique-kebab}/{category-kebab}/index.vue` |
| Navigation menu | `app/components/layout/Menu.vue` — `const sections = ref([...])` at line ~128 |
| FR translations | `i18n/locales/fr-FR.json` |
| EN translations | `i18n/locales/en-US.json` |
| Images | `public/paintings/...` or `public/ceramics/...` (WebP) |
| SCSS variables | `app/styles/variables.scss` (auto-imported — use directly, no `@use` needed in `.vue`) |
| Image route pre-render | `app/utils/generateImageRoutes.ts` — add new images here too |
| TypeScript types | `app/types/image.ts`, `app/types/page.ts` |

### Pre-rendering new images

When adding images to a new gallery page, **also add them** to `app/utils/generateImageRoutes.ts`
in the `imagesConfig` array with relevant sizes so Vercel pre-renders the IPX routes.
Typical gallery sizes: `[120, 160, 220, 300, 600]` plus `@2x` variants (handled automatically).

---

## Available Skills

Invoke with `/skill-name [arguments]` in Claude Code.

| Skill | Invocation | When to use |
|---|---|---|
| gallery-page | `/gallery-page "Porcelaine - Fleurs"` | Create a new gallery page end-to-end |
| seo | `/seo` | Write or review SEO metadata on a page |
| i18n | `/i18n "porcelain flowers"` | Add or fix translation entries |
| nuxt-vue-patterns | `/nuxt-vue-patterns` | Reference Vue/Nuxt conventions |

## Available Agents

| Agent | When to use |
|---|---|
| `gallery-page-reviewer` | Review a finished gallery page for correctness and completeness |

## Available Commands

| Command | Invocation | When to use |
|---|---|---|
| new-gallery-page | `/new-gallery-page` | Full guided workflow for a new gallery page |
| add-translations | `/add-translations` | Add i18n entries to both locale files only |
