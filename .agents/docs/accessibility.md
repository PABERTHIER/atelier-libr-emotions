# Accessibility maintenance

Use WCAG 2.2 AA as Atelier Libr'Émotions' accessibility review target across French and English.
This document records source ownership, observed limitations and the manual checks needed before making a conformance claim.
Implementation details and scoped browser checks do not certify full-site conformance.

## Current source and ownership

| Area                    | Owner                                                                                                                                                        | Observed implementation and limitation                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landmarks and bypass    | [default.vue](../../app/layouts/default.vue), [Header.vue](../../app/components/layout/Header.vue)                                                           | One focusable main landmark and a localized, focus-visible skip link positioned over the header logo                                                           |
| Headings                | [PageTitle.vue](../../app/components/common/PageTitle.vue) and individual pages                                                                              | `PageTitle` supplies an H1; check pages that use a different shell separately                                                                                  |
| Gallery trigger         | [ImageGridItem.vue](../../app/components/common/ImageGridItem.vue)                                                                                           | Artwork opens from a clickable `div` without native button keyboard behavior                                                                                   |
| Viewer                  | [ImagePreviewModal.vue](../../app/components/common/ImagePreviewModal.vue)                                                                                   | Has a named dialog, Escape handling, a focus trap, initial close-button focus and focus-return logic; actual return depends on an operable invoking control    |
| Menu                    | [Menu.vue](../../app/components/layout/Menu.vue), [MenuLinks.vue](../../app/components/layout/MenuLinks.vue)                                                 | Native disclosure buttons with expanded/controls relationships, desktop Escape/outside/focus-leave dismissal and a native mobile modal with accordion sections |
| Language                | [LangSwitcher.vue](../../app/components/common/LangSwitcher.vue)                                                                                             | Named locale links and current-language indication exist; URL, locale, cookie and stored preference need joint testing                                         |
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
Language-switcher design, tooltip and theme work are deferred; the locale links only gained shared navigation-close integration.
The gallery trigger and viewer findings above remain separate page/component work, not silently included in this migration.

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

The current viewer handles one selected image, not a previous/next artwork sequence.
Do not require or claim arrow-key artwork navigation unless that feature is added within the requested scope.
Preserve native arrow-key behavior for the zoom range input.
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
