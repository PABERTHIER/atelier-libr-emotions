---
name: seo
description: Implement, review or debug Atelier Libr'Émotions localized page metadata, canonical and hreflang URLs, Open Graph artwork and indexing configuration. Use for SEO work on galleries or other pages, not as a mandate to redesign site-wide metadata during unrelated edits.
---

# Atelier SEO

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Read the affected page, [app.vue](../../../app/app.vue) and [nuxt.config.ts](../../../nuxt.config.ts) before editing metadata.
Check installed versions in [package.json](../../../package.json) rather than relying on legacy documentation naming an older SEO module.
Use [SEO maintenance](../../docs/SEO.md) for environment behavior, indexing, sitemap discovery, structured data and release checks when those concerns are in scope.

## Metadata Ownership

| Concern                                                       | Current owner                              | Expected result                                                                        |
| ------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------- |
| Global title template, fallback metadata and icons            | `app/app.vue`                              | Page values override relevant defaults without duplicate effective tags                |
| Site identity, indexing, sitemap and Schema.org configuration | `nuxt.config.ts` and installed SEO modules | Consistent origin and truthful identity                                                |
| Localized title, canonical, alternates and gallery touch icon | Page `useHead()`                           | Reactive page-specific values                                                          |
| Description, Open Graph and tile image                        | Page `useSeoMeta()`                        | Same page identity and description as the visible content                              |
| Authored title and description                                | Both locale JSON files                     | Appropriate `pages.*.tab_name` and `pages.*.meta.content` keys                         |
| Social artwork                                                | Verified public asset                      | Absolute URL, correct MIME type, measured pixel dimensions and image-specific alt text |

Preserve the current per-page architecture unless the task explicitly includes centralization.
Avoid registering the same description independently in both head composables; verify one effective description in the rendered output.

## Reactive Page Metadata

Keep translated values and route-dependent URLs inside getters or computed values.
Reading a computed value once while constructing a static object does not preserve reactivity.
This applies to `canonical`, `ogUrl`, keywords and `articleTag`, as well as titles and descriptions.

For a gallery, define `pageKey`, `urlEndPath`, `ogImageEndPath` and `imageAltKey` from the verified page and representative artwork.
`urlEndPath` has no leading slash or locale prefix, while `ogImageEndPath` is relative to `public/` without its prefix.
Use the runtime-configured origin and `route.path`, which includes the current locale and excludes query strings and fragments.

```ts
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = runtimeConfig.public.i18n.baseUrl
const canonicalUrl = computed(() => new URL(route.path, baseUrl).href)
const socialImageUrl = new URL(`/${ogImageEndPath}`, baseUrl).href
const keywordValues = computed(() => keywordKeys.map(key => t(key)))

useHead(() => ({
  title: t(`${pageKey}.tab_name`),
  meta: [{ name: 'keywords', content: keywordValues.value.join(', ') }],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    {
      rel: 'alternate',
      hreflang: 'fr-FR',
      href: new URL(`/fr/${urlEndPath}`, baseUrl).href,
    },
    {
      rel: 'alternate',
      hreflang: 'en-US',
      href: new URL(`/en/${urlEndPath}`, baseUrl).href,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: new URL(`/fr/${urlEndPath}`, baseUrl).href,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `/${ogImageEndPath}`,
      key: 'apple-touch-icon',
    },
  ],
}))

useSeoMeta({
  description: () => t(`${pageKey}.meta.content`),
  ogTitle: () => `${t(`${pageKey}.tab_name`)} - ${t('app.name')}`,
  ogDescription: () => t(`${pageKey}.meta.content`),
  ogUrl: () => canonicalUrl.value,
  ogImage: socialImageUrl,
  ogImageAlt: () => t(imageAltKey),
  articleTag: () => keywordValues.value,
  appleMobileWebAppTitle: () => t(`${pageKey}.tab_name`),
  msapplicationTileImage: socialImageUrl,
})
```

This fragment assumes verified identifiers and `keywordKeys` are defined earlier; add the verified image type, dimensions and appropriate page type as described below.
Follow the existing article convention for ordinary gallery additions, keeping article tags reactive and aligned with keywords.
For a semantic SEO review, evaluate whether `website` better describes a portfolio collection and remove or override inapplicable inherited article fields when changing its type.
Do not copy article/profile metadata onto every page merely because it is currently present globally.

## URLs And Environment Checks

Include reciprocal `fr-FR` and `en-US` alternates and a French `x-default` for the same page.
Do not use the current locale's `route.path` as both language alternates or expose query/fragment variants as page identities.
Keep trailing-slash behavior consistent with the generated routes.
The gallery touch icon overrides the root default with the same `key: 'apple-touch-icon'`; preserve that local behavior without claiming the original artwork is a generated square icon.

Check the current origin table and source limitations in [SEO maintenance](../../docs/SEO.md#origins-and-indexing) before a production-mode build or environment change.
The runtime I18n origin, fixed Site Config origin and indexability settings need joint verification; local builds can otherwise produce `https://undefined`.
Address affected inconsistencies within scope and supply an appropriate local build environment for validation.
Do not silently deploy, change hosting settings or claim preview noindex behavior without verification.

## Descriptions, Keywords And Social Images

Use [content direction](../../docs/content-direction.md) when authoring or revising prose.
Write a unique description for each page using confirmed technique, category and artist details.
For galleries, include `Véronique Berthier` naturally and rewrite the artist's source prose into a useful summary.
Aim for roughly 140–160 characters when practical; do not sacrifice clarity to a rigid opening phrase or character count.
Google truncates snippets according to available display width, not a universal 160-character rule.
See [Google's snippet guidance](https://developers.google.com/search/docs/appearance/snippet) when reviewing that behavior.

Preserve this project's gallery keyword convention without presenting keywords as a search-ranking guarantee.
Include `miscellaneous.art`, `miscellaneous.artist`, `miscellaneous.emotions`, `about.author` and `app.name`.
Add only relevant existing technique/category labels, with painting/painter or ceramic/ceramicist as appropriate.
Derive meta keywords and article tags from the same reactive key list.

Choose representative artwork actually displayed on the page; its series position is not a selection rule.
Prefer a composition that survives social preview cropping without changing the original artwork.
Use the image's own translated alt key instead of the entire page description.
Set `ogImageType` to the served file's actual type, such as `image/webp`, and use measured pixel width and height.
Do not copy `image/jpeg`, `1200` and `600` onto arbitrary WebP files; omit optional unverified dimensions rather than inventing them.
Check existing HTTPS image metadata and tile-image references when replacing the asset, using [artwork-assets](../artwork-assets/SKILL.md).
Do not invent publication dates, events, reviews, employers or unsupported structured-data properties.

## Verification

Run `yarn lint` for implementation changes and `yarn generate` when routes, head configuration or prerendered output change.
Inspect effective FR/EN HTML for one title, description and canonical, correct alternates, absolute image URLs and matching image metadata.
Check JSON-LD, robots and sitemap output when changing site identity, origin or indexing rather than assuming modules resolve conflicts automatically.
Switch routes and locales without reloading and confirm head values update.
Inspect development warnings from Unhead, hydration and missing translations.
Verify representative social files load with an image content type and distinguish local checks from unavailable deployed crawler validation.
