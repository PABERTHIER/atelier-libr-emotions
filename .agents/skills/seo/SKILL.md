---
name: seo
description: Implement, review or debug Atelier Libr'Émotions localized page metadata, canonical and hreflang URLs, Open Graph artwork and indexing configuration. Use for SEO work on galleries or other pages, not as a mandate to redesign site-wide metadata during unrelated edits.
---

# Atelier SEO

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Read the affected page, [page registry](../../../app/data/seo.ts), [SEO composable](../../../app/composables/usePageSeo.ts), [app.vue](../../../app/app.vue) and [nuxt.config.ts](../../../nuxt.config.ts) before changing metadata.
Check installed versions in [package.json](../../../package.json).
Use [SEO maintenance](../../docs/SEO.md) for origins, indexing, schema, errors, discovery and release checks.

## Ownership

| Concern                                                                                        | Owner                                                 |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Page path, schema type, topic keys, social image, alt key, sitemap images and optional noindex | `app/data/seo.ts`                                     |
| Actual social-image pixel dimensions                                                           | `app/data/imageDimensions.ts`                         |
| Reactive page metadata and schema                                                              | `usePageSeo()`                                        |
| Canonical, hreflang, HTML language/direction and OG locales                                    | Root `useLocaleHead({ seo: true })`                   |
| Full localized title and description                                                           | `seo.<page>.title` and `.description` in both locales |
| Site origin, app icons, robots, sitemap and Person identity                                    | Nuxt configuration and shared site data               |
| Error metadata and recovery                                                                    | Standalone `app/error.vue`                            |

## Add Or Update A Page

1. Add a route-qualified `PageName` in `app/types/seo.ts`, then register its unprefixed path in the explicitly typed `pageSeo` record.
2. Select existing representative artwork and its actual translated image-description key.
3. Measure the source image, add its dimensions to `imageDimensions`, and confirm WebP MIME type, file size and exact public URL.
4. List artwork available on the page or in its carousel/viewer in `images`, preserving curated order and real series counts.
5. Add `seo.<page>.title` and `.description` in French and English, with the brand included once in the full title.
6. Preserve relevant page subjects as existing translated `keywordKeys`; the helper emits deduplicated Schema.org keywords, not a meta-keyword list.
7. Call the shared helper once:

```ts
useHead(usePageSeo('painting_acrylic_abstracts'))
```

Do not reproduce metadata blocks in pages or add competing canonical/alternate links.
Keep `pages.*.tab_name` for visible navigation labels.
Keep visible page/navigation labels and artist-authored subtitles separate from search copy.
Use CollectionPage for a gallery, AboutPage for artist information, ContactPage for contact and ItemPage for a standalone artwork.
Do not copy article/profile metadata, meta-keyword lists or artwork touch-icon overrides into new pages.
Keep original representative artwork selections unless a content change explicitly calls for a different preview.
The helper models page authorship through the Person identity; Nuxt Schema.org already supplies WebSite.publisher.
Keep the stable application/Apple app name and global app icons in Nuxt configuration.

## Reactive URLs And Schema

The helper derives title, description, topic keywords, image alternative and localized URLs reactively.
`seo.site.description` supplies separate site-level copy on the localized WebSite node; it must not override or duplicate the page description.
Use a computed WebPage definition with a resolved keyword array rather than assigning a computed array directly to that schema property.
Direct computed refs in `useSeoMeta()` are supported and reactive; `.value` belongs inside derived getters, not setup-time snapshots.
`inLanguage` inside the computed WebPage node is already reactive.
`localePath(pageData.path)` excludes query/hash variants and uses the environment's Site Config origin.
Root I18n head data owns reciprocal French/English language links and French `x-default`.
Keep `schemaOrg.reactive: true`, the helper's Unhead treeshake exclusion and its reactive URL/path template parameters coordinated.
Verify schema node IDs, types, actions, images and Person references after client navigation, not only in SSR HTML.

## Authored Copy And Social Cards

Use [content direction](../../docs/content-direction.md) for truthful, specific descriptions and natural English.
Include confirmed artist, technique and category details without keyword stuffing or invented claims.
Aim for concise useful snippets, not a rigid character count.
Use the image's existing informative alternative rather than the whole page description.
Physical painting measurements do not supply raster dimensions.
Preserve original assets and use [artwork assets](../artwork-assets/SKILL.md) for delivery checks.

Open Graph supplies the sharing title, description, URL and image; `twitter:card` selects `summary_large_image`.
Do not add redundant legacy Twitter title/description/image fields or fabricate an account handle.
The current validator warns about the intentional card field; see the guide before treating that warning as missing metadata.
Social cropping and public crawler access require post-deployment checks.

## Indexing And Errors

Keep `NUXT_SITE_URL` overrides production-only; Site Config also reads that variable independently.
Development and previews remain noindex, with environment-correct absolute URLs.
Use a registry `indexable: false` and matching route rules for reachable excluded content such as WIP.
The helper restores robots policy during client navigation and error recovery.
Do not add error URLs to the registry or sitemap.
The standalone error page preserves status, sends noindex metadata/header, omits canonical/hreflang and recovers through valid localized destinations.
Only set response headers on the server.
Do not invent dates, employers, events, reviews or rich-result claims in structured data.

## Verification

Follow [shared verification](../../../AGENTS.md#verification): formatting, types, lint, production build and generation for shared head/config changes.
Check all affected FR/EN HTML for one title, description and canonical, correct alternates, absolute image URLs and measured image metadata.
Inspect robots headers/meta/file, sitemap index and child entries, image coverage and localized JSON-LD, including translated keywords and author/publisher references.
Switch page and locale without reloading and verify the head and schema follow.
Exercise WIP entry/exit and error recovery, including restoration of indexability in production.
Check error status, language, no canonical/hreflang, keyboard/touch recovery and narrow/enlarged layouts.
Report actual local coverage separately from unavailable deployment, platform and account validation.
