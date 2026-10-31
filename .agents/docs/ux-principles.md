# Atelier Libr'Émotions — UX principles

Help visitors discover the artist, explore painting and ceramics, inspect a work and make contact.
Use [brand-context.md](brand-context.md) for identity and [design-system.md](design-system.md) for visual implementation.
This guide describes current journeys and acceptance criteria; it does not claim they have passed a browser audit.

## Current journeys

| Intent                       | Existing route or owner                                                                                                                   | What to preserve                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Discover the artist and work | [home page](../../app/pages/index.vue)                                                                                                    | Site identity, painting/ceramic introduction, artwork and clear exploration actions |
| Browse a technique/category  | [navigation.ts](../../app/data/navigation.ts), [Menu.vue](../../app/components/layout/Menu.vue) and [gallery pages](../../app/pages/)     | One ordered section, technique and category catalogue on both desktop and mobile    |
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
Desktop section buttons explicitly disclose a grouped panel; hover is not required and moving the pointer cannot dismiss it.
Tab follows document order, ArrowDown enters an opened panel, Escape returns to its section button, and focus leaving navigation or an outside pointer dismisses the panel.
Each panel has its own close control and scrollable grid; planned categories are explained in visible text.
On mobile, a native modal dialog retains the accordion hierarchy, contains focus and makes the underlying document inert.
Its close header remains reachable while the content scrolls, including on short screens.
Closing a mobile dialog restores its invoking control; route navigation then focuses the destination main.
The horizontal mobile enter/leave transition keeps background interaction blocked until dismissal finishes.
Desktop panels use a short fade/slide and become inert as soon as closing starts.
Normal mobile menu-link activation navigates immediately, with the menu sliding away over the destination without an extra background tint.
Normal NuxtLinks supply their own valid localized href and current-page state.
Native Enter activation does not require a custom widget or intercepted navigation.
Modified clicks keep native new-tab/window behavior.
Current-page links dismiss the menu, viewport-mode changes close immediately, and reduced motion disables transitions.
Resizing across the 768px width or 400px height menu threshold dismisses open navigation and keeps focus on a visible control.
Short landscape screens use the full-screen dialog instead of squeezing desktop panels below a tall header.
Header and footer grow with text rather than clipping it; the inset header stops sticking on very short landscape screens.
Safe-area insets add to header/main/menu gutters; the footer spreads desktop controls across its width and keeps centered compact wrapping with symmetric safe-area clearance.
The shared catalogue lives in `app/data/navigation.ts`; update it once rather than maintaining separate desktop/mobile link lists.
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
The [style and layout review](../../STYLE_LAYOUT_REVIEW.md) preserves historical concerns and records the shell migration separately.

## Loading, motion and failure

Prioritize page identity, useful text, navigation and the artwork needed for the current view.
Keep decoration from blocking interaction or forcing visitors to wait before exploring.
The shared shell preserves its two-second Welcome/typing introduction on layout mount, not on every client-side route change.
Welcome is already visible in the initial server markup; text begins typing after mount rather than revealing the loading page before the introduction.
When scripting is disabled, CSS hides the decorative surface and keeps native scrollbars available.
It is decorative, does not take focus or lock scrolling, and dismisses instantly on pointer, keyboard or focus interaction without swallowing that action.
Reduced motion shows the full intro text without typing and removes the fade.
Welcome keeps its logo beside the text and temporarily hides the scrollbar's presentation without locking the document.
Home artwork indices change on a five-second timer; review pause and reduced-motion behavior if that interaction is changed.

`ImageGrid` initially renders a skeleton and measures artwork in the browser.
SSR HTML alone does not establish that a gallery is usable, that all images loaded or that captions update after language switching.
Check loading failures and a slow connection when changing image behavior, using [the artwork-assets skill](../skills/artwork-assets/SKILL.md).
Describe unavailable content clearly and offer an existing recovery destination rather than a dead end or a fictional retry action.

## Focus and scroll continuity

Keep the visitor's place when opening and closing artwork.
Focus should reach the dialog on open and return to an operable trigger on dismissal.
Route and language changes should leave visitors at a meaningful, visible location.
`router.options.ts` owns destination scrolling and history restoration through Lenis; `navigation-focus.client.ts` moves focus after completed route or hash navigation.
History restoration allows up to three seconds for measured gallery rows to replace their shorter skeleton.
The wait ends when the saved position is reachable and cancels on user input, further navigation or unmount; shortened content receives the closest available position.
The layout's skip link explicitly focuses the shared main.
`useSiteNavigation()` closes navigation from links, language changes and route changes.
Mobile navigation and the viewer acquire independent scroll leases, so releasing one does not resume a still-locked page.
The viewer's `data-lenis-prevent` region allows native vertical and horizontal touch scrolling while the page's Lenis instance is stopped.
The shared lock owns previous body/root styles and scroll position; only the final overlay release restarts a previously running Lenis instance.
Route focus and viewport scrolling await `overlayScroll.whenUnlocked()` so the closing modal cannot reject focus or restore the old position after navigation scrolls.
This does not delay routing or destination rendering.
The resting root reserves no scrollbar space on short pages; only an existing gutter is temporarily retained while an overlay is locked.
The lock preserves the document height and real viewport offset while the body is fixed, so immediate routing still records the correct Back position.
The additional wait in the smooth-scroll plugin is specific to asynchronous gallery measurement, not a second scrolling system.
It runs only for saved-position restoration and cancels on input/navigation/unmount, preventing Back from being clamped to the shorter skeleton.
Use [accessibility.md](accessibility.md) for keyboard, overlay and reduced-motion requirements.

## Verification

Exercise each affected journey in French and English, including direct visits and client-side navigation.
For shared UI changes, cover the different pages and states that consume it.
Use desktop emulation for responsive checks, and test iOS Safari and Android Chrome when available for mobile compatibility.
Record the browser/device, locale, viewport, input method, journey and result.
Report unavailable device, assistive-technology or network coverage instead of treating a build or screenshot as a complete UX pass.
