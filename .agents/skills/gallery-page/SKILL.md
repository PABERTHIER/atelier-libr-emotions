---
name: gallery-page
description: Create, extend or review Atelier Libr'Émotions painting and ceramic galleries, including artwork groups, bilingual content, menu entries, adjacent-page navigation and static asset delivery. Use for a gallery workflow, not translation-only or metadata-only edits.
---

# Atelier Gallery Pages

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Inspect the requested collection, its menu entry and the nearest working gallery before editing.
For a review request, inspect and report findings without changing files unless fixes are requested.

## Sources And Ownership

| Concern             | Source                                                                                 | Guidance                                                            |
| ------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Single collection   | [mixed-technique/nature](../../../app/pages/painting/mixed-technique/nature/index.vue) | Reference for page structure and numbered artwork                   |
| Multiple groups     | [electric-kiln/animals](../../../app/pages/ceramic/electric-kiln/animals/index.vue)    | Reference for translated group headings and separate grids          |
| Porcelain           | [porcelain/nature](../../../app/pages/ceramic/porcelain/nature/index.vue)              | Flowers belong to this page; there is no porcelain/flowers route    |
| Naming              | [artwork naming](../i18n/references/artwork-naming.md)                                 | Resolve route, page key, picture key and asset directory separately |
| Messages            | [i18n](../i18n/SKILL.md)                                                               | Owns FR/EN parity, field quality and translated state               |
| Metadata            | [seo](../seo/SKILL.md)                                                                 | Owns reactive head tags, social images and URL checks               |
| Artwork delivery    | [artwork-assets](../artwork-assets/SKILL.md)                                           | Owns filenames, direct images and IPX prerendering                  |
| Menu                | [navigation.ts](../../../app/data/navigation.ts)                                       | Section, technique and category links rendered by the shared menu   |
| Component contracts | [image.ts](../../../app/types/image.ts), [page.ts](../../../app/types/page.ts)         | `ImageSource`, `Heights` and `PageNavigation`                       |

Existing pages are structural references, not proof that their metadata, reactivity or accessibility is correct.
Use [nuxt-vue-patterns](../nuxt-vue-patterns/SKILL.md) when changing shared Vue behavior and [accessibility](../accessibility/SKILL.md) when changing controls or the viewer.
For authored copy, use [content direction](../../docs/content-direction.md).
For layout changes or a gallery journey review, use [UX principles](../../docs/ux-principles.md) and [design system](../../docs/design-system.md) as relevant.

## Establish The Collection

Resolve the domain, technique, category, artwork order and any groups from the request and existing files.
Keep the supplied French artistic subtitle and adapt it naturally into English.
Rewrite an optional artist description into concise page metadata rather than pasting the entire text.
Ask only for unresolved information that affects the result, such as an ambiguous collection or an unavailable artist-authored subtitle.
Continue independent preparation while waiting for required facts.

Verify every requested filename with its exact casing before adding a reference.
Use explicit lists for irregular names, gaps or curated ordering.
Generate a numbered sequence only after confirming its complete range on disk.
Report missing files and complete independent work; do not silently substitute artwork or call a broken gallery finished.

## Build Or Extend The Page

Create new routes at `app/pages/{painting|ceramic}/{technique-kebab}/{category-kebab}/index.vue`.
Extend an existing category page when the request concerns one of its groups rather than inventing a second route.

Preserve this shell for new galleries:

```vue
<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t(`${pageKey}.title`)"
        :subtitle="t(`${pageKey}.subtitle`)" />
    </div>

    <div class="gallery-container">
      <ImageGrid
        :images="images"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>
```

Define `pageKey` as the verified `pages.*` namespace in `<script setup lang="ts">`.
For multiple groups, add translated H2 headings and one grid per group while keeping a single `PageTitle` H1.
The default layout already owns `<main>`, the header and the footer.

Keep `useI18n()` for page content and use `useHead(usePageSeo('pageName'))` for metadata.
Import `ImageSource` and `PageNavigation` with `import type` when used.
Derive translated image arrays with `computed<ImageSource[]>(() => ...)` and translated navigation objects with `computed<PageNavigation>(() => ...)`.
Templates unwrap these computed values automatically.
Populate `src`, `title`, `mobileTitle` and descriptive `alt` for each artwork.
Include painting `dimensions` only when confirmed; omit unknown dimensions and ceramic dimensions rather than inventing measurements.

Add matching page and picture entries to both locale files using the i18n skill.
Implement metadata through the SEO skill: register the page, measured social image and sitemap artwork, then add bilingual `seo.*` messages.
Preserve the selected representative artwork and register relevant existing topic-label keys as `keywordKeys` for semantic structured data.
App icons remain shared; do not override the touch icon with gallery artwork.
Check whether the chosen image consumer needs an entry in `generateImageRoutes.ts` using the artwork-assets skill.

Keep page styles scoped and preserve the normal gallery spacing unless the requested layout requires an adjustment:

```scss
.gallery-page {
  position: relative;
  width: 100%;

  .page-header {
    margin-bottom: 50px;
  }
}
```

## Connect Navigation

Update only the matching category path in `app/data/navigation.ts` to the unprefixed page path.
Preserve its mutable mobile expansion state and existing translated labels.
Menu entries using `/wip` render as disabled labels; a valid new URL makes that entry navigable.
`PageNavigation` localizes its own `path` prop, so pass paths without `/fr` or `/en`.

Determine adjacent pages from the existing sequence and the requested category.
Update neighboring links only when they represent that slot; do not replace every `/wip` occurrence or impose a new ordering.
Use `/wip` with the existing `wip.previous_page_*` or `wip.next_page_*` messages for unavailable neighbors.
Either navigation prop may be omitted when that direction is unnecessary.

## Verification And Review

| Area          | Evidence to collect                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Collection    | Requested artwork appears once in its intended group and order; exact public paths exist                                        |
| Translations  | Both locales parse and contain every affected literal and generated key, including metadata and image fields                    |
| Metadata      | One effective title, description and canonical; correct FR/EN alternates, French `x-default` and truthful social-image metadata |
| Navigation    | Correct desktop/mobile menu entry, valid adjacent destinations and working language switching                                   |
| Rendering     | Direct FR/EN visits and client navigation; visible artwork and captions at mobile and desktop widths                            |
| Viewer        | Open, zoom, fit, close, focus return and restored scroll position for affected interactions                                     |
| Static output | Run `yarn generate` when adding routes or changing asset delivery and inspect the relevant generated pages and image URLs       |

Run `yarn lint` for implementation changes.
Check at least 320px, 375px, 768px and 1280px widths for gallery UI changes, including a short mobile viewport and longer English text.
Do not infer a successful gallery from SSR HTML alone: `ImageGrid` initially renders a skeleton and calculates rows in the browser.
When reviewing, report actionable findings with severity, file location, user impact and supporting evidence.
Separate confirmed issues from checks that could not be performed, and avoid treating `/wip` or optional dimensions as defects by themselves.
