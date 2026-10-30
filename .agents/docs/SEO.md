# SEO Maintenance

Atelier Libr'Émotions uses server-rendered Nuxt pages, Nuxt I18n and Nuxt SEO v6.
French is the source language; every published page has a corresponding English route.
Use the [SEO skill](../skills/seo/SKILL.md) when adding or changing page metadata.
Shared `PageName` and `PageSeoDefinition` contracts live in [types/seo.ts](../../app/types/seo.ts).
The registry is explicitly typed as `Record<PageName, PageSeoDefinition>`; route-qualified names such as `ceramic_porcelain_nature` prevent painting/ceramic key collisions.

## Ownership

| Concern                                                                            | Source                                                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Site name, artist identity and verified profiles                                   | [site.ts](../../app/data/site.ts)                                               |
| Page paths, schema types, topic keys, previews, sitemap images and robots policies | [seo.ts](../../app/data/seo.ts)                                                 |
| Measured social-image pixel dimensions                                             | [imageDimensions.ts](../../app/data/imageDimensions.ts)                         |
| Reactive titles, descriptions, Open Graph, Twitter card and page schema            | [usePageSeo.ts](../../app/composables/usePageSeo.ts)                            |
| Canonical links, hreflang, HTML language/direction and OG locales                  | [app.vue](../../app/app.vue), through `useLocaleHead({ seo: true })`            |
| Localized search titles and descriptions                                           | `seo.<page>.title` and `.description` in [locale messages](../../i18n/locales/) |
| Origins, indexability, app icons, sitemap and Person identity                      | [nuxt.config.ts](../../nuxt.config.ts)                                          |
| Standalone localized errors and recovery                                           | [error.vue](../../app/error.vue), `error.*` messages                            |
| Authored crawler policy                                                            | [public/_robots.txt](../../public/_robots.txt)                                  |
| Existing optimized-image prerender routes                                          | [generateImageRoutes.ts](../../app/utils/generateImageRoutes.ts)                |

## Page Metadata And Images

Every page calls `useHead(usePageSeo('pageName'))` once.
Add the page to `pageSeo` and supply matching `seo.*` messages in both locales.
Titles include the brand; `titleTemplate: '%s'` prevents a duplicated suffix.
Descriptions remain independent of visible page labels and artist-authored subtitles.
The original site-wide copy lives in `seo.site.description` and describes WebSite, not a second page description meta tag.
Keep titles and descriptions specific, truthful and naturally translated rather than filling them with keywords.

The registry defines each unprefixed route, Schema.org page type, topic keys, social image, image-description key and sitemap artwork list.
The dimension catalog is a typed `Record<string, ImageDimensions>` measured from every public source image, including raster, SVG and ICO files.
The SEO helper rejects a missing social-image dimension entry at runtime rather than publishing invented values.
Change `image`, `imageAlt` and measured dimensions together.
The helper resolves absolute URLs through Site Config and localizes registered routes with `localePath()`.
Query strings, fragments and trailing slashes are not part of page identities.
Do not add competing per-page canonical links, language alternates or OG locale tags.

| Page                  | Social Image                                                                   |
| --------------------- | ------------------------------------------------------------------------------ |
| Home and WIP          | `/paintings/celestial-collision.webp`                                          |
| Artistic approach     | `/og-images/my_artistic_approach.webp`                                         |
| Development           | `/og-images/my_development.webp`                                               |
| CV                    | `/og-images/cv.webp`                                                           |
| Contact               | `/og-images/contact.webp`                                                      |
| Acrylic abstracts     | `/paintings/acrylic/abstracts/AutomaticPainting2.webp`                         |
| Oil artwork           | `/paintings/abstract-autumn.webp`                                              |
| Inks                  | `/paintings/inks/nature/EC10.webp`                                             |
| Mixed technique       | `/paintings/mixed_technique/nature/TMn9.webp`                                  |
| Electric-kiln nature  | `/ceramics/electric_kiln/nature/flowers/F8.webp`                               |
| Electric-kiln animals | `/ceramics/electric_kiln/animals/tortoises/Tortoises8.webp`                    |
| Vases and pots        | `/ceramics/electric_kiln/vases_and_pots/single_flower_vases/Soliflores10.webp` |
| Various objects       | `/ceramics/electric_kiln/various_objects/boxes/Sgraffitto4.webp`               |
| Porcelain             | `/ceramics/porcelain/nature/flowers/FP13.webp`                                 |
| Raku and smouldering  | `/ceramics/raku_smouldering/nature/FR1.webp`                                   |

Previews use original public WebP artwork with measured dimensions and existing translated image descriptions.
Generated OG images remain disabled.
Do not declare assumed landscape dimensions for portrait or square artwork, or confuse raster pixels with physical painting measurements.
Check MIME type, file size, public availability and platform cropping after replacing an image.
The existing small home preview is retained without inventing a larger source; social platforms may prefer a higher-resolution landscape asset in a future dedicated artwork update.

`twitter:card` is `summary_large_image`; X/Twitter uses the complete Open Graph title, description and image as fallbacks.
Do not duplicate these as legacy `twitter:title`, `twitter:description` or `twitter:image` fields.
There is no verified X/Twitter account, so no `twitter:site` or `twitter:creator` is fabricated.
The currently installed Unhead validator warns about all non-Slack `twitter:*` names, including `twitter:card`.
The card declaration is intentional; keep validation enabled and distinguish that tooling warning from missing or stale metadata.
Recheck upstream behavior during upgrades.

App icons are configured once in Nuxt; page artwork no longer overrides the touch icon.
The shared 180x180 PNG touch icon and dedicated transparent [Safari mask](../../public/mask-icon.svg) describe the application, not an individual artwork.
The mask reuses the full-color logo's brush-and-bowl geometry without its opaque badge background; keep the original logo unchanged.
`application-name` and `apple-mobile-web-app-title` use the stable site name; mobile-capability/status-bar settings remain global.

## Topics And Semantic Fields

Page subjects use existing translated labels referenced by optional `pageSeo.keywordKeys`.
The helper translates and deduplicates them reactively into Schema.org `WebPage.keywords`.
Keep technique, collection, artwork-subject and career terms relevant to the specific page.
Artist and site names have dedicated identity fields; Contact also includes the existing studio-name variants and artist first-name, last-name and username keys in its keyword list.
WIP and error pages do not need topic lists.
These fields describe content; they are not a ranking or rich-result guarantee.

Do not reintroduce a `meta[name="keywords"]` list: Google does not use it for indexing or ranking.
Open Graph `article:*` and `profile:*` fields belong to actual article/profile objects, not generic collection or contact pages.
Page authorship instead references the Person identity through `WebPage.author`.
`WebSite.publisher` is supplied by Nuxt Schema.org and references that same identity; do not duplicate it as a hardcoded publisher-URL meta tag.
The existing global author/creator meta tags name the artist.

Do not infer a public alternate name from a username or add demographic fields without a content requirement.
Keep generator URLs, obsolete Windows tile settings and arbitrary artwork startup/splash declarations out of the shared SEO helper.
They do not replace correct icons, an actual platform-specific splash setup or a web app manifest.
Preserve deliberate representative artwork choices when refactoring metadata; changing MIME/dimension declarations does not require changing the selected work.

## Origins And Indexing

`nuxt.config.ts` resolves one origin for Site Config, I18n, social URLs and identity.
Production uses build-time `NUXT_SITE_URL`, falling back to `https://atelierlibremotions.vercel.app`, without a trailing slash.

| Environment                                     | Metadata Origin                                           | Indexing |
| ----------------------------------------------- | --------------------------------------------------------- | -------- |
| Development                                     | `http://localhost:3000`                                   | Disabled |
| Vercel production                               | `NUXT_SITE_URL` or production fallback                    | Enabled  |
| Vercel preview/development                      | `https://${VERCEL_URL}`, or production fallback if absent | Disabled |
| Local production build without Vercel variables | `NUXT_SITE_URL` or production fallback                    | Enabled  |

Set `NUXT_SITE_URL` only in Vercel's Production environment when overriding the fallback.
Leave it unset in Preview, Development and local development `.env` files: Site Config reads it independently with higher priority than `site.url`.
Do not override only I18n's origin at runtime.
Keep Vercel system variables enabled; `VERCEL_URL` is a hostname without a protocol.
Known preview/development environments remain non-indexable even when their hostname is absent.
A production build without `VERCEL_ENV` is treated as local production and allows indexing.
Robots preferences do not replace hosting protection or access control.

French and English use `/fr` and `/en`, with `fr-FR`, `en-US` and corresponding short-language hreflang aliases from I18n.
`x-default` points to the equivalent French page.
Each localized page has one canonical, and reciprocal language links agree with its sitemap entry.
The root `/` remains a request-dependent language redirect; do not prerender it as a visitor-independent content page.
Check language cookies and `Accept-Language` separately from the French `x-default` convention.
Explicit localized routes remain authoritative even when a different local language preference is stored.
Language-switch links omit fragments to keep their server/client markup consistent while preserving query parameters.

## Robots And Sitemaps

Shared directives are `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` for indexable content and `noindex, nofollow` for blocked content.
Nuxt Robots supplies SSR metadata and HTTP policy; the composable also emits the current policy to restore it after client-side error recovery.
Both WIP routes have blocked route rules, `sitemap: false` and a non-indexable registry entry.
Their client-side policy also updates when navigating into or away from WIP.
Unknown/error URLs do not belong in the registry or sitemap.

The sitemap's explicit URLs come from indexable registry entries.
`excludeAppSources: ['nuxt:pages']` prevents automatic page records from overriding their explicit image lists.
`_i18nTransform: true` expands the 15 published entries into French and English with reciprocal regional alternates and French `x-default`.
Follow `/sitemap_index.xml` to its actual children rather than guessing filenames.
`/sitemap.xml` redirects to the index.

Image lists describe artwork actually available on the page, including its carousel or viewer, not every file in `public/`.
This makes image discovery independent of browser-built gallery rows or a prerender crawler.
Keep the curated ordering and series counts aligned with page consumers when adding artwork.
Use `image:loc`; do not add obsolete caption/title/license fields, arbitrary priorities or build-time `lastmod` dates.
Only publish modification dates from a real content-change source.

`public/_robots.txt` is merged by Nuxt Robots and retains `Content-Usage: train-ai=n`.
The sitemap module supplies one environment-correct sitemap-index declaration.
Do not add a hardcoded sitemap URL or another public `robots.txt`.
Development and preview deliberately emit `Disallow: /` instead of production allow/content-use groups and sitemap declarations.
Use `/robots.txt?mockProductionEnv` to inspect production-style rules during development; this does not enable deployed preview indexing.
Repeated Nuxt config reloads can accumulate imported robots groups in development; restart the dev server before diagnosing duplicates.
Fresh production builds do not inherit that running-server state.

## Structured Data

Nuxt Schema.org supplies the WebSite and Person graph; the helper enriches the existing WebSite with its localized description and homepage URL without adding a duplicate node.
The Person is Véronique Berthier, with explicit `givenName` and `familyName`, her verified painting/ceramics role and profiles from `externalLinks`.
Do not use the workshop name as the person's name, an artwork as an invented portrait, a Person `logo`, or an unconfirmed `worksFor` employer.
The helper supplies localized WebPage, AboutPage, CollectionPage, ContactPage or ItemPage data with translated topic keywords, artist authorship and a primary ImageObject.
Keep the WebPage definition as a computed node and resolve its keyword array inside that getter; the installed schema types do not accept a computed array directly on `keywords`.
Unhead accepts refs, computed refs and getters directly: `description` and `ogTitle: title` remain reactive without `.value`.
Inside a computed node, `.value` reads are tracked, including `localeProperties.value.language`; no extra nested computed is required for `inLanguage`.
Do not take `.value` snapshots while constructing a static object outside a reactive getter.
Artist information pages reference the Person identity.
The single oil artwork keeps its standalone presentation and uses ItemPage rather than pretending to be a full collection.
Do not invent article dates, reviews, events, employers or rich-result claims.

Keep `schemaOrg.reactive: true` and the narrow Unhead treeshake exclusion for `app/composables/usePageSeo.ts` together.
The installed transform otherwise removes the helper's `useSchemaOrg` call from the client.
Reactive schema URL/path template parameters keep page node IDs, images and actions aligned with client navigation.
Check production hydration and navigation when upgrading these dependencies.

## Error Pages

`app/error.vue` is independent of the normal layout and navigation.
404 uses localized missing-page copy; other statuses use a generic message without exposing internal details.
The original HTTP error status is retained, with a server-only `X-Robots-Tag` and client metadata set to `noindex, nofollow`.
The `import.meta.server` guard is required because a browser cannot set HTTP response headers; client noindex is supplied separately by reactive head metadata.
The error logo has a translated nonempty alt, and its link has a localized home name.
Errors have a nonempty description, absolute OG URL, image metadata and Twitter card, but no canonical or hreflang links.
The shell has a skip link, one main/H1 and localized home/painting-gallery links that recover through `clearError`.
Check keyboard and touch recovery, visible focus, language, enlarged text and short viewports.

## Module And Delivery Decisions

Nuxt SEO v6 bundles AI Ready and Skew Protection; both remain disabled.
There is no AI Markdown publishing policy or shared old-asset storage to support those services.
`/llms.txt` and page Markdown endpoints should remain unavailable.
With AI Ready disabled, no new `Content-Signal` directive is added; the existing content-use preference remains.
Generated-image signing secrets are unnecessary while the OG image service is disabled.

Server builds retain explicit IPX prerender routes, without a whole-site root crawl.
`yarn generate` additionally crawls localized pages for static validation.
Native gallery images need original-file availability; the optimized `Image` wrapper also needs its actual transforms and placeholders.
Use [artwork assets](../skills/artwork-assets/SKILL.md) rather than inferring IPX sizes from gallery row heights.
The existing Nuxt Fonts integration and stylesheet ownership are unchanged.
On a Windows network with an organizational certificate chain, Node 24's `--use-system-ca` can provide trusted system certificates; do not disable TLS verification to build.

## Verification

Run `yarn format:check`, `yarn typecheck`, `yarn lint`, `yarn build` and `yarn generate` for a shared SEO/configuration change.
Check changed root config and Markdown explicitly with Prettier, using preserved prose wrapping and LF for Markdown.
CI installs locked dependencies and runs lint; it does not replace production validation.

- Inspect all FR/EN routes for one title, description, robots tag and canonical, correct alternates, HTML language and OG locales.
- Check canonical and OG identities with tracking queries, fragments and trailing slashes.
- Verify social image MIME types, measured dimensions, translated alternatives and HTTP availability.
- Follow the sitemap index, verify 15 URLs per locale, reciprocal alternates, explicit images and WIP/error exclusion.
- Inspect production indexability, preview/development noindex, WIP HTTP headers and client policy restoration.
- Check localized JSON-LD URLs, types, topic keywords, author/publisher identity references and image data after hydration and client navigation.
- Verify language redirects, unknown-route 404s, generic errors, no canonical/hreflang on errors and recovery in both languages.
- Exercise the error shell at 320x568, desktop and short landscape widths, 200% text enlargement, keyboard/touch and reduced motion.
- Check console warnings and hydration, distinguishing intentional Twitter-card validation warnings from application defects.
- Inspect generated localized HTML and actual original/IPX image responses; static deployment of `/` requires a language-redirect strategy outside prerendered content.

After deployment, inspect public robots/sitemaps/assets and social cards, validate sample JSON-LD with Schema.org Validator and Google's Rich Results Test, and submit the sitemap index through the actual search-console accounts.
Valid structured data does not guarantee a rich result.
Verification tokens must come from those accounts, never placeholders.
Report local coverage separately from unavailable deployment, crawler, account and real-device validation.

## References

- [Nuxt SEO v5 to v6 migration](https://nuxtseo.com/docs/nuxt-seo/migration-guide/v5-to-v6)
- [Nuxt I18n SEO](https://i18n.nuxtjs.org/docs/guide/seo)
- [Nuxt Sitemap source merging](https://nuxtseo.com/docs/sitemap/advanced/loc-data)
- [Nuxt Robots indexing](https://nuxtseo.com/docs/robots/guides/disable-indexing)
- [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [Google and the keywords meta tag](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)
- [Open Graph object types](https://ogp.me/#types)
- [Schema.org keywords](https://schema.org/keywords)
- [X/Twitter card fallback behavior](https://developer.x.com/en/docs/x-for-websites/cards/overview/markup)
- [Vercel environment variable scopes](https://vercel.com/docs/environment-variables/manage-across-environments)
