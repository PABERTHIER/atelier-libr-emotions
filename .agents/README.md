# Atelier Libr'Émotions — Design and implementation guidance

This folder contains project references and reusable skills for Véronique Berthier's painting and ceramics portfolio.
Start with [AGENTS.md](../AGENTS.md) for shared constraints, architecture, commands and verification.
Use this index to select the context needed for the task rather than loading every guide and skill.

## Guidance ownership

| Layer                | Location                                                                         | Purpose                                                                |
| -------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Shared project rules | [AGENTS.md](../AGENTS.md)                                                        | Repository constraints, common conventions and verification            |
| Reference guides     | [docs](docs/)                                                                    | Identity, editorial direction, design, UX and maintenance context      |
| Task skills          | [skills](skills/)                                                                | Focused implementation and review workflows                            |
| Scoped instructions  | [.github/instructions](../.github/instructions/)                                 | File-specific requirements and links to their owning guides and skills |
| Task entry points    | [.github/prompts](../.github/prompts/), [.claude/commands](../.claude/commands/) | Prompt scope and thin adapters to shared workflows                     |

Keep each detailed procedure in its owning skill and each maintenance topic in its guide.
Tool-specific files should route to shared guidance rather than maintain competing copies.
The catalogs do not imply that every listed guide or skill applies to every task.

## Evidence and implementation status

| Status                  | Meaning                                                                 | How to use it                                                                 |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Confirmed content       | Supported by supplied artist information or authored repository content | Preserve names and claims; reconfirm changes to time-sensitive facts          |
| Observed implementation | Directly supported by the inspected source                              | Recheck the current file before relying on a component contract or limitation |
| Proposed direction      | A recommendation or acceptance criterion for future work                | Apply within the requested scope; do not describe it as already implemented   |
| Verified behavior       | Supported by recorded checks in a stated environment                    | Report the actual coverage and its limits                                     |

A documented requirement is not evidence that the current site satisfies it.
Source inspection does not establish browser behavior, accessible contrast, screen reader quality or deployed SEO output.
The dated [style and layout review](../STYLE_LAYOUT_REVIEW.md) remains a proposal until its changes are implemented and checked.

## Reference guides

| Guide                                              | Read for                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Brand context](docs/brand-context.md)             | Confirmed identity, artistic themes, visitor intent and presentation boundaries             |
| [Content direction](docs/content-direction.md)     | French-first voice, natural English, subtitles, artwork descriptions and factual boundaries |
| [Design system](docs/design-system.md)             | Current palette, typography, visual hierarchy and stylesheet ownership                      |
| [UX principles](docs/ux-principles.md)             | Navigation, responsive composition, artwork viewing, contact and CV journeys                |
| [Accessibility maintenance](docs/accessibility.md) | Source findings, focus and overlay behavior, motion and manual audit coverage               |
| [SEO maintenance](docs/SEO.md)                     | Metadata ownership, origins, indexing, image discovery and release checks                   |

## Skills

| Skill                                                  | Use for                                                                          |
| ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| [gallery-page](skills/gallery-page/SKILL.md)           | Create, extend or review a gallery with its translations, artwork and navigation |
| [i18n](skills/i18n/SKILL.md)                           | FR/EN message parity, artwork keys, reactive copy and localized routes           |
| [nuxt-vue-patterns](skills/nuxt-vue-patterns/SKILL.md) | Nuxt/Vue structure, TypeScript, SSR, lifecycle and component behavior            |
| [artwork-assets](skills/artwork-assets/SKILL.md)       | Exact asset paths, native images, optimized variants and IPX prerendering        |
| [accessibility](skills/accessibility/SKILL.md)         | Scoped accessibility audits and implementation                                   |
| [seo](skills/seo/SKILL.md)                             | Reactive page metadata, canonical/alternate URLs and social artwork              |

Use the [artwork naming map](skills/i18n/references/artwork-naming.md) when a gallery crosses route names, message namespaces and public directories.
The canonical skills live here; existing Claude command shortcuts read the same files.

## Scoped instructions

| Instruction                                                            | Applies to                                                                                        |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Nuxt and Vue](../.github/instructions/vue-nuxt.instructions.md)       | Vue files, application TypeScript and Nuxt configuration                                          |
| [Styling](../.github/instructions/styles.instructions.md)              | Vue presentation, shared SCSS and style configuration                                             |
| [Internationalization](../.github/instructions/i18n.instructions.md)   | French and English locale JSON                                                                    |
| [Accessibility](../.github/instructions/accessibility.instructions.md) | Vue, client integrations, responsive state and shared style changes involving accessible behavior |
| [Gallery pages](../.github/instructions/gallery-page.instructions.md)  | Painting and ceramic page files                                                                   |

All coding agents should select scoped instructions through the applicability table in [AGENTS.md](../AGENTS.md#tool-integration-and-scoped-instructions).
Automatic attachment of `applyTo` rules depends on the tool; it is not a substitute for selecting the relevant guidance in other agents.

## Maintenance

Keep examples and paths grounded in Atelier's two locales, gallery components and native/IPX image delivery.
Update catalogs when adding or removing guides, skills or instruction files.
Use focused tables, one sentence per source line in prose, UTF-8 and LF line endings.
Check local links, anchors, frontmatter, formatting and source accuracy after documentation changes.
Use the relevant implementation and browser checks when application behavior changes, and report unavailable coverage explicitly.
