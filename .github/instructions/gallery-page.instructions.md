---
description: 'Use when creating, extending or reviewing Atelier painting and ceramic gallery pages.'
applyTo: 'app/pages/painting/**/*.vue,app/pages/ceramic/**/*.vue'
---

# Gallery Page Instructions

Read and apply [gallery-page](../../.agents/skills/gallery-page/SKILL.md) when creating, extending or reviewing a gallery.
It owns the page shell, grouped collections, menu integration, adjacent-page navigation and verification.
Follow its linked i18n, SEO and artwork guidance for those parts of the task.

Resolve the actual route, picture namespace and public directory using the [artwork naming map](../../.agents/skills/i18n/references/artwork-naming.md).
Verify supplied filenames and curated order, including grouped collections, before generating image entries.
Keep translated images and previous/next navigation reactive, with unprefixed paths for `PageNavigation`.
Update only the matching menu slot in `app/data/navigation.ts` and relevant neighboring pages; unrelated `/wip` entries remain outside the task.

Preserve intentional differences in existing pages unless the request includes converting them to a full gallery.
The standalone oil artwork page is one such difference.

For gallery composition or journey changes, consult [UX principles](../../.agents/docs/ux-principles.md).
Use [content direction](../../.agents/docs/content-direction.md) when writing new collection copy.
Verify both locales and actual browser rendering; the grid's initial SSR skeleton is not evidence that artwork loaded or captions updated.
