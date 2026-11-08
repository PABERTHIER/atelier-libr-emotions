---
name: artwork-assets
description: Add, replace or troubleshoot Atelier Libr'Émotions artwork assets, filename mappings, native image delivery and static public files. Use when artwork files, image consumers or static deployment image behavior change.
---

# Atelier Artwork Assets

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Identify the actual image consumer before changing delivery or display behavior.
Use [artwork naming](../i18n/references/artwork-naming.md) when mapping collections to public directories and translation keys.
For image framing or visual presentation changes, use [design system](../../docs/design-system.md).
For social metadata or sitemap discovery, use [SEO maintenance](../../docs/SEO.md) only when that concern is part of the task.

## Delivery Map

| Consumer                   | Source                                                                          | Delivery                                                             | Prerender implication                                          |
| -------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| Gallery tiles              | [ImageGridItem.vue](../../../app/components/common/ImageGridItem.vue)           | Native `<img>` using `ImageSource.src`                               | Original public file                                           |
| Gallery aspect measurement | [ImageGrid.vue](../../../app/components/common/ImageGrid.vue)                   | Browser `window.Image()` using the tile's same source/current origin | Original must load with its measured dimensions                |
| Enlarged artwork           | [ImagePreviewModal.vue](../../../app/components/common/ImagePreviewModal.vue)   | Native `<img>` using `image.src`                                     | Original public file                                           |
| Standalone `Image`         | [Image.vue](../../../app/components/common/Image.vue)                           | Native `<img>` with intrinsic dimensions and an optional skeleton    | Original public file; CSS owns display sizing                  |
| Standalone preview         | [ImagePreviewButton.vue](../../../app/components/common/ImagePreviewButton.vue) | Named button around `Image`, with visible failure feedback           | The same original opens in the existing modal                  |
| Direct social image        | `pageSeo.image` and `imageDimensions`                                           | Absolute URL to original artwork                                     | Verify public file and its real MIME type and pixel dimensions |

## File Handling

Use supplied WebP artwork and preserve filenames, casing, aspect ratios and requested order.
Reference `public/paintings/...` as `/paintings/...` and `public/ceramics/...` as `/ceramics/...`.
Do not add a `/public` prefix or a locale prefix to image URLs.
Check grouped asset folders rather than assuming one directory level per route segment.
Do not rename, crop, convert, replace or remove artwork merely to normalize a naming convention.
Keep existing JPEG, GIF, SVG and document assets when their consumers still need them.
Native delivery does not convert missing sources or create alternate formats.

Confirm each requested file exists with exact case, including gaps in numbered series.
Use explicit filename-to-key mappings when a series is irregular.
Read or inspect an image before making visual claims about it.
Keep physical painting dimensions in translated artwork metadata separate from raster pixel dimensions used for social cards or layout.
Do not estimate physical dimensions from image proportions.

When replacing or removing an asset, search page arrays, dynamic filename patterns, locale descriptions, the dimension catalog, metadata, menu previews and root configuration.
Update the affected references together and preserve unrelated artwork.

## Native Images And Static Output

Gallery row heights of `120`, `160`, `220` and `300` are layout inputs; responsive CSS does not require duplicate files at each display width.
All consumers use original files from `public/`, copied by Nuxt into build and generated output.
There is no image provider, route generator or custom image-prerender configuration.
Use current-origin public paths; do not prefix native requests with the configured SEO/I18n origin.
A production/canonical URL is not a LAN or preview asset origin.

`Image` requires `src` and localized `alt`, looks up intrinsic width/height in `imageDimensions` and accepts explicit dimensions when needed.
It defaults to `loading="lazy"`; use eager loading for the principal visible images, as on Contact, CV, WIP and the home collage.
`skeleton` defaults to true and appears only after 150ms while loading; cached completion, source changes and unmount clear the timer.
The skeleton leaves the native image visible for progressive loading and scripting-disabled use.
Keep display sizing, frames and aspect ratios with the consuming page/component.

`ImagePreviewButton` owns standalone preview semantics and localized failure feedback, including cached checks and stale-element rejection.
`useImagePreview()` connects each page's ordered images and actual opener to `ImagePreviewModal`; retry and zoom belong to the modal.
The home `Carousel` owns its three sequences and frames; its modal browses the clicked group without changing the collage behind it.
Changing viewport width resizes native images through CSS without remounting successful images merely to choose another width.

WIP keeps the original GIF and a 640×266 still WebP, with matching intrinsic dimensions.
Initial markup uses the still; mounted motion-preference changes select GIF or still automatically.
Validate original-file availability in generated output and through HTTP, including assets revealed after interaction.

## Verification

| Change                 | Check                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Add gallery artwork    | Original paths, intended order, all affected FR/EN picture fields and successful gallery/viewer loading      |
| Add standalone image   | Original `src`, intrinsic dimensions, CSS proportions, loading priority, skeleton and preview/error behavior |
| Replace social image   | Absolute URL, image description, actual content type, width and height using [seo](../seo/SKILL.md)          |
| Remove or rename asset | No affected literal or generated references remain unresolved                                                |
| Change delivery        | `yarn generate`, relevant output files and HTTP image requests from a local static preview                   |

Open interactions that reveal images, including desktop/mobile menu previews when affected.
Inspect network failures and content types in addition to the visible image.
Report unresolved missing files or unavailable deployment verification explicitly.
