# atelier-libr-emotions

[![Build][build-badge]][build-link]
[![Release][release-badge]][release-link]

A French-first portfolio presenting Véronique Berthier's paintings, ceramics and artistic practice.

Visit [atelierlibremotions][release-link].

The site uses Nuxt 4, Vue 3, TypeScript, SCSS, French/English routes and Vercel hosting.

## Explore The Site

| Area              | Example French route             | Purpose                                      |
| ----------------- | -------------------------------- | -------------------------------------------- |
| Home              | `/fr`                            | Introduce painting, ceramics and the artist  |
| Painting          | `/fr/painting/acrylic/abstracts` | Explore a technique/category collection      |
| Ceramics          | `/fr/ceramic/porcelain/nature`   | Explore ceramic work and grouped collections |
| Artistic approach | `/fr/about`                      | Read the artist's account of her practice    |
| Development       | `/fr/about/development`          | Follow the supplied artistic journey         |
| CV                | `/fr/about/cv`                   | View previews or download the existing PDF   |
| Contact           | `/fr/contact`                    | Find contact and social destinations         |

Replace `/fr` with `/en` for the corresponding English route.
The root `/` uses configured language detection; verify the generated/deployed redirect behavior when changing it.
The menu groups collections by domain, technique and category, with planned categories remaining disabled.
The home gallery action opens acrylic abstracts rather than a separate gallery-overview page.

## Develop Locally

Use Node.js 24 and Corepack with the Yarn version pinned in [package.json](package.json).
The project uses Yarn's `node-modules` linker.
Enable the launcher when setting up Node.js, then install locked dependencies:

```sh
corepack enable
yarn install --immutable
```

Use `corepack yarn <command>` if the Yarn launcher is unavailable.
On PowerShell hosts that block `yarn.ps1`, use `yarn.cmd <command>`.

Start the development server, normally on <http://localhost:3000>:

```bash
yarn dev -o
```

### Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

| Command            | Purpose                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `yarn dev`         | Start the development server, normally at `http://localhost:3000` |
| `yarn lint`        | Run ESLint with the repository's Prettier integration             |
| `yarn lint:fix`    | Apply lint fixes; review affected files                           |
| `yarn build`       | Build production Nuxt output                                      |
| `yarn generate`    | Generate static pages and prerendered image routes                |
| `yarn preview`     | Preview the corresponding build output                            |
| `yarn postinstall` | Prepare Nuxt generated types; also runs after installation        |
| `yarn profile`     | Profile a production build                                        |

There are no `test`, `typecheck` or `format:check` scripts in the current package file.
CI installs locked dependencies and runs lint; it does not run the production build or generation.
For documentation, check changed files with the installed Prettier using `--check --prose-wrap preserve --end-of-line lf`.
Use [AGENTS.md verification](AGENTS.md#verification) for implementation checks.

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
| `@nuxt/eslint`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier` | Linting and formatting configuration/tooling                                                  |
| `typescript`, `@types/node`                                                              | TypeScript and Node type support                                                              |
| `sass`                                                                                   | SCSS compilation                                                                              |

## Project Map

| Location                                                                                                                           | Responsibility                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [app/pages](app/pages/)                                                                                                            | Localized home, artwork, artist, CV, contact and placeholder pages |
| [app/components/common](app/components/common/)                                                                                    | Gallery, viewer, image wrapper, headings and page navigation       |
| [app/components/layout](app/components/layout/), [default layout](app/layouts/default.vue)                                         | Header, menu, footer and shared main landmark                      |
| [app/composables](app/composables/), [app/types](app/types/)                                                                       | Responsive state and shared TypeScript contracts                   |
| [app/styles](app/styles/)                                                                                                          | Tokens, existing base rules and shared keyframes                   |
| [smooth-scroll.client.ts](app/plugins/smooth-scroll.client.ts)                                                                     | Lenis integration                                                  |
| [generateImageRoutes.ts](app/utils/generateImageRoutes.ts)                                                                         | Explicit IPX transform routes used by prerendering                 |
| [i18n/locales](i18n/locales/)                                                                                                      | French and English content                                         |
| [public](public/)                                                                                                                  | Original artwork, icons, CV and other published assets             |
| [nuxt.config.ts](nuxt.config.ts), [app.vue](app/app.vue)                                                                           | Modules, routes, origins, root metadata and application setup      |
| [package.json](package.json), [.yarnrc.yml](.yarnrc.yml)                                                                           | Commands, direct dependencies and package manager                  |
| [tsconfig.json](tsconfig.json), [eslint.config.mjs](eslint.config.mjs), [.prettierrc](.prettierrc), [.editorconfig](.editorconfig) | Type, lint, formatting and file conventions                        |
| [CI workflow](.github/workflows/ci.yml)                                                                                            | Immutable dependency install and lint                              |

The default layout owns the main landmark, header and footer.
Most collections use `PageTitle`, `ImageGrid` and `PageNavigation`; the standalone oil artwork page has a different presentation.
Use the shared skills before adding or restructuring a collection.

## Artwork And Icons

| Consumer                       | Delivery                                                    | What to check                                                            |
| ------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| Gallery tiles and image viewer | Native `img` loading original public files                  | Exact paths, aspect ratios, translated descriptions and complete artwork |
| Standalone `Image` component   | NuxtImg with sizes, densities and a placeholder             | Original plus emitted IPX `srcset` and placeholder coverage              |
| Social previews                | Public artwork referenced by page metadata                  | Absolute URL, actual MIME type and measured raster dimensions            |
| Custom icons                   | SVG build inputs under `app/assets/svg/`, using `ale-icon:` | Existing viewBox, meaningful control names and decorative icon semantics |

Preserve supplied filenames, casing and artwork order.
Gallery layout heights do not define IPX image widths.
Use [artwork-assets](.agents/skills/artwork-assets/SKILL.md) and the [naming map](.agents/skills/i18n/references/artwork-naming.md) for grouped collections and delivery details.
Physical painting measurements are authored content, separate from raster pixel dimensions.

## Production And Verification

`nuxt.config.ts` enables server rendering, a prerender link crawl and explicit IPX routes.
Use `yarn build` to check production Nuxt output and `yarn generate` to verify static delivery.
The production origin in the repository is `https://atelierlibremotions.vercel.app`.

Page metadata currently resolves development, production and preview origins separately from fixed Site Config/identity values.
A local production-mode build without appropriate deployment variables can produce invalid page URLs.
Read [SEO maintenance](.agents/docs/SEO.md#origins-and-indexing) when configuring a local production check or changing deployment behavior.
Hosting settings are external to this repository; verify the actual Vercel build/output configuration before changing it.

For route or image-delivery changes, inspect generated pages and actual original/transformed image requests.
For UI changes, exercise both locales, mobile and desktop layouts, keyboard focus, menus, the viewer and reduced motion.
Accessibility is maintained against a WCAG 2.2 AA review target; source findings and outstanding manual coverage are recorded in its guide.

## Project Guidance

| Markdown resource                                          | Purpose                                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                     | Shared project rules, architecture, commands                           |
| [.agents/README.md](.agents/README.md)                     | Index of guides, skills, scoped instructions and evidence levels       |
| [copilot-instructions.md](.github/copilot-instructions.md) | Copilot entry point and relevant Markdown catalogs                     |
| [CLAUDE.md](CLAUDE.md)                                     | Claude entry point, shared catalogs, command adapters and review agent |
| [Brand context](.agents/docs/brand-context.md)             | Confirmed artist identity and presentation boundaries                  |
| [Content direction](.agents/docs/content-direction.md)     | Editorial voice, subtitles and artwork descriptions                    |
| [Design system](.agents/docs/design-system.md)             | Actual tokens, typography and stylesheet ownership                     |
| [UX principles](.agents/docs/ux-principles.md)             | Responsive journeys and mobile acceptance                              |
| [Accessibility maintenance](.agents/docs/accessibility.md) | Observed source limitations and manual audit coverage                  |
| [SEO maintenance](.agents/docs/SEO.md)                     | Metadata, origins, indexing and image discovery                        |
| [STYLE_LAYOUT_REVIEW.md](STYLE_LAYOUT_REVIEW.md)           | Dated layout and CSS proposals                                         |

Use the [skill catalog](AGENTS.md#available-skills) for workflows and the [scoped instruction map](AGENTS.md#tool-integration-and-scoped-instructions) for affected files.
Read only the context needed for the task and distinguish intended behavior from verified implementation.

[build-badge]: https://github.com/PABERTHIER/atelier-libr-emotions/actions/workflows/ci.yml/badge.svg
[build-link]: https://github.com/PABERTHIER/atelier-libr-emotions/actions/workflows/ci.yml

[release-badge]: https://deploy-badge.vercel.app/?url=https://atelierlibremotions.vercel.app/&name=website
[release-link]: https://atelierlibremotions.vercel.app
