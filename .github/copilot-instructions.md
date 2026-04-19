# GitHub Copilot Repository Instructions

This project uses shared agent instructions defined in `AGENTS.md` at the repository root.
Copilot reads both this file and `AGENTS.md` automatically.

This file provides Copilot-specific behavioral guidance that complements `AGENTS.md`.

## Copilot-Specific Guidelines

### Code Generation

- Use `<script setup lang="ts">` for all Vue SFCs (never Options API)
- Nuxt auto-imports are available — do NOT manually import `ref`, `computed`, `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRuntimeConfig`, `useLocalePath`
- DO manually import types: `import type { ImageSource } from '~/types/image'`
- All styles must use `<style lang="scss" scoped>`
- Use SCSS variables from `@/styles/variables.scss` (auto-imported via Vite)
- Follow `.editorconfig`: 2-space indent, LF line endings, utf-8

### When Suggesting Code Changes

- Match existing code patterns in the same file/project
- Preserve the gallery page template structure exactly (see `AGENTS.md`)
- Always include full SEO metadata (`useHead` + `useSeoMeta`) on gallery pages
- Use `computed()` for reactive i18n values in meta tags
- All image paths start with `/` (relative to `public/`)

### Commit Messages

- Use conventional commit format
- Include a clear description of what changed and why

### For Scoped Instructions

- See `.github/instructions/` for file-type-specific rules that apply automatically
- See `.github/prompts/` for reusable prompt templates (invoke with `/` in Copilot Chat)
- See `.github/skills/` for detailed pattern references
