# GitHub Copilot Entry Point

[AGENTS.md](../AGENTS.md) is the shared source for project constraints, architecture, commands and verification.
Its Git policy prohibits every Git command unless the user explicitly lifts the restriction for the task.
Use [.agents/README.md](../.agents/README.md) for guidance ownership and evidence levels.

## Copilot Conventions

- Treat [mobile acceptance](../AGENTS.md#mobile-experience-acceptance-criteria) as part of UI completion.
  Verify affected FR/EN journeys, including keyboard, touch, short viewports and longer translated text.
- Follow the nearest working component and the Nuxt/Vue skill.
  The default layout owns the main landmark; page and component rules use scoped SCSS while global styles keep their documented owner.
- Keep translated script-side data and metadata reactive.
  Use locale-aware internal destinations and verified artwork paths; native gallery images and the optimized `Image` wrapper have different delivery requirements.
- Read applicable scoped instructions and load only the guides and skills relevant to the task.
  Automatic attachment depends on the client; shared requirements also apply when files are read manually.

## Reference Documentation

| Guide                     | File                                                         | Read for                                                    |
| ------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| Brand context             | [brand-context.md](../.agents/docs/brand-context.md)         | Artist identity, presentation and factual positioning       |
| Content direction         | [content-direction.md](../.agents/docs/content-direction.md) | French-first voice, English adaptation and artwork copy     |
| Design system             | [design-system.md](../.agents/docs/design-system.md)         | Palette, typography, image framing and stylesheet ownership |
| UX principles             | [ux-principles.md](../.agents/docs/ux-principles.md)         | Responsive composition, navigation, viewer and CV journeys  |
| Accessibility maintenance | [accessibility.md](../.agents/docs/accessibility.md)         | Source findings, focus, motion and manual audit coverage    |
| SEO maintenance           | [SEO.md](../.agents/docs/SEO.md)                             | Metadata ownership, origins, indexing and discovery         |

## Shared Skills

| Skill                | File                                                              | Use for                                                   |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| Gallery pages        | [gallery-page](../.agents/skills/gallery-page/SKILL.md)           | Create, extend or review collections and their navigation |
| Internationalization | [i18n](../.agents/skills/i18n/SKILL.md)                           | FR/EN keys, reactive copy and localized destinations      |
| Nuxt and Vue         | [nuxt-vue-patterns](../.agents/skills/nuxt-vue-patterns/SKILL.md) | Components, TypeScript, SSR and client lifecycle          |
| Artwork assets       | [artwork-assets](../.agents/skills/artwork-assets/SKILL.md)       | Exact paths, original images and IPX prerendering         |
| Accessibility        | [accessibility](../.agents/skills/accessibility/SKILL.md)         | Scoped audits, semantics, controls, focus and motion      |
| SEO                  | [seo](../.agents/skills/seo/SKILL.md)                             | Reactive page metadata, alternates and social artwork     |

Keep canonical skill content in `.agents/skills/`.
The tables are discovery aids, not a request to preload every skill body.

## Scoped Instructions

| Instruction                                                            | File patterns                                                                            | Use for                                                 |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Nuxt and Vue](../.github/instructions/vue-nuxt.instructions.md)       | `app/**/*.vue`, `app/**/*.ts`, `nuxt.config.ts`                                          | Components, SSR, application helpers and configuration  |
| [Styling](../.github/instructions/styles.instructions.md)              | `app/**/*.vue`, `app/styles/**/*.scss`, `nuxt.config.ts`                                 | Appearance, responsive layout and style loading         |
| [Internationalization](../.github/instructions/i18n.instructions.md)   | `i18n/locales/*.json`                                                                    | French and English messages, keys and interpolation     |
| [Accessibility](../.github/instructions/accessibility.instructions.md) | `app/**/*.vue`, `app/plugins/**/*.ts`, `app/composables/**/*.ts`, `app/styles/**/*.scss` | Semantics, focus, overlays, readability and motion      |
| [Gallery pages](../.github/instructions/gallery-page.instructions.md)  | `app/pages/painting/**/*.vue`, `app/pages/ceramic/**/*.vue`                              | Collections, groups, menu slots and adjacent-page links |

Each scoped file declares `description` and `applyTo` metadata.
Use the [shared applicability rules](../AGENTS.md#tool-integration-and-scoped-instructions) when matching several scopes or working in a client that does not attach them automatically.

## Reusable Prompts

| Prompt              | File                                                             | Scope                                          |
| ------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| `/new-gallery-page` | [new-gallery-page.prompt.md](prompts/new-gallery-page.prompt.md) | Full gallery workflow through the shared skill |
| `/add-translations` | [add-translations.prompt.md](prompts/add-translations.prompt.md) | Locale messages without creating a page        |

Keep tool-specific entry points focused on routing rather than maintaining separate workflows.
Use [AGENTS.md verification](../AGENTS.md#verification) and report checks actually performed.
