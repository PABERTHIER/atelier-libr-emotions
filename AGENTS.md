# Atelier Libr'Émotions Website Guidance

Atelier Libr'Émotions is Véronique Berthier's painting and ceramics portfolio at `https://atelierlibremotions.vercel.app`.
It uses Nuxt 4, Vue 3, TypeScript, Yarn, scoped SCSS and French/English routes.
This is the shared project entry point for Codex, GitHub Copilot and Claude Code.
Use [.agents/README.md](.agents/README.md) to select focused context and verify implementation details against the current source.

## Shared Constraints

- Preserve unrelated user changes and keep work within the requested scope.
  Use filesystem inspection and direct comparisons under the Git policy below.
- Preserve supplied artwork, filenames, casing and curated order.
  Confirm artist facts, work titles and physical dimensions rather than inventing missing information.
- French is the source language.
  Add, rename and remove message identities in both locales together, preserving interpolation names and natural English.
- Mobile usability and accessible interaction are part of UI completion.
  Preserve essential actions, full artwork, visible focus, readable text and reduced-motion behavior for affected journeys.
- Reuse current component contracts and styling owners.
  Keep browser-only work out of server setup and clean up added listeners, timers and observers.
- Use the pinned package manager and task-relevant checks.
  Leave generated `.nuxt/`, `.output/` and dependency files to their tools.

## Git Policy

Do not run **any Git command** unless the user explicitly lifts this restriction for the task.
This includes read-only commands such as `git status`, `git diff`, `git log` and `git show`, and commands that change files, the index, history or remotes.
Use filesystem inspection and direct file comparisons instead, preserving unrelated user changes.

If the user later requests a commit or push, show exactly what is proposed and ask for confirmation before running that command.
Do not treat that request as permission for unrelated Git operations or commit speculatively at the end of a task.

## Build and Dev Commands

Use Node.js 24 as in CI and the Yarn version pinned by `packageManager` in [package.json](package.json).
The [Yarn configuration](.yarnrc.yml) uses the `node-modules` linker.
Enable Corepack when setting up the launcher; use `corepack yarn` if needed, or `yarn.cmd` when PowerShell blocks `yarn.ps1`.
Keep dependency changes within scope and let Yarn maintain `yarn.lock`.

| Task                        | Command                    | Notes                                                    |
| --------------------------- | -------------------------- | -------------------------------------------------------- |
| Install locked dependencies | `yarn install --immutable` | Reproduce the current lockfile                           |
| Start development           | `yarn dev`                 | Normally `http://localhost:3000`                         |
| Check formatting            | `yarn format:check`        | Checks application Vue, TypeScript, SCSS and locale JSON |
| Format application files    | `yarn format`              | Broad write operation; prefer changed-file scope         |
| Check types                 | `yarn typecheck`           | Nuxt and Vue TypeScript checks                           |
| Lint                        | `yarn lint`                | ESLint and its Prettier integration                      |
| Fix lint findings           | `yarn lint:fix`            | Review fixes and keep them within scope                  |
| Build production output     | `yarn build`               | Check SSR and Nuxt configuration                         |
| Generate static output      | `yarn generate`            | Check prerendered routes and image delivery              |
| Preview built output        | `yarn preview`             | Run after the corresponding build or generation          |
| Prepare Nuxt types          | `yarn postinstall`         | Runs automatically after installation                    |
| Profile a build             | `yarn profile`             | Available when profiling is part of the task             |

There is no `test` script in the current package file.
`format` and `format:check` exclude Markdown and root configuration files.
Check changed Markdown explicitly with the installed Prettier using `--prose-wrap preserve --end-of-line lf`.
See [README.md](README.md) for the human-facing setup and dependency map.

## Direct Dependencies

Consult `package.json` for versions; this table groups its current direct entries.

| Dependencies                                                                             | Purpose or current status                                                                     |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `nuxt`                                                                                   | Routing, Vue application build, SSR and prerendering                                          |
| `@nuxtjs/i18n`                                                                           | French/English messages and prefixed routes                                                   |
| `@nuxtjs/seo`                                                                            | Site metadata, sitemap and structured-data modules                                            |
| `@nuxt/image`                                                                            | NuxtImg and IPX transforms for optimized-image consumers                                      |
| `@nuxt/ui`, `@iconify-json/heroicons`, `@iconify-json/lucide`                            | UI/icon integration and installed icon sets                                                   |
| `@nuxt/fonts`                                                                            | Font integration; inspect source and browser output for actual requests and resolved families |
| `lenis`                                                                                  | Client smooth-scroll integration                                                              |
| `@vueuse/core`                                                                           | Responsive breakpoint utilities used by `useScreenSize()`                                     |
| `rolldown`                                                                               | Build tooling satisfying Nuxt's Rolldown peer dependency                                      |
| `@nuxt/eslint`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier` | Linting and formatting configuration/tooling                                                  |
| `typescript`, `vue-tsc`, `@types/node`                                                   | Nuxt, Vue and Node type checking                                                              |
| `sass`                                                                                   | SCSS compilation                                                                              |

## Architecture

```text
atelier-libr-emotions/
├── app/
│   ├── pages/                    # Nuxt file-based routing
│   │   ├── painting/             # Painting gallery pages
│   │   │   ├── acrylic/abstracts/index.vue
│   │   │   ├── oil/abstracts/index.vue
│   │   │   └── inks/nature/index.vue
│   │   ├── ceramic/              # Ceramic gallery pages
│   │   │   ├── electric-kiln/nature/index.vue
│   │   │   ├── porcelain/nature/index.vue
│   │   │   └── raku-smouldering/nature/index.vue
│   │   ├── about/                # Artist pages (approach, career, CV)
│   │   ├── contact/              # Contact page
│   │   └── wip/                  # Work-in-progress placeholder
│   ├── components/
│   │   ├── layout/               # Header, Menu, Footer
│   │   └── common/              # Shared gallery and page components
│   │       ├── ImageGrid.vue     # Responsive justified gallery rows
│   │       ├── Image.vue         # NuxtImg wrapper
│   │       ├── PageTitle.vue     # Page heading
│   │       ├── PageHeaderOrnament.vue
│   │       └── PageNavigation.vue # Previous/Next navigation
│   ├── composables/              # screen-size, shared logic
│   ├── data/                     # Site identity, page SEO registry and image dimensions
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

| Concern                          | Owner                                                                                                                                                         | Contract                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Routes and authored page content | [app/pages](app/pages/)                                                                                                                                       | Home at `index.vue`; named routes in directories with `index.vue`        |
| Shared page shell                | [default.vue](app/layouts/default.vue)                                                                                                                        | Welcome, header, main landmark and footer                                |
| Gallery and page components      | [common components](app/components/common/)                                                                                                                   | PageTitle, ImageGrid, ImagePreviewModal, PageNavigation and Image        |
| Navigation                       | [Menu.vue](app/components/layout/Menu.vue), [LangSwitcher.vue](app/components/common/LangSwitcher.vue)                                                        | Category destinations, mobile state and corresponding locale routes      |
| Shared types                     | [image.ts](app/types/image.ts), [page.ts](app/types/page.ts)                                                                                                  | ImageSource, Heights and PageNavigation                                  |
| Responsive state                 | [screen-size.ts](app/composables/screen-size.ts)                                                                                                              | Breakpoint refs with a stable SSR fallback                               |
| Browser integration              | [smooth-scroll.client.ts](app/plugins/smooth-scroll.client.ts)                                                                                                | Existing Lenis instance                                                  |
| Visual rules                     | [variables.scss](app/styles/variables.scss), [default.scss](app/styles/default.scss), [keyframes.scss](app/styles/keyframes.scss) and scoped component styles | Current tokens, base rules, shared motion and local appearance           |
| Metadata and module setup        | [usePageSeo.ts](app/composables/usePageSeo.ts), [seo.ts](app/data/seo.ts), [app.vue](app/app.vue) and [nuxt.config.ts](nuxt.config.ts)                        | Registry/composable page metadata, root I18n links, origins and indexing |
| Messages                         | [fr-FR.json](i18n/locales/fr-FR.json), [en-US.json](i18n/locales/en-US.json)                                                                                  | Matching message identities and interpolation                            |
| Published assets                 | [public](public/)                                                                                                                                             | Original painting, ceramic, CV and other public files                    |
| Explicit IPX coverage            | [generateImageRoutes.ts](app/utils/generateImageRoutes.ts)                                                                                                    | Transformed routes consumed by Nitro prerendering                        |
| Tooling and CI                   | [package.json](package.json), [CI workflow](.github/workflows/ci.yml), [eslint.config.mjs](eslint.config.mjs)                                                 | Available scripts, immutable install and lint                            |

The layout already supplies `<main id="page-container">`; do not add a nested main in a page.
`PageTitle` supplies its H1, while the home and standalone artwork pages have their own structure.
Component registration uses `pathPrefix: false`, so check for colliding component basenames.
Shared SEO contracts live in [types/seo.ts](app/types/seo.ts); use route-qualified page names in the explicitly typed registry and matching `seo.*` messages.
Every rendered image requires nonempty localized alt text.

Use `<template>`, `<script setup lang="ts">`, then scoped SCSS for page and component SFCs.
Prefer registered Nuxt auto-imports and explicit imports for shared types, data, utilities and library APIs.
Keep intentional layout/global styles with their documented owner and use injected Sass tokens without repeating imports.
Follow the actual [TypeScript configuration](tsconfig.json), [.editorconfig](.editorconfig) and [.prettierrc](.prettierrc).

Preserve UTF-8 and existing accented text when editing files.
On Windows, prefer Unicode-safe patch/file APIs; set PowerShell's `$OutputEncoding` to UTF-8 explicitly before piping authored non-ASCII text to another process.
Verify the written text rather than assuming the console's display encoding also controls pipeline input.

## Routes And Page Workflow

I18n uses `prefix`, so French routes also start with `/fr`; equivalent English routes start with `/en`.
The root `/` is configured for language detection and is not explicitly prerendered during the server build.
Verify actual generated/deployed redirect behavior rather than assuming a runtime-only redirect.

| Area              | Example route without locale  | Content owner                                                                    |
| ----------------- | ----------------------------- | -------------------------------------------------------------------------------- |
| Home              | `/`                           | [home page](app/pages/index.vue), `pages.main.*`                                 |
| Painting gallery  | `/painting/acrylic/abstracts` | [painting pages](app/pages/painting/), `pages.painting.*`                        |
| Ceramic gallery   | `/ceramic/porcelain/nature`   | [ceramic pages](app/pages/ceramic/), `pages.ceramic.*`                           |
| Artistic approach | `/about`                      | [about page](app/pages/about/index.vue), `pages.about.*`                         |
| Development       | `/about/development`          | [development page](app/pages/about/development/index.vue), `pages.development.*` |
| CV                | `/about/cv`                   | [CV page](app/pages/about/cv/index.vue), `pages.cv.*`                            |
| Contact           | `/contact`                    | [contact page](app/pages/contact/index.vue), `pages.contact.*`                   |
| Work in progress  | `/wip`                        | [placeholder page](app/pages/wip/index.vue), `wip.*`                             |

The home gallery action leads to acrylic abstracts; there is no general gallery overview route.
Some menu categories are planned and remain disabled through their `/wip` value.
Keep intentional differences in the standalone oil artwork page.

For a new or substantially changed gallery:

1. Read the nearest page, requested artwork and the [naming map](.agents/skills/i18n/references/artwork-naming.md).
   Resolve route, message namespace, public directory, groups and curated ordering independently.
2. Add affected page, picture and shared-label messages in both locale files.
   Preserve the supplied French subtitle and use confirmed optional painting dimensions.
3. Reuse the gallery shell and components using [gallery-page](.agents/skills/gallery-page/SKILL.md).
   Keep translated images, navigation and metadata reactive rather than taking setup-time snapshots.
4. Implement localized metadata using [seo](.agents/skills/seo/SKILL.md).
   Register the page, verified social image/dimensions and sitemap artwork; add bilingual `seo.*` messages and call `useHead(usePageSeo('pageName'))`.
   Root I18n head data owns canonical/alternate links and OG locales; app icons remain shared.
5. Update the matching menu slot and only neighboring links representing the same sequence.
   Pass unprefixed paths to `PageNavigation`, which localizes them internally.
6. Check the actual image consumer using [artwork-assets](.agents/skills/artwork-assets/SKILL.md), then complete relevant verification.

## Localization And Artwork

| Context                  | Painting                     | Ceramic                    |
| ------------------------ | ---------------------------- | -------------------------- |
| Route and page namespace | `painting`, `pages.painting` | `ceramic`, `pages.ceramic` |
| Picture namespace        | `pictures.paintings`         | `pictures.ceramics`        |
| Public directory         | `public/paintings`           | `public/ceramics`          |

Use the [naming map](.agents/skills/i18n/references/artwork-naming.md) for technique exceptions, picture keys and group subdirectories.
Keep authored copy, image alternatives and control names in the locale files.
Use `localePath()` for internal pages, preserving raw public-asset and external URLs.
Use natural English and preserve official names, artist-authored titles and supplied identifiers.
Inspect message syntax for `|` and `@` rather than treating them as ordinary punctuation in Vue I18n.

New gallery artwork uses supplied WebP files with exact filename casing.
Keep existing JPEG, GIF, SVG and document consumers intact when still used.
Gallery tiles and the viewer use native images, while the standalone `Image` component uses `NuxtImg` with sizes, densities and a placeholder.
Gallery row heights are layout inputs, not a list of IPX widths.
Add explicit transformed routes when the consumer requires them; original-file availability does not prove static variant coverage.

## Mobile Experience Acceptance Criteria

Mobile usability is part of completion for UI changes.
Preserve complete artwork, essential actions, keyboard operation and readable FR/EN text across viewports.
Check focus, touch controls, short-screen menus/dialogs, text enlargement, safe areas and reduced motion for affected journeys.
Use the [UX acceptance matrix](.agents/docs/ux-principles.md#mobile-acceptance) and [accessibility audit coverage](.agents/docs/accessibility.md#manual-release-audit).
Their criteria describe the target behavior, not completed conformance.

## Reference Documentation

Read the relevant guide on demand and keep maintenance context in its owner.
The [.agents index](.agents/README.md) explains evidence levels and maps shared resources.

| Guide                     | File                                                      | Read for                                                    |
| ------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| Brand context             | [brand-context.md](.agents/docs/brand-context.md)         | Artist identity, presentation and factual positioning       |
| Content direction         | [content-direction.md](.agents/docs/content-direction.md) | French-first voice, English adaptation and artwork copy     |
| Design system             | [design-system.md](.agents/docs/design-system.md)         | Palette, typography, image framing and stylesheet ownership |
| UX principles             | [ux-principles.md](.agents/docs/ux-principles.md)         | Responsive composition, navigation, viewer and CV journeys  |
| Accessibility maintenance | [accessibility.md](.agents/docs/accessibility.md)         | Source findings, focus, motion and manual audit coverage    |
| SEO maintenance           | [SEO.md](.agents/docs/SEO.md)                             | Metadata ownership, origins, indexing and discovery         |

The [style and layout review](STYLE_LAYOUT_REVIEW.md) remains a dated proposal.
Distinguish source observations, intended behavior and actual verification when changing or reporting the implementation.

## Available Skills

Canonical skills live in `.agents/skills/<name>/SKILL.md`.
Use the skill relevant to the task and read linked references only when needed.

| Skill                | File                                                           | Use for                                                   |
| -------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| Gallery pages        | [gallery-page](.agents/skills/gallery-page/SKILL.md)           | Create, extend or review collections and their navigation |
| Internationalization | [i18n](.agents/skills/i18n/SKILL.md)                           | FR/EN keys, reactive copy and localized destinations      |
| Nuxt and Vue         | [nuxt-vue-patterns](.agents/skills/nuxt-vue-patterns/SKILL.md) | Components, TypeScript, SSR and client lifecycle          |
| Artwork assets       | [artwork-assets](.agents/skills/artwork-assets/SKILL.md)       | Exact paths, original images and IPX prerendering         |
| Accessibility        | [accessibility](.agents/skills/accessibility/SKILL.md)         | Scoped audits, semantics, controls, focus and motion      |
| SEO                  | [seo](.agents/skills/seo/SKILL.md)                             | Reactive page metadata, alternates and social artwork     |

## Task Entry Points

| Task                            | Copilot prompt                                                           | Claude command                                                      | Shared owner            |
| ------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- | ----------------------- |
| New or extended gallery         | [new-gallery-page.prompt.md](.github/prompts/new-gallery-page.prompt.md) | [new-gallery-page.md](.claude/commands/new-gallery-page.md)         | Gallery-page skill      |
| Locale messages only            | [add-translations.prompt.md](.github/prompts/add-translations.prompt.md) | [add-translations.md](.claude/commands/add-translations.md)         | I18n skill              |
| Read-only gallery source review | Request the gallery skill's review mode                                  | [gallery-page-reviewer.md](.claude/agents/gallery-page-reviewer.md) | Gallery review criteria |

The [Claude entry point](CLAUDE.md#command-adapters) lists every existing command adapter.
Prompt and command files route to shared workflows rather than maintaining separate implementations.
Availability of the review agent does not require delegation or establish runtime coverage.

## Tool Integration And Scoped Instructions

| Agent          | Project entry point                                                                    | Shared skill access                              | Scoped instructions                                                                 |
| -------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Codex          | This `AGENTS.md` and applicable ancestor/current-directory instruction files           | Native repository discovery in `.agents/skills/` | Select and read files from the applicability table below                            |
| GitHub Copilot | [copilot-instructions.md](.github/copilot-instructions.md) and shared project guidance | Shared skill catalog                             | `description` and `applyTo` attachment where supported; read explicitly when needed |
| Claude Code    | [CLAUDE.md](CLAUDE.md), importing this file                                            | Existing command adapters read shared skills     | Read applicable scoped files manually                                               |

For Codex, keep durable project rules here and reusable workflows in the shared skill directory.
Codex's instruction discovery follows its applicable `AGENTS.md`/`AGENTS.override.md` chain; it does not make Copilot's `applyTo` metadata a repository-wide automatic rule.
Before editing application files, **all coding agents, including Codex, must read the applicable scoped files below**.
Use file patterns and task concerns to select them, including overlapping scopes.
Keep project rules here, focused standards in scoped files, workflows in skills and maintenance context in guides.

| Instruction                                                         | File patterns                                                                            | Use for                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Nuxt and Vue](.github/instructions/vue-nuxt.instructions.md)       | `app/**/*.vue`, `app/**/*.ts`, `nuxt.config.ts`                                          | Components, SSR, application helpers and configuration  |
| [Styling](.github/instructions/styles.instructions.md)              | `app/**/*.vue`, `app/styles/**/*.scss`, `nuxt.config.ts`                                 | Appearance, responsive layout and style loading         |
| [Internationalization](.github/instructions/i18n.instructions.md)   | `i18n/locales/*.json`                                                                    | French and English messages, keys and interpolation     |
| [Accessibility](.github/instructions/accessibility.instructions.md) | `app/**/*.vue`, `app/plugins/**/*.ts`, `app/composables/**/*.ts`, `app/styles/**/*.scss` | Semantics, focus, overlays, readability and motion      |
| [Gallery pages](.github/instructions/gallery-page.instructions.md)  | `app/pages/painting/**/*.vue`, `app/pages/ceramic/**/*.vue`                              | Collections, groups, menu slots and adjacent-page links |

See [official Codex instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md) and [repository skill discovery](https://learn.chatgpt.com/docs/build-skills) for client behavior.
The [.agents index](.agents/README.md) is navigational, not a separate automatically loaded instruction file.

## Verification

| Change                                     | Relevant checks                                                                                                  |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Documentation only                         | Changed-file Prettier with preserved prose wrapping and LF, frontmatter, local links/anchors and source accuracy |
| Application implementation                 | `yarn format:check`, `yarn typecheck`, `yarn lint` and affected FR/EN behavior                                   |
| Shared behavior, SSR or Nuxt configuration | Relevant `yarn build` plus browser checks for affected consumers                                                 |
| Routes, prerendering or image delivery     | `yarn generate`, affected generated pages and actual image requests                                              |
| UI, styles or interaction                  | Mobile acceptance, keyboard/touch journeys, overlays, enlarged text and reduced motion                           |

CI installs dependencies immutably and runs lint; its build-named job does not run the production build or static generation.
Check the installed Yarn version if reproducing CI: the workflow has an explicit Corepack preparation version separate from `packageManager`.
Production-mode validation uses the configured production-origin fallback locally; development and Vercel previews disable indexing.
Keep `NUXT_SITE_URL` overrides scoped to production and read [SEO maintenance](.agents/docs/SEO.md#origins-and-indexing) before interpreting generated URLs.
For shared UI changes, cover the different pages and states consuming the component.
Use viewport and device coverage from the UX/accessibility guides and report what was actually checked.
Do not claim unavailable browser, assistive-technology, deployment or crawler validation.
