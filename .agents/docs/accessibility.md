# Accessibility maintenance

Use WCAG 2.2 AA as Atelier Libr'Émotions' accessibility review target across French and English.
This document records source ownership, observed limitations and the manual checks needed before making a conformance claim.
Implementation details and scoped browser checks do not certify full-site conformance.

## Current source and ownership

| Area                    | Owner                                                                                                                                                        | Observed implementation and limitation                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landmarks and bypass    | [default.vue](../../app/layouts/default.vue), [Header.vue](../../app/components/layout/Header.vue)                                                           | One focusable main landmark and a localized, focus-visible skip link positioned over the header logo                                                           |
| Headings                | [PageTitle.vue](../../app/components/common/PageTitle.vue) and individual pages                                                                              | `PageTitle` supplies an H1; check pages that use a different shell separately                                                                                  |
| Gallery trigger         | [ImageGridItem.vue](../../app/components/common/ImageGridItem.vue)                                                                                           | Native named button with Enter/Space, dialog intent, an inset two-color focus indicator and visible failure feedback                                           |
| Viewer                  | [ImagePreviewModal.vue](../../app/components/common/ImagePreviewModal.vue)                                                                                   | Native modal dialog with focus containment, close-button entry, Escape, trigger return, zoom/pan controls and same-group artwork navigation                    |
| Menu                    | [Menu.vue](../../app/components/layout/Menu.vue), [MenuLinks.vue](../../app/components/layout/MenuLinks.vue)                                                 | Native disclosure buttons with expanded/controls relationships, desktop Escape/outside/focus-leave dismissal and a native mobile modal with accordion sections |
| Language                | [LangSwitcher.vue](../../app/components/common/LangSwitcher.vue)                                                                                             | Compact named locale links delegate preference handling to Nuxt I18n; no custom localStorage or cookie writes                                                  |
| Navigation continuity   | [navigation-focus.client.ts](../../app/plugins/navigation-focus.client.ts), [router.options.ts](../../app/router.options.ts)                                 | Completed route/hash navigation focuses its destination; scrolling restores history and clears the measured sticky header                                      |
| Motion                  | [Lenis plugin](../../app/plugins/smooth-scroll.client.ts), [default.scss](../../app/styles/default.scss)                                                     | CSS motion and wheel/route scrolling respect reduced motion; the unchanged home rotation still needs a separate pause/stop review                              |
| Entry and timed artwork | [Welcome.vue](../../app/components/common/Welcome.vue), [TextTyping.vue](../../app/components/common/TextTyping.vue), [home page](../../app/pages/index.vue) | Two-second decorative intro dismisses on interaction without taking focus; typing respects reduced motion; home artwork still rotates on its existing timer    |
| Scroll locking          | [overlay-scroll-lock.client.ts](../../app/plugins/overlay-scroll-lock.client.ts), [useOverlayScrollLock.ts](../../app/composables/useOverlayScrollLock.ts)   | Independent menu/viewer leases preserve previous inline styles and scroll position; the last release restores Lenis                                            |
| CV                      | [CV page](../../app/pages/about/cv/index.vue)                                                                                                                | Desktop iframe has a translated title; touch devices receive image previews and a download link                                                                |

These observations identify areas to inspect when working on the relevant component.
They are not a complete inventory of defects, and they do not establish that every page has the same heading, focus or contrast behavior.
See [the style and layout review](../../STYLE_LAYOUT_REVIEW.md) for historical findings and the implemented migration.

## Shared layout contract

The desktop menu is disclosure navigation, not an ARIA application menu; native links and normal Tab order remain available.
ArrowDown on a section enters its panel, Escape returns to the section, and explicit close controls are available without hover.
All layout action targets are at least 44 CSS px high, with visible focus and translated names.
Planned `/wip` labels remain non-focusable and are explained by a visible note.
The mobile native dialog provides modal semantics, background inertness, focus containment and Escape/close dismissal.
Its horizontal leave transition keeps the dialog modal and the page locked until completion while the new page renders behind it.
Links navigate immediately; only destination focus and viewport scrolling await the shared overlay release.
Mode changes and unmount close immediately.
Closing desktop panels become inert immediately while fading out.
Its non-scrolling header keeps the close control available while accordion content scrolls.
The same dialog serves viewports no taller than 400px, preventing desktop panels from obscuring focus on short, text-enlarged screens.
The inset header is non-sticky at short viewport heights; the footer wraps instead of using a fixed height.
Safe-area insets add to normal gutters; the footer distributes desktop controls and centers compact contents with symmetric side clearance and bottom home-indicator padding.
The decorative Welcome surface is hidden from assistive technology and never takes focus or locks scrolling.
It renders with the server markup before typing begins, and a scripting-disabled CSS fallback hides it without blocking page content.
It dismisses immediately on pointer, key or focus interaction, and the standalone typing component exposes a single complete text alternative.
The custom scrollbar has a dark thumb boundary, a standard-color fallback and a native forced-colors reset.
Scrollbar presentation is hidden during Welcome without locking scrolling.
Native scrollable overlays use `data-lenis-prevent` so stopped Lenis does not cancel their touch gestures.
Menu links render through normal NuxtLinks, with no route queue or capture-phase interception.
Menu border frames match the logo at 727px (30px) while the transparent action target remains 44px.
The root reserves no idle scrollbar gutter; overlays temporarily preserve only space occupied by a real scrollbar.
The corrected language switcher preserves compact FR/EN pill frames inside 44px transparent hit areas.
Language attributes, current-locale indication and contrast remain; Nuxt I18n owns its own preference cookie without parallel component storage.

## Common-component contracts

| Component                     | Accessible contract                                                                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                      | Native `type="button"`, forwarded control attributes, disabled state, 44px minimum height, wrapping and visible focus without resetting outlines                     |
| `LangSwitcher`                | Compact visual frames inside native 44px locale-link targets; current-language state, `lang`/`hreflang`; no component persistence logic                              |
| `PageNavigation`              | Named navigation only when a neighbor exists; decorative arrows, wrapping text and localized destinations                                                            |
| `PageTitle`                   | One H1 with a paragraph subtitle, fluid rem-based type and long-word wrapping                                                                                        |
| `TextBlock` / `TextSection`   | Typed variants/props; optional `headingLevel` from 2 to 6, defaulting to the existing H3; semantic blockquotes, hidden quotation decoration and readable accent text |
| `TextSection`                 | Tab-focusable sections with instance-specific heading IDs and visible focus; date badges stay in reading flow; original copper badge surfaces are retained           |
| `Logo` / `PageHeaderOrnament` | Localized logo alternative, square intrinsic dimensions and proportional sizing; ornament hidden from assistive technology                                           |
| `Image` / `ImageGridItem`     | Nonempty authored image alternatives, localized action names and visible image-failure states                                                                        |

Heading defaults preserve existing consumers; page authors still own the surrounding outline.
This component task does not certify existing page heading sequences or authored alternatives.
Mobile artwork action names include the visible compact identifier as well as the full title.
Captions sit below the artwork on narrow/coarse-pointer screens, without a tinted overlay.
Desktop captions use a restrained feathered gradient, appearing on hover or keyboard focus.
The image enlarges only to 1.04 on fine-pointer hover or keyboard focus, with the 0.65s easing and reduced-motion gate owned by the gallery/tile.
The inset white/dark focus ring is 4px per color and remains inside the image's clipping boundary.
The frame receives the existing rounded row height through `--artwork-height`; captions remain in natural flow inside the same native button.
This preserves image dimensions, keeps caption taps operable and allows enlarged or multiline labels to grow without overlapping the next row.

### Artwork viewer

The browser-native dialog supplies background inertness and Tab/Shift+Tab containment; there is no competing custom focus trap or document key listener.
Close receives initial focus; Escape works from controls and the image region.
The title wraps rather than adding a second scrolling heading.
The panel uses header / flexible image / toolbar / details rows; normal viewports need no panel scrollbar.
Only content that genuinely exceeds a short or text-enlarged viewport uses the panel's single native scroll region, with close retained in a sticky header.
Gutters include safe-area insets; the backdrop retains its dark surface and adds blur without replacing the existing white viewer design.
Blur belongs to a child scrim inside the same fading dialog as the panel; the native `::backdrop` is transparent so blur cannot lead or trail the visible transition.
The scroll lease remains held through the leave transition and releases on dismissal or unmount without unlocking another overlay.
Focus returns with `preventScroll` to the original artwork, including a replacement trigger if gallery resizing remounted it.
The grid supplies the actual activating button as `opener`, rather than assuming touch browsers focus a button on tap.

The grid passes its ordered `images` directly to the viewer.
The viewer emits `select`, and the grid retains selection ownership; there is no per-app tile registry or plugin.
Previous/next buttons, Left/Right outside the range/image-pan context and horizontal swipes at fit size cycle within the same group.
Only the current title is politely announced; there is no visible artwork counter or instruction paragraph.
Standalone viewers without an image sequence retain single-image behavior.

Zoom remains 100–300%, with the existing logarithmic native range and fit action.
Zoom-in/out buttons, wheel zoom around the pointer, `+`/`-` and `0` are alternatives; browser Ctrl/Meta-wheel zoom remains native.
Previous, zoom/range/fit and next share one responsive control band; the central zoom group uses two rows on narrow screens.
There is no directional pan toolbar.
Above fit size, clicking a detail centers it without changing zoom, providing a single-pointer alternative to dragging; arrow keys and pointer-captured dragging also pan.
The native stage scrollbar presentation is hidden, not its scrolling behavior; click-to-center and keyboard access prevent dependence on hidden scrollbar dragging.
A short screen-reader hint describes click-to-center; fit remains a named button.
Two-contact gestures zoom around a stable image anchor while translating the pinch midpoint.
One-contact fit-size swipes require at least 50px horizontal travel, 1.5× horizontal dominance and less than 800ms; zoomed drags never navigate.
Gesture ownership is confined to the image stage (`touch-action: none`); browser zoom remains available elsewhere.
Cancellation, source changes, dismissal and unmount reset captures and invalidate pending zoom work.
A separate trailing-click guard survives source resets after a swipe; a fresh pointer gesture clears it so the next real tap still zooms.
The stage uses measured contain geometry and a cleaned-up ResizeObserver.

Loading is announced after 300ms with a dedicated plum shimmer (110deg, 20/50/80% stops, 200% background, 1.8s ease-in-out).
This loader is confined to the viewer; the grid's existing skeleton and animation are unchanged.
Image errors are exposed as status text, and zoom is disabled until an image loads.
Retry remounts the same source and keeps focus in the image region.
Stale image events are ignored by element identity; close and previous/next remain available during failure.
Gallery aspect measurement now uses `window.Image` and the same source/origin as native tiles.
Never prefix public artwork with the configured SEO/I18n origin: localhost is not the visitor's server when testing on another device, and production is not a preview origin.
At an unchanged width, translated metadata is refreshed in rows and snapshots without rerunning size calculations.
Changing source identities invalidates the input cache; row heights, aspect-based sizing, gaps and stabilization formulas remain unchanged.
Native tiles check cached images and ignore stale events by image identity.
The optimized `Image` wrapper remounts NuxtImg on source changes and scopes emitted load/error callbacks to that source; a failed full-resolution preload is not reported as a successful compressed image.

## Layout verification

These are scoped checks in the VS Code Chromium browser, not a full-site conformance audit.

| Coverage               | Recorded result                                                                                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Responsive shell       | FR/EN contact at 320, 375, 430, 640, 768, 769, 900, 1024, 1280 and 1536px as applicable; no page-level horizontal overflow                                                                                                                    |
| Shared consumers       | Home, approach, development, CV, contact, acrylic, oil, porcelain and WIP in both locales at 320/1280px: one main and no horizontal overflow in all 36 cases                                                                                  |
| Menu and keyboard      | All four desktop disclosures, ArrowDown, Tab, focus-leave/outside dismissal and Escape; mobile Enter/Space, forward/reverse focus containment, blocked background focus and Escape from all ten visible controls in an expanded painting menu |
| Short screens and text | Scrollable 667x320 dialog; 200% root text at narrow/intermediate/desktop widths, including 769x320, 1280x360 and 769x401; focused links and close controls remained visible                                                                   |
| Touch and locale       | Chromium touch emulation opened the menu, expanded the artist section and followed the CV link; FR/EN URL, HTML language, preference cookie/local storage, captions and menu-close state stayed aligned                                       |
| Scroll and focus       | Skip link, destination main focus, history return to 500px after gallery measurement, menu/viewer scroll restoration and nested lease release checked                                                                                         |
| Contrast and motion    | Navigation text/selected/focus color pairs measured at 5.25:1 or greater; keyboard focus outlines inspected; CSS and route/wheel reduced-motion branches verified in source and emulation                                                     |
| Tooling                | Formatting, type checking, lint, bilingual layout-key/placeholder parity and local documentation links checked; each shared keyframe emitted once in compiled CSS                                                                             |
| Production SSR         | Server build with prerendering excluded only through in-memory validation overrides completed; local FR/EN HTTP 200 responses and hydrated mobile/desktop navigation checked                                                                  |

## Semantics and accessible content

Use native links for navigation and buttons for actions, with `type="button"` where submission is unintended.
Keep DOM order consistent with the visible reading order and avoid positive `tabindex` values.
Each page using the default layout shares its main landmark; do not add a nested main.
Maintain one page H1 and logical group headings, and provide a meaningful bypass destination when adding a skip link.

Give controls translated names that describe the action or destination.
Keep useful visible labels rather than substituting hidden text or tooltip-only instructions.
Icon-only controls need accessible names; icons accompanying a complete text label can be decorative.
Every rendered image must have informative nonempty localized alt text, including logos and unavailable-image placeholders.
Use CSS backgrounds or `aria-hidden` interface icons for decoration, not empty-alt images.
Do not infer artwork details solely from filenames or repeat entire page descriptions in every image alternative.
Follow [content-direction.md](content-direction.md) for wording and [the i18n skill](../skills/i18n/SKILL.md) for FR/EN parity.

## Focus, menus and viewer

| Journey          | Required behavior to verify                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| Keyboard entry   | A visible focus path reaches navigation, page actions, artwork triggers and footer controls                     |
| Menu opening     | Native operable toggle, correct expanded state, understandable controlled content and no focus in hidden items  |
| Menu dismissal   | Reachable close action, Escape behavior and sensible focus after navigation or cancellation                     |
| Viewer opening   | Enter/Space can open the selected work; focus moves into the named dialog                                       |
| Viewer operation | Tab and Shift+Tab remain contained; close, zoom and fit are reachable and named                                 |
| Viewer dismissal | Escape and close work; focus returns to the trigger and the previous scroll position is restored                |
| Navigation       | Route, locale and anchor changes leave focus and the viewport at a useful location                              |
| Cleanup          | Unmounting or changing routes removes listeners and restores scrolling without unlocking another active overlay |

The viewer adds same-group artwork navigation without changing the grid's selection contract.
Preserve native arrow-key behavior for the zoom range; arrows inside a zoomed image region pan instead of changing artwork.
Check background interaction as well as focus containment; `aria-modal="true"` alone does not implement either.

## Readability, contrast and motion

Measure text, icons, control boundaries and focus indicators against actual backgrounds, including image overlays, gradients and selected states.
Token names and screenshots do not establish contrast compliance.
Preserve visible focus and avoid relying on color, hover or a gesture alone to communicate an action.
Aim for comfortable standalone control targets of about 44 by 44 CSS px where practical and verify spacing between adjacent actions.
This touch-usability target is not a statement that every WCAG AA target criterion requires that exact size.

Check text at 200% enlargement and narrow layouts for clipping, overflow and obscured focus.
Keep browser zoom enabled and account for sticky headers, mobile toolbars and safe areas.
Honor reduced motion in CSS animation, timed presentation and JavaScript scrolling when those behaviors change.
Keep pause or stop behavior available for applicable ongoing automatic motion.
Avoid animated focus restoration that moves a visitor unexpectedly.

## Manual release audit

| Coverage              | What to record                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Locales               | Both FR and EN, including captions, viewer labels, metadata-related names and longer text         |
| Viewports             | 320x568, 375, 430, 768, 1024 and 1280px+, relevant landscape layouts and enlarged text            |
| Keyboard              | Tab/Shift+Tab, Enter/Space, Escape, range-input arrows, focus visibility and return               |
| Overlays              | Open/close sequences, short screens, background interaction, route changes and scroll restoration |
| Mobile browsers       | iOS Safari and Android Chrome when available, with touch and native scrolling                     |
| Assistive technology  | Available VoiceOver/Safari, TalkBack/Chrome and desktop NVDA/Firefox or Chrome coverage           |
| Appearance and motion | Measured contrast, reduced-motion settings, loading and image-failure states                      |

Use automated checks, accessibility-tree inspection and contrast tools as supporting evidence.
They do not replace keyboard, screen reader or real-device testing.
Record browser/device, locale, viewport, input method, journey, outcome and any unavailable coverage.
Report source findings separately from runtime failures and never claim full WCAG conformance from lint, a build or an automated score.

Use [the accessibility skill](../skills/accessibility/SKILL.md) for the scoped audit or implementation workflow.
For documentation-only changes, validate the guides and links; application or interaction changes need the relevant repository checks and manual journey coverage.

## Reference

Use the [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) to select the actual success criteria for a finding rather than assigning a criterion from memory.
