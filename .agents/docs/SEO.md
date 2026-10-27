# SEO maintenance

Atelier Libr'Émotions uses Nuxt, Nuxt I18n and the Nuxt SEO modules with prerendered routes and a mixture of native and optimized images.
This guide records current ownership, source findings and release checks; it does not certify deployed metadata or change hosting configuration.
Use [the SEO skill](../skills/seo/SKILL.md) for the page implementation pattern and [the artwork-assets skill](../skills/artwork-assets/SKILL.md) for delivery details.

## Configuration and ownership

Check [package.json](../../package.json) and the installed packages before applying version-specific module guidance.
This repository currently declares `@nuxtjs/seo` v5.
Verify installed APIs before adding version-specific flags, endpoint expectations or migration changes.

| Concern                                  | Current owner                                                                            | Maintenance responsibility                                                               |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Global title template and fallback head  | [app.vue](../../app/app.vue)                                                             | Site name, fallback description, social metadata, icons and font links                   |
| Page metadata                            | Individual files in [app/pages](../../app/pages/)                                        | Localized title, description, canonical, alternates and page artwork where implemented   |
| Site origin, identity and module options | [nuxt.config.ts](../../nuxt.config.ts)                                                   | Runtime I18n origin, fixed Site Config origin, Schema.org and indexability configuration |
| Authored metadata                        | [fr-FR.json](../../i18n/locales/fr-FR.json), [en-US.json](../../i18n/locales/en-US.json) | Page `tab_name` and `meta.content`; confirmed artwork descriptions                       |
| Robots source policy                     | [public/_robots.txt](../../public/_robots.txt)                                           | Existing crawler preferences and fixed sitemap declaration                               |
| Original image assets                    | [public](../../public/)                                                                  | Valid source URLs, MIME types and measured raster dimensions                             |
| Explicit IPX transforms                  | [generateImageRoutes.ts](../../app/utils/generateImageRoutes.ts)                         | Static coverage for consumers that request transformed images                            |

Page metadata currently lives in the individual pages and root setup listed above.
A proposed helper, registry or custom error shell must be identified as new work.
Keep substantial architecture changes within a task that actually requests them.

## Page metadata and locales

French and English routes use `/fr` and `/en` with the `prefix` strategy.
The current page pattern supplies a canonical, reciprocal `fr-FR` and `en-US` alternates and a French `x-default`.
Use the current locale path for the canonical and the equivalent page path for each alternate.
Exclude tracking queries and fragments from page identities and keep trailing-slash behavior consistent with actual routes.

Page titles and descriptions must describe the actual content in the selected language.
Use the artist's confirmed name naturally in gallery descriptions and keep the full site name from receiving duplicate title suffixes.
Keep translated metadata, keyword arrays, canonical URLs and `ogUrl` reactive rather than taking setup-time snapshots.
Register one effective description and verify head deduplication between root and page values.
For editorial guidance, use [content-direction.md](content-direction.md).

Current root metadata takes setup-time values for OG locale fields, and many existing pages snapshot canonical or article-tag values.
These are source review points, not fixes already made by this guide.
Check direct page visits and client-side route/locale changes before calling a metadata change complete.
If centralizing locale head ownership in a future task, use the installed I18n API and remove competing per-page entries in the same change.

The oil artwork page has a standalone presentation and does not implement the full gallery metadata pattern.
Do not infer that every existing route already has complete page-specific metadata.
Current gallery code uses article tags; preserve the local convention for ordinary additions while reviewing its semantics explicitly during an SEO cleanup.
Do not invent publication dates, article claims, reviews, event details or rich-result content.

## Origins and indexing

| Source condition                             | Current page-metadata origin             | What to verify                                                                                                  |
| -------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV=development`                       | `http://localhost:3000`                  | Localized development output and root detection                                                                 |
| Production mode with `VERCEL_ENV=production` | `https://atelierlibremotions.vercel.app` | Production canonicals, social URLs and identity                                                                 |
| Other production-mode builds                 | `https://${VERCEL_URL}`                  | Hostname availability and preview metadata                                                                      |
| No `VERCEL_URL` in the last branch           | Can become `https://undefined`           | Supply an appropriate local build environment or address the fallback within an authorized configuration change |

Site Config and Schema.org contain a fixed production origin while page metadata reads the runtime I18n origin.
`site.indexable` is explicitly `true`; the source does not make that value conditional on the deployment environment.
Do not assume previews are indexable or non-indexable without checking the installed modules' resolved output and hosting behavior.
Nested `site.robots` flags are not proof that the Robots module emits the intended directives.
For an origin/indexing task, align all consumers deliberately and verify both production and preview behavior.

The source prerender configuration crawls links and explicitly includes `/`.
I18n root language detection uses the `i18n_redirected` cookie, and the language switcher also uses local storage.
Verify the generated root entry and deployed redirects, including language and cookie behavior.
Keep French `x-default` separate from the actual visitor-language redirect behavior.

## Artwork and social previews

`ogImage.enabled: false` disables the configured generated OG image service; existing pages reference public artwork directly.
Choose representative work from the actual page and use its localized image description as alt text.
Set MIME type and pixel dimensions from the served file, not from an assumed social-card size.
Physical painting dimensions belong to artwork content and must not be used as raster metadata.

Many gallery pages declare JPEG and `1200 x 600` for a WebP URL.
Treat that mismatch as a source finding to correct when editing those metadata fields, not as a template to repeat.
Inspect `ogImageSecureUrl`, tile-image and touch-icon references when replacing social artwork.
Gallery touch icons intentionally reuse the `apple-touch-icon` key to override the root default; the original artwork is not thereby converted into a square icon.

`ImageGridItem` and the viewer use native image URLs, while the standalone `Image` wrapper requests Nuxt Image transforms.
Validate the original file and transformed requests separately.
A working source image does not establish that every static `srcset` or placeholder route exists.
Follow the artwork-assets skill for emitted IPX requests and the helper's existing placeholder-path concern.

## Robots, sitemaps and structured data

`public/_robots.txt` currently allows crawling, declares `Content-Usage: train-ai=n` and points to the production `/sitemap.xml` URL.
Preserve the authored content-use preference unless the user requests a policy change.
Do not claim that this preference prevents access or that generated output exactly matches the source file.
Inspect the resolved `robots.txt`, robots meta and `X-Robots-Tag` headers separately when those outputs are in scope.
Check for duplicate or conflicting sitemap declarations before adding another host or public robots file.

Follow the generated sitemap index and its actual child URLs; derive counts and filenames from that output.
Verify that localized entries represent real pages and that alternates resolve reciprocally.
Only list artwork accessible on the page or through its viewer; do not enumerate every file in `public/`.
Because gallery rows are built after mount, inspect image discovery rather than assuming a prerender crawler saw every work.
If image-sitemap entries are needed, use the installed module's supported source mechanism and actual public URLs.
Do not manufacture `lastmod` dates from build time or add arbitrary priorities and change frequencies.

The current Schema.org configuration describes a Person using the site name and shared artwork.
Review the generated entity and the distinction between artist and workshop identity before extending that graph.
Use verified names, profiles, roles and destinations; do not turn a platform, community or collaborator into an invented employer.
Do not assume that a valid graph guarantees a search-engine rich result.

There is no custom localized error shell in the current source.
When an SEO task changes error handling, verify HTTP status, noindex behavior, missing canonical/alternate links and real recovery destinations rather than documenting a nonexistent custom implementation.

## Verification and evidence

| Change area                           | Required evidence                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Page metadata                         | Effective FR/EN title, description, canonical, alternates, OG fields and representative image response |
| Locale behavior                       | Direct localized visits, client switching and route changes; consistent URL, copy and head values      |
| New routes or prerender configuration | `yarn generate` and inspection of affected static pages, assets and root entry behavior                |
| Shared configuration or SSR           | Relevant `yarn build`, environment setup and resolved production/preview output                        |
| Indexing and discovery                | Robots meta/headers/file, actual sitemap index and child entries, page status and image coverage       |
| Structured data                       | Generated JSON-LD, entity consistency, truthful claims and available external validation               |

Run `yarn lint` for implementation changes and check development console warnings from Unhead, hydration and missing translations.
CI currently installs dependencies and runs lint; its build-named job does not run `yarn build` or `yarn generate`.
Use only scripts present in `package.json`.
Documentation-only changes need formatting, links and source-accuracy checks rather than an application rebuild.

After deployment, inspect public image responses, robots, sitemaps, redirects, status codes and social cards when access is available.
Search-console verification requires the actual account/property and supplied tokens; do not create placeholders or claim submission without performing it.
Report checks actually completed and unavailable browser, deployment, crawler or external-validator coverage.

## References

| Reference                                                                                                    | Use                                                                                        |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [Nuxt I18n SEO](https://i18n.nuxtjs.org/docs/guide/seo)                                                      | Locale head ownership and supported metadata generation                                    |
| [Nuxt Robots indexing](https://nuxtseo.com/docs/robots/guides/disable-indexing)                              | Indexability options and resolved outputs; verify compatibility with the installed version |
| [Google image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps) | Image discovery and supported image-sitemap fields                                         |
