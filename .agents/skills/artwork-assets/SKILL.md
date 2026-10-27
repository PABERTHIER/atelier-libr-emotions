---
name: artwork-assets
description: Add, replace or troubleshoot Atelier Libr'Émotions artwork assets, filename mappings, native image delivery and Nuxt Image IPX prerender routes. Use when artwork files, image consumers or static deployment image behavior change.
---

# Atelier Artwork Assets

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Identify the actual image consumer before changing prerender configuration.
Use [artwork naming](../i18n/references/artwork-naming.md) when mapping collections to public directories and translation keys.
For image framing or visual presentation changes, use [design system](../../docs/design-system.md).
For social metadata or sitemap discovery, use [SEO maintenance](../../docs/SEO.md) only when that concern is part of the task.

## Delivery Map

| Consumer                   | Source                                                                        | Delivery                                             | Prerender implication                                          |
| -------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| Gallery tiles              | [ImageGridItem.vue](../../../app/components/common/ImageGridItem.vue)         | Native `<img>` using `ImageSource.src`               | Original public file; no resized IPX variant                   |
| Gallery aspect measurement | [ImageGrid.vue](../../../app/components/common/ImageGrid.vue)                 | Browser `Image()` using configured origin plus `src` | Original must load; no inferred IPX sizes                      |
| Enlarged artwork           | [ImagePreviewModal.vue](../../../app/components/common/ImagePreviewModal.vue) | Native `<img>` using `image.src`                     | Original public file                                           |
| Standalone `Image`         | [Image.vue](../../../app/components/common/Image.vue)                         | `NuxtImg` with sizes, densities and placeholder      | Verify emitted IPX `src`, `srcset` and placeholder requests    |
| Direct social image        | Page `ogImageEndPath`                                                         | Absolute URL to original artwork                     | Verify public file and its real MIME type and pixel dimensions |
| Explicit image routes      | [generateImageRoutes.ts](../../../app/utils/generateImageRoutes.ts)           | Enumerates IPX transforms                            | Consumed by `nitro.prerender.routes` in `nuxt.config.ts`       |

## File Handling

Use supplied WebP artwork and preserve filenames, casing, aspect ratios and requested order.
Reference `public/paintings/...` as `/paintings/...` and `public/ceramics/...` as `/ceramics/...`.
Do not add a `/public` prefix or a locale prefix to image URLs.
Check grouped asset folders rather than assuming one directory level per route segment.
Do not rename, crop, convert, replace or remove artwork merely to normalize a naming convention.
Keep existing JPEG, GIF, SVG and document assets when their consumers still need them.
Configured output formats do not prove an automatic fallback or conversion exists for a missing source.

Confirm each requested file exists with exact case, including gaps in numbered series.
Use explicit filename-to-key mappings when a series is irregular.
Read or inspect an image before making visual claims about it.
Keep physical painting dimensions in translated artwork metadata separate from raster pixel dimensions used for social cards or layout.
Do not estimate physical dimensions from image proportions.

When replacing or removing an asset, search page arrays, dynamic filename patterns, locale descriptions, metadata, menu previews, root configuration and prerender entries.
Update the affected references together and preserve unrelated artwork.

## IPX And Static Output

Gallery row heights of `120`, `160`, `220` and `300` are layout inputs, not a list of required IPX image widths.
Do not register every native gallery image in `imagesConfig` merely because it appears in an `ImageGrid`.
Register transformed images when their `NuxtImg` consumer requires explicit static coverage, particularly content revealed only in menus or after interaction.
Reuse existing entries for the same path rather than duplicating them.

The current helper emits these route shapes for each configured size:

```text
/_ipx/w_{size}{imagePath}
/_ipx/w_{size}&dpr_2{imagePath}
/_ipx/q_50&blur_3&s_10x10/{imagePath}
```

Treat these as the helper's current output, not a guarantee that they match every installed Nuxt Image transformation.
The placeholder string adds `/` before an `imagePath` that already starts with `/`; inspect emitted requests and generated files before relying on its coverage.
Likewise, confirm the current `densities` and sizes configuration against actual `srcset` output rather than assuming retina coverage.
Choose sizes from the consumer's responsive image requests, not an old generic size list.
Avoid broad helper changes unless the task concerns image delivery or the change is necessary to deliver the requested image.

Native gallery images need original-file checks; a successful IPX request does not validate those paths.
Conversely, an original file returning 200 does not prove its transformed `srcset` and placeholder variants exist in a static deployment.
Do not rely on an on-demand IPX server when the deployment serves only prerendered files.

## Verification

| Change                 | Check                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Add gallery artwork    | Original paths, intended order, all affected FR/EN picture fields and successful gallery/viewer loading    |
| Add optimized image    | Rendered `src`, every relevant `srcset` candidate, placeholder, density variants and direct full-size link |
| Replace social image   | Absolute URL, image description, actual content type, width and height using [seo](../seo/SKILL.md)        |
| Remove or rename asset | No affected literal or generated references remain unresolved                                              |
| Change delivery        | `yarn generate`, relevant output files and HTTP image requests from a local static preview                 |

Open interactions that reveal images, including desktop/mobile menu previews when affected.
Inspect network failures and content types in addition to the visible image.
Report unresolved missing files or unavailable deployment verification explicitly.
