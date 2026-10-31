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

The shared shell includes a skip link and a focusable main landmark.
Desktop navigation uses click/keyboard disclosures; mobile navigation keeps grouped accordions in a native modal dialog with focus containment and Escape dismissal.
Short landscape screens use the same dialog to keep controls reachable.
The header keeps its top gutter; the footer distributes desktop controls and retains centered compact wrapping.
The introduction dismisses on interaction; typing and menu transitions honor reduced motion.
Header/menu gutters include safe-area insets, and the compact footer centers its contents above the home indicator.
Mobile menu links navigate immediately, with the menu closing over the destination; focus and scrolling are coordinated after the overlay releases.
Welcome's one-row introduction hides scrollbar presentation without locking scrolling, and resting pages reserve no empty scrollbar gutter.
Welcome is visible in the first server-rendered frame, with typing starting after mount and a scripting-disabled CSS fallback.
CSS and route scrolling respect reduced motion.
These are implementation features, not a full WCAG 2.2 AA conformance claim; see the [accessibility maintenance guide](.agents/docs/accessibility.md) for coverage and remaining page-level work.

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

| Command             | Purpose                                                            |
| ------------------- | ------------------------------------------------------------------ |
| `yarn dev`          | Start the development server, normally at `http://localhost:3000`  |
| `yarn format:check` | Check application Vue, TypeScript, SCSS and locale JSON formatting |
| `yarn format`       | Format those files; prefer targeting changed files for small edits |
| `yarn typecheck`    | Check Nuxt and Vue types                                           |
| `yarn lint`         | Run ESLint with the repository's Prettier integration              |
| `yarn lint:fix`     | Apply lint fixes; review affected files                            |
| `yarn build`        | Build production Nuxt output                                       |
| `yarn generate`     | Generate static pages and prerendered image routes                 |
| `yarn preview`      | Preview the corresponding build output                             |
| `yarn postinstall`  | Prepare Nuxt generated types; also runs after installation         |
| `yarn profile`      | Profile a production build                                         |

There is no `test` script in the current package file.
`format` and `format:check` exclude Markdown and root configuration files.
CI installs locked dependencies and runs lint; it does not run the production build or generation.
Run formatting, type checking and lint locally for application changes, with build or generation checks as required by the affected behavior.
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
| `@vueuse/core`                                                                           | Responsive breakpoint utilities used by `useScreenSize()`                                     |
| `rolldown`                                                                               | Build tooling satisfying Nuxt's Rolldown peer dependency                                      |
| `@nuxt/eslint`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier` | Linting and formatting configuration/tooling                                                  |
| `typescript`, `vue-tsc`, `@types/node`                                                   | Nuxt, Vue and Node type checking                                                              |
| `sass`                                                                                   | SCSS compilation                                                                              |

## Project Map

| Location                                                                                                                           | Responsibility                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [app/pages](app/pages/)                                                                                                            | Localized home, artwork, artist, CV, contact and placeholder pages        |
| [app/components/common](app/components/common/)                                                                                    | Gallery, viewer, image wrapper, headings and page navigation              |
| [app/components/layout](app/components/layout/), [default layout](app/layouts/default.vue)                                         | Header, menu, footer and shared main landmark                             |
| [app/composables](app/composables/), [app/types](app/types/)                                                                       | Page SEO, responsive state and shared TypeScript contracts                |
| [app/data](app/data/)                                                                                                              | Site identity, page SEO registry and measured image dimensions            |
| [app/styles](app/styles/)                                                                                                          | CSS-free tokens, global base rules, shared keyframes and reusable classes |
| [smooth-scroll.client.ts](app/plugins/smooth-scroll.client.ts)                                                                     | Lenis integration                                                         |
| [navigation.ts](app/data/navigation.ts), [useSiteNavigation.ts](app/composables/useSiteNavigation.ts)                              | Ordered menu catalogue and shared close state                             |
| [router.options.ts](app/router.options.ts), [navigation-focus.client.ts](app/plugins/navigation-focus.client.ts)                   | History/anchor scrolling and destination focus                            |
| [overlay-scroll-lock.client.ts](app/plugins/overlay-scroll-lock.client.ts)                                                         | Shared overlay leases, scroll restoration and Lenis coordination          |
| [generateImageRoutes.ts](app/utils/generateImageRoutes.ts)                                                                         | Explicit IPX transform routes used by prerendering                        |
| [i18n/locales](i18n/locales/)                                                                                                      | French and English content                                                |
| [public](public/)                                                                                                                  | Original artwork, icons, CV and other published assets                    |
| [nuxt.config.ts](nuxt.config.ts), [app.vue](app/app.vue)                                                                           | Modules, routes, origins, root metadata and application setup             |
| [package.json](package.json), [.yarnrc.yml](.yarnrc.yml)                                                                           | Commands, direct dependencies and package manager                         |
| [tsconfig.json](tsconfig.json), [eslint.config.mjs](eslint.config.mjs), [.prettierrc](.prettierrc), [.editorconfig](.editorconfig) | Type, lint, formatting and file conventions                               |
| [CI workflow](.github/workflows/ci.yml)                                                                                            | Immutable dependency install and lint                                     |

The default layout owns the main landmark, header and footer.
It uses a content-driven flex shell with `100svh`, not fixed header/footer subtraction or a JavaScript `--vh` writer.
The header measures its rendered height for anchor clearance and menu bounds, and stops sticking on short landscape screens.
`default.scss` owns resets, typography, focus and reduced motion; `shared.scss` owns reusable controls.
Both load once alongside `keyframes.scss`; only `variables.scss` is injected into SCSS.
Menu destinations and translation keys belong in `app/data/navigation.ts`, not duplicated desktop/mobile templates.
The mobile menu and artwork viewer acquire independent leases through `useOverlayScrollLock()`; closing one cannot unlock another.
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
All public source images are registered in the typed [dimension catalog](app/data/imageDimensions.ts).
Every rendered image requires nonempty localized alt text.

## Deploy On Vercel

Use the Nuxt preset, `yarn install --immutable` and `yarn build` with Node.js 24 and the pinned Yarn version.
Leave the Output Directory override disabled so Nuxt/Nitro controls deployment output.
Use `yarn generate` for a static-delivery check, not as the Vercel SSR build target.

The production origin defaults to `https://atelierlibremotions.vercel.app`.
To change it, set build-time `NUXT_SITE_URL` in Vercel's Production environment only.
Previews use their own `VERCEL_URL` origin with indexing disabled; production and local production builds allow indexing.
Both localized `/wip` pages are noindex and excluded from sitemaps.
See [SEO maintenance](.agents/docs/SEO.md#origins-and-indexing) for environment settings, metadata ownership and release checks.

`public/_robots.txt` retains `Content-Usage: train-ai=n`; Nuxt generates the sitemap declaration.
Use `/robots.txt?mockProductionEnv` to inspect production-style rules during development.
AI Ready and Skew Protection are disabled; social previews use existing public artwork.

The site name, artist identity and social profiles live in [site.ts](app/data/site.ts).
[seo.ts](app/data/seo.ts) owns the explicitly typed page registry, sitemap artwork and robots policies; [types/seo.ts](app/types/seo.ts) owns route-qualified page names and contracts.
Each page calls `useHead(usePageSeo('pageName'))`; [usePageSeo.ts](app/composables/usePageSeo.ts) supplies reactive metadata, Open Graph, the large-image Twitter card and page schema.
Full titles and descriptions live in bilingual `seo.*` messages, while root I18n head data owns canonical links, language alternates and OG locales.
[error.vue](app/error.vue) provides a simple localized, noindex error shell with home and painting-gallery recovery.
The config loads shared defaults/keyframes once and injects Sass variables into component styles.
Native galleries serve original artwork; optimized image consumers retain IPX and explicit static transform routes.

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
