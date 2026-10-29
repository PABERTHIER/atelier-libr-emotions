# SEO maintenance

Atelier Libr'Émotions uses Nuxt SEO for site configuration, robots, sitemaps and structured data.
Page metadata remains in the root application and individual pages.
Use [the SEO skill](../skills/seo/SKILL.md) for page metadata and [artwork assets](../skills/artwork-assets/SKILL.md) for native/IPX image delivery.

## Ownership

| Concern                                            | Source                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| Site name and public social profiles               | [site.ts](../../app/data/site.ts)                                        |
| Shared robots directive strings                    | [seo.ts](../../app/data/seo.ts)                                          |
| Origins, indexing, route rules and site identity   | [nuxt.config.ts](../../nuxt.config.ts)                                   |
| Global title template, fallback metadata and icons | [app.vue](../../app/app.vue)                                             |
| Localized page metadata                            | [app/pages](../../app/pages/) and [locale messages](../../i18n/locales/) |
| Authored crawler policy                            | [public/_robots.txt](../../public/_robots.txt)                           |
| Static image transforms                            | [generateImageRoutes.ts](../../app/utils/generateImageRoutes.ts)         |

Keep public profile URLs in `externalLinks`; the contact page and Schema.org identity consume the same values.
The shared SEO data currently contains robots directives, not a page or sitemap registry.

## Origins and indexing

`prodUrl` reads build-time `NUXT_SITE_URL`, falling back to `https://atelierlibremotions.vercel.app`, and removes a trailing slash.
`siteUrl` resolves the current environment's origin for Site Config, I18n and configured Schema.org identity URLs.
Pages deriving artwork URLs from runtime I18n config use that origin too.

| Environment                                     | Origin                                                    | Indexing |
| ----------------------------------------------- | --------------------------------------------------------- | -------- |
| Development                                     | `http://localhost:3000`                                   | Disabled |
| Vercel production                               | `NUXT_SITE_URL` or production fallback                    | Enabled  |
| Vercel preview/development                      | `https://${VERCEL_URL}`, or production fallback if absent | Disabled |
| Local production build without Vercel variables | `NUXT_SITE_URL` or production fallback                    | Enabled  |

Set `NUXT_SITE_URL` only in Vercel's Production environment when overriding the fallback.
Leave it unset in Preview, Development and local development `.env` files: Site Config reads that variable independently with higher priority than `site.url`.
Do not override only I18n's base URL at runtime.
Keep Vercel's system environment variables enabled; `VERCEL_URL` is a hostname without a protocol.
A production build without `VERCEL_ENV` is treated as local production and allows indexing.

Site Config uses `defaultLocale: 'fr-FR'` and `trailingSlash: false`.
Robots preferences are not access control; hosting protection and deployment settings are managed separately.

## Robots and excluded pages

`robotsContent` defines the module's HTTP/SSR policies:

- Indexable: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
- Blocked: `noindex, nofollow`.

The localized placeholders `/fr/wip` and `/en/wip` use blocked route rules and `sitemap: false`.
They remain reachable without becoming sitemap entries.
Check the effective robots meta and `X-Robots-Tag` header on both routes after changing these rules.
The current client head does not update that robots meta when navigating to WIP without a reload.
Keep reactive robots policy and restoration after leaving WIP in scope when reworking page SEO; route rules currently enforce the direct HTTP/SSR policy.

`public/_robots.txt` is merged by Nuxt Robots and retains `Content-Usage: train-ai=n`.
The sitemap module supplies the environment-specific sitemap-index declaration.
Do not add a hardcoded sitemap URL or a separate `public/robots.txt`.
The content-use directive expresses a crawler preference, not an access restriction.

Development and preview output contains `Disallow: /` and omits the production allow/content-use group and sitemap declaration.
Use `/robots.txt?mockProductionEnv` on the development server to inspect production-style rules.
That switch does not enable indexing on deployed previews.
Restart development after repeated config reloads before diagnosing duplicate imported groups.

## Localized page metadata

French and English use the `prefix` strategy with `/fr` and `/en` routes.
Each page should have one title, description and canonical, reciprocal `fr-FR`/`en-US` alternates and a French `x-default`.
Canonicals describe the localized page without tracking queries or fragments.
The root `/` uses request-dependent language detection and is not explicitly prerendered during a server build.

Keep translated metadata and route-dependent URLs reactive.
Use confirmed artist facts and natural localized descriptions; see [content direction](content-direction.md).
Avoid duplicate title suffixes and competing descriptions.
The gallery touch icon overrides the root icon using the same `apple-touch-icon` key.

Current source findings to address when changing page metadata:

- Root OG locale fields and several page canonical/article-tag values take setup-time snapshots.
- Several galleries declare JPEG and `1200 × 600` for WebP social images.
- Gallery article metadata and root profile fields need a semantic review.
- The standalone oil artwork page does not use the full gallery metadata pattern.

There is no centralized page SEO helper or custom localized error shell.
Keep future changes to those areas coordinated with the existing root/page head entries.
For errors, preserve the HTTP status and verify noindex behavior, recovery destinations and the absence of inappropriate canonical/alternate links.

## Social images and structured data

Social previews use existing public artwork; generated OG images are disabled.
Choose work displayed on the page and use its own localized image description.
Declare MIME type and pixel dimensions from the actual file.
Physical artwork measurements are separate from raster dimensions.
Check secure-image, tile-image and touch-icon references when replacing a social image.

Schema.org uses a reactive Person identity with the configured site name, origin, artwork and public profiles.
Keep `sameAs` limited to verified profiles from `externalLinks`.
Review artist/workshop identity and semantic fields before extending the graph; do not invent employers, dates, reviews or rich-result claims.
Valid structured data does not guarantee a search-engine rich result.

## Sitemaps and prerendering

The sitemap module discovers page routes and expands localized entries.
Follow `/sitemap_index.xml` to the actual child sitemaps; do not assume child names or fixed route counts.
Verify reciprocal alternates and exclusion of both localized WIP pages.

Image discovery needs separate checks: gallery rows are constructed after mount, so a crawler may not see every work.
Only list artwork available on a page or in its viewer when adding image-sitemap data.
Do not manufacture `lastmod` dates or add arbitrary priorities/change frequencies.

Server builds retain explicit IPX prerender routes but do not enable a whole-site link crawl.
`yarn generate` uses Nuxt's static-generation crawl to discover pages.
The root language redirect must be checked separately for static deployment.
Native gallery images need original-file availability; optimized `NuxtImg` consumers also need their actual transforms and placeholders.
Inspect the generated output and HTTP image responses rather than treating an original file as proof of transformed coverage.

## Module and stylesheet settings

Nuxt SEO v6 bundles AI Ready and Skew Protection.
`aiReady: false` keeps automatic AI text/Markdown endpoints disabled without adding a `Content-Signal` policy.
`skewProtection: false` avoids relying on an old-asset cache that clean deployments do not persist.
Revisit these settings with an explicit publishing policy or persistent asset storage.

The config's `css` array loads shared defaults and keyframes once.
Vite injects only Sass variables; component styles retain their local rules.
The `theme-color` matches the current page background, `#F7F5F2`.
Fonts retain the current Nuxt Fonts integration; inspect actual browser requests before documenting a font-delivery optimization.

## Verification

Run `yarn format:check`, `yarn typecheck`, `yarn lint` and `yarn build`.
Check changed root config and Markdown explicitly with Prettier.
Use `yarn generate` and a static preview when prerendering or image delivery changes.
CI installs locked dependencies and runs lint; it does not replace build or generation checks.

Inspect production and preview output:

- Localized titles, descriptions, canonical/alternate links and reactive client navigation.
- Production indexability, preview noindex, WIP exclusion and HTTP status.
- Robots file/meta/headers and one environment-correct sitemap declaration.
- Sitemap index/children, reciprocal alternates and actual image coverage.
- JSON-LD identity, profile URLs and page URLs without invented claims.
- Original/IPX image responses, content types and matching social-image metadata.
- Development console warnings, hydration and translations.

After deployment, check public robots/sitemaps, assets, redirects and social cards.
Use external schema validators and search-console tools when account access is available.
Verification tokens must come from the actual accounts.
Report completed checks and unavailable browser, deployment or crawler coverage separately.

## References

- [Nuxt SEO v5 to v6 migration](https://nuxtseo.com/docs/nuxt-seo/migration-guide/v5-to-v6)
- [Nuxt I18n SEO](https://i18n.nuxtjs.org/docs/guide/seo)
- [Nuxt Robots indexing](https://nuxtseo.com/docs/robots/guides/disable-indexing)
- [Google image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
