# Atelier Libr'Émotions — UX principles

Help visitors discover the artist, explore painting and ceramics, inspect a work and make contact.
Use [brand-context.md](brand-context.md) for identity and [design-system.md](design-system.md) for visual implementation.
This guide describes current journeys and acceptance criteria; it does not claim they have passed a browser audit.

## Current journeys

| Intent                       | Existing route or owner                                                                                                                   | What to preserve                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Discover the artist and work | [home page](../../app/pages/index.vue)                                                                                                    | Site identity, painting/ceramic introduction, artwork and clear exploration actions |
| Browse a technique/category  | [Menu.vue](../../app/components/layout/Menu.vue) and [gallery pages](../../app/pages/)                                                    | Section, technique and category hierarchy in both desktop and mobile menus          |
| Inspect an artwork           | [ImageGrid.vue](../../app/components/common/ImageGrid.vue) and [ImagePreviewModal.vue](../../app/components/common/ImagePreviewModal.vue) | Captions, full image, zoom, fit, close and return to the previous place             |
| Understand the practice      | [artistic approach](../../app/pages/about/index.vue) and [development](../../app/pages/about/development/index.vue)                       | Readable artist-authored text and clear page headings                               |
| Read or download the CV      | [CV page](../../app/pages/about/cv/index.vue)                                                                                             | Embedded PDF where supported, touch previews and a direct download                  |
| Contact or follow            | [contact page](../../app/pages/contact/index.vue)                                                                                         | Supplied email, location and social destinations                                    |
| Change language              | [LangSwitcher.vue](../../app/components/common/LangSwitcher.vue)                                                                          | Corresponding FR/EN page, correct URL and consistent translated state               |

The home gallery action currently opens `/painting/acrylic/abstracts`; there is no general `/gallery` overview page.
The shared footer contains language switching, so test reaching it after long galleries and inside the overall page journey.
The menu also contains planned sections and categories that still use `/wip`.
Do not describe those labels as available pages, or invent a shop, event calendar or booking flow.

## Navigation and disclosure

Preserve the technique/category hierarchy instead of exposing every artwork as a top-level destination.
Make current menu entries discoverable with touch and keyboard, using visible labels and understandable expanded states.
Keep a direct contact route and a recognizable way back to the locale home page.
Use meaningful action labels rather than relying on hover decoration or an icon's shape.

Menu entries using `/wip` render as disabled labels.
`PageNavigation` can still link to the work-in-progress page for an unavailable neighbor.
When adding a gallery, update only the relevant menu slot and adjacent links, following [the gallery-page skill](../skills/gallery-page/SKILL.md).
Do not replace all placeholders or infer a new collection order from filesystem sorting.

Match the prominence of actions to the page's purpose.
On the home page, gallery exploration and artist information are the existing primary choices.
On a gallery, the work and its viewer take priority over supporting navigation.
On contact and CV pages, make the actual destination or download obvious.

## Mobile acceptance

Treat the small-screen, touch experience as part of completion for UI changes.
Recompose content for available space rather than simply shrinking desktop typography or hiding essential actions.

| Area        | Acceptance criterion                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Composition | Clear page identity and next action, with no page-level horizontal overflow or clipped captions |
| Artwork     | Intended order and complete composition remain understandable in the grid and viewer            |
| Controls    | Comfortable touch areas, visible labels or accessible names, and no essential hover-only action |
| Menu        | Reachable open/close controls, scrollable content on short screens and clear expanded state     |
| Dialog      | Visible close and fit controls, reachable zoom, contained focus and restored scroll position    |
| Reading     | Comfortable FR/EN wrapping at narrow widths and usable text at 200% enlargement                 |
| Viewport    | Browser toolbars, safe areas and sticky elements do not cover controls or document content      |
| CV          | Touch previews and download work without requiring the desktop PDF embed                        |
| Language    | Page URL and translated labels, captions and metadata stay in agreement                         |

Check at 320x568, 375, 430, 768, 1024 and 1280px or wider, including intermediate widths and landscape when relevant.
The [style and layout review](../../STYLE_LAYOUT_REVIEW.md) records existing height, overlay and scroll-lock concerns; it is a proposal, not proof of a completed migration.

## Loading, motion and failure

Prioritize page identity, useful text, navigation and the artwork needed for the current view.
Keep decoration from blocking interaction or forcing visitors to wait before exploring.
The shared `Welcome` component starts a two-second overlay timer when mounted; inspect its actual journey before changing its scope or timing.
Home artwork indices change on a five-second timer; review pause and reduced-motion behavior if that interaction is changed.

`ImageGrid` initially renders a skeleton and measures artwork in the browser.
SSR HTML alone does not establish that a gallery is usable, that all images loaded or that captions update after language switching.
Check loading failures and a slow connection when changing image behavior, using [the artwork-assets skill](../skills/artwork-assets/SKILL.md).
Describe unavailable content clearly and offer an existing recovery destination rather than a dead end or a fictional retry action.

## Focus and scroll continuity

Keep the visitor's place when opening and closing artwork.
Focus should reach the dialog on open and return to an operable trigger on dismissal.
Route and language changes should leave visitors at a meaningful, visible location.
Do not assume the current scrolling calls also implement route-focus management.
Use [accessibility.md](accessibility.md) for keyboard, overlay and reduced-motion requirements.

## Verification

Exercise each affected journey in French and English, including direct visits and client-side navigation.
For shared UI changes, cover the different pages and states that consume it.
Use desktop emulation for responsive checks, and test iOS Safari and Android Chrome when available for mobile compatibility.
Record the browser/device, locale, viewport, input method, journey and result.
Report unavailable device, assistive-technology or network coverage instead of treating a build or screenshot as a complete UX pass.
