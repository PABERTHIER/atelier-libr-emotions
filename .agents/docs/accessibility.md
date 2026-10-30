# Accessibility maintenance

Use WCAG 2.2 AA as Atelier Libr'Émotions' accessibility review target across French and English.
This document records source ownership, observed limitations and the manual checks needed before making a conformance claim.
The observations below come from source inspection on 27 October 2026, not a completed browser, contrast or screen reader audit.
Adding this guide does not fix or certify the implementation.

## Current source and ownership

| Area                      | Owner                                                                                                                         | Observed implementation and limitation                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landmarks and bypass      | [default.vue](../../app/layouts/default.vue)                                                                                  | Supplies the shared main landmark; no skip link is present in that layout                                                                                   |
| Headings                  | [PageTitle.vue](../../app/components/common/PageTitle.vue) and individual pages                                               | `PageTitle` supplies an H1; check pages that use a different shell separately                                                                               |
| Gallery trigger           | [ImageGridItem.vue](../../app/components/common/ImageGridItem.vue)                                                            | Artwork opens from a clickable `div` without native button keyboard behavior                                                                                |
| Viewer                    | [ImagePreviewModal.vue](../../app/components/common/ImagePreviewModal.vue)                                                    | Has a named dialog, Escape handling, a focus trap, initial close-button focus and focus-return logic; actual return depends on an operable invoking control |
| Menu                      | [Menu.vue](../../app/components/layout/Menu.vue)                                                                              | Desktop headings receive focus; mobile toggles use click handlers and the source does not expose expanded state or an Escape handler                        |
| Language                  | [LangSwitcher.vue](../../app/components/common/LangSwitcher.vue)                                                              | Named locale links and current-language indication exist; URL, locale, cookie and stored preference need joint testing                                      |
| Motion                    | [Lenis plugin](../../app/plugins/smooth-scroll.client.ts), [layout](../../app/layouts/default.vue), home and component styles | No reduced-motion branch was found in the inspected Lenis plugin or global smooth-scroll rule                                                               |
| Welcome and timed artwork | [Welcome.vue](../../app/components/common/Welcome.vue), [home page](../../app/pages/index.vue)                                | Two-second welcome timer and five-second artwork changes need interaction and motion review                                                                 |
| Scroll locking            | Menu, viewer and default layout                                                                                               | Both menu and viewer manipulate `body.no-scroll`; the viewer also changes body/root inline styles                                                           |
| CV                        | [CV page](../../app/pages/about/cv/index.vue)                                                                                 | Desktop iframe has a translated title; touch devices receive image previews and a download link                                                             |

These observations identify areas to inspect when working on the relevant component.
They are not a complete inventory of defects, and they do not establish that every page has the same heading, focus or contrast behavior.
See [the style and layout review](../../STYLE_LAYOUT_REVIEW.md) for the existing overlay, viewport and scroll-lock proposals.

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
