# Claude Code Entry Point

@AGENTS.md

Use the shared project rules and Git restriction in `AGENTS.md`.
Read matching scoped instruction files manually; Copilot's `applyTo` metadata does not guarantee Claude attachment.
Load guide and skill bodies only when the task needs them.

## Project References

| File                                                                   | Purpose                                                                      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                                 | Shared constraints, architecture, commands, scope selection and verification |
| [.agents/README.md](.agents/README.md)                                 | Guidance ownership, evidence levels and catalogs                             |
| [README.md](README.md)                                                 | Site overview, local development and image/deployment workflow               |
| [STYLE_LAYOUT_REVIEW.md](STYLE_LAYOUT_REVIEW.md)                       | Dated structural proposals, not proof of completed changes                   |
| [copilot-instructions.md](.github/copilot-instructions.md)             | Copilot's entry point to the same shared catalogs                            |
| [Artwork naming map](.agents/skills/i18n/references/artwork-naming.md) | Route, translation-key, filename and group-directory mappings                |

## Reference Documentation

| Guide                     | File                                                      | Read for                                                    |
| ------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| Brand context             | [brand-context.md](.agents/docs/brand-context.md)         | Artist identity, presentation and factual positioning       |
| Content direction         | [content-direction.md](.agents/docs/content-direction.md) | French-first voice, English adaptation and artwork copy     |
| Design system             | [design-system.md](.agents/docs/design-system.md)         | Palette, typography, image framing and stylesheet ownership |
| UX principles             | [ux-principles.md](.agents/docs/ux-principles.md)         | Responsive composition, navigation, viewer and CV journeys  |
| Accessibility maintenance | [accessibility.md](.agents/docs/accessibility.md)         | Source findings, focus, motion and manual audit coverage    |
| SEO maintenance           | [SEO.md](.agents/docs/SEO.md)                             | Metadata ownership, origins, indexing and discovery         |

## Shared Skills

| Skill                | Shared file                                                    | Existing shortcut                |
| -------------------- | -------------------------------------------------------------- | -------------------------------- |
| Gallery pages        | [gallery-page](.agents/skills/gallery-page/SKILL.md)           | `/gallery-page`                  |
| Internationalization | [i18n](.agents/skills/i18n/SKILL.md)                           | `/i18n`                          |
| Nuxt and Vue         | [nuxt-vue-patterns](.agents/skills/nuxt-vue-patterns/SKILL.md) | `/nuxt-vue-patterns`             |
| Artwork assets       | [artwork-assets](.agents/skills/artwork-assets/SKILL.md)       | Read the shared file when needed |
| Accessibility        | [accessibility](.agents/skills/accessibility/SKILL.md)         | Read the shared file when needed |
| SEO                  | [seo](.agents/skills/seo/SKILL.md)                             | `/seo`                           |

Canonical skills live in `.agents/skills/`.
Existing command files preserve shortcuts while reading those shared files.
See [Claude Code skill locations and commands](https://code.claude.com/docs/en/skills#choose-where-skills-load) for client discovery behavior.

## Scoped Instructions

| Instruction                                                         | File patterns                                                                            | Use for                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Nuxt and Vue](.github/instructions/vue-nuxt.instructions.md)       | `app/**/*.vue`, `app/**/*.ts`, `nuxt.config.ts`                                          | Components, SSR, application helpers and configuration  |
| [Styling](.github/instructions/styles.instructions.md)              | `app/**/*.vue`, `app/styles/**/*.scss`, `nuxt.config.ts`                                 | Appearance, responsive layout and style loading         |
| [Internationalization](.github/instructions/i18n.instructions.md)   | `i18n/locales/*.json`                                                                    | French and English messages, keys and interpolation     |
| [Accessibility](.github/instructions/accessibility.instructions.md) | `app/**/*.vue`, `app/plugins/**/*.ts`, `app/composables/**/*.ts`, `app/styles/**/*.scss` | Semantics, focus, overlays, readability and motion      |
| [Gallery pages](.github/instructions/gallery-page.instructions.md)  | `app/pages/painting/**/*.vue`, `app/pages/ceramic/**/*.vue`                              | Collections, groups, menu slots and adjacent-page links |

Select these files using [AGENTS.md's applicability rules](AGENTS.md#tool-integration-and-scoped-instructions).
Keep requirements in their owning guide, skill or scoped file rather than duplicating them in Claude-only rules.

## Command Adapters

| Command              | File                                                          | Shared workflow                         |
| -------------------- | ------------------------------------------------------------- | --------------------------------------- |
| `/gallery-page`      | [gallery-page.md](.claude/commands/gallery-page.md)           | Gallery creation, extension or review   |
| `/new-gallery-page`  | [new-gallery-page.md](.claude/commands/new-gallery-page.md)   | End-to-end gallery implementation       |
| `/i18n`              | [i18n.md](.claude/commands/i18n.md)                           | Translation and localized UI work       |
| `/add-translations`  | [add-translations.md](.claude/commands/add-translations.md)   | Locale messages without creating a page |
| `/seo`               | [seo.md](.claude/commands/seo.md)                             | Page metadata implementation or review  |
| `/nuxt-vue-patterns` | [nuxt-vue-patterns.md](.claude/commands/nuxt-vue-patterns.md) | Nuxt/Vue implementation guidance        |

## Reusable Task Prompts

| Prompt specification    | File                                                                     | Matching Claude workflow                       |
| ----------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| New or extended gallery | [new-gallery-page.prompt.md](.github/prompts/new-gallery-page.prompt.md) | `/new-gallery-page` and the gallery-page skill |
| Gallery translations    | [add-translations.prompt.md](.github/prompts/add-translations.prompt.md) | `/add-translations` and the i18n skill         |

These files define reusable Copilot prompts; Claude uses the command adapters above for the corresponding workflows.

## Review Agent

| Agent                   | File                                                                | Capability                                            |
| ----------------------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| `gallery-page-reviewer` | [gallery-page-reviewer.md](.claude/agents/gallery-page-reviewer.md) | Read-only source review using shared gallery criteria |

Availability of this agent does not require delegation for ordinary work.
Its read-only tool set does not establish runtime or build coverage.

## Local Execution And Other Agents

Use Node.js 24 and the Yarn version pinned in `package.json`.
On PowerShell hosts that block `yarn.ps1`, use `yarn.cmd`.
Follow [shared verification](AGENTS.md#verification) and record checks actually run.

Its explicit scoped-file selection is documented in [AGENTS.md](AGENTS.md#tool-integration-and-scoped-instructions); this Claude entry point is not its instruction source.
