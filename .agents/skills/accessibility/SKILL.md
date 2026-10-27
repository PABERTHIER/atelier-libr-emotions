---
name: accessibility
description: Audit or improve Atelier Libr'Émotions accessible semantics, keyboard and touch controls, gallery viewer focus, responsive readability and reduced motion across French and English. Use for accessibility work or changes to interactive UI.
---

# Atelier Accessibility

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Read [accessibility maintenance](../../docs/accessibility.md) for current source findings, component ownership and release-audit coverage.
Inspect the affected component, its visible and keyboard states and the pages that consume it.
Use WCAG 2.2 AA as the review target; distinguish desired behavior from verified conformance.
For an audit request, report findings without changing files unless fixes are requested.

## Scope The Change

| Requested work         | Focus                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Audit                  | Inspect source and available runtime states; report evidence and user impact without editing |
| Controls or navigation | Native semantics, names, visible focus, expanded state and complete keyboard behavior        |
| Gallery or viewer      | Operable triggers, contained dialog focus, close/zoom/fit and focus/scroll return            |
| Appearance or motion   | Actual contrast, text enlargement, short viewports and CSS/JavaScript reduced motion         |

Use the maintenance guide to distinguish implemented behavior from acceptance criteria.
Do not copy click-only containers as the pattern for new controls or assume the existing implementation has passed an audit.

## Semantics And Interaction

Use native buttons for actions and links for destinations.
Use `type="button"` for controls that must not submit a form.
Keep DOM order aligned with reading and keyboard order; avoid positive `tabindex` values.
Do not rely on hover, color, drag, zoom gestures or an icon alone to expose an essential action.
Make pointer controls comfortably usable by touch, aiming for 44 by 44 CSS px where practical.
Check spacing between adjacent controls rather than increasing the visual icon size alone.

Provide translated accessible names for icon-only controls.
Hide decorative icons from assistive technology when text already supplies the name.
Use informative alt text for artwork and empty alt text for genuinely decorative images.
Do not repeat a long caption inside a control's accessible name when a short action and artwork identifier suffice.
Preserve native range-input keyboard behavior for viewer zoom.

## Dialogs And Menus

Verify focus moves inside an opened modal, stays within it and returns to the invoking control after dismissal.
An unfocusable artwork container cannot be a reliable return destination; inspect the trigger together with the dialog.
Keep the close button visible and reachable on short mobile screens and at browser zoom.
Test Escape from every focusable dialog control, not just the outer container.
Prevent background interaction while a modal is active and restore body scrolling and the previous position on close or unmount.

The current viewer supports one selected image with zoom and fit controls, not a previous/next artwork sequence.
Do not require arrow-key artwork navigation unless that feature is requested.
When changing menus, expose toggle state with `aria-expanded` and an appropriate controlled-region relationship.
Check close behavior on navigation and Escape, and keep disabled `/wip` menu entries non-interactive.

## Readability And Motion

Check focus visibility and text/control contrast against actual backgrounds, including image overlays and gradients.
Keep text usable at 200% enlargement and layouts usable at narrow widths without page-level horizontal scrolling.
Allow browser zoom and account for sticky headers, browser toolbars and mobile safe areas.
Keep artwork composition intact; essential captions and controls must remain available on touch devices.
Honor `prefers-reduced-motion` in both CSS and JavaScript when changing animation or smooth scrolling.
Avoid forcing animated scrolling as part of focus restoration.

## Verification

Exercise affected journeys by keyboard: Tab/Shift+Tab, Enter/Space, Escape and range-input arrow keys.
Check FR/EN labels, visible focus, dialog focus containment/return, menu operation and scroll restoration.
Cover narrow and desktop layouts, a short mobile screen, text enlargement and reduced motion when relevant.
Use the maintenance guide's coverage matrix for a release audit, and [UX principles](../../docs/ux-principles.md) for affected mobile journeys.
Use available contrast tools, accessibility-tree inspection, automated checks and screen readers as complementary evidence.
Do not claim a complete accessibility pass from lint, a screenshot or an automated score.
Report concrete findings with location, reproduction steps and user impact, and state any unavailable device or assistive-technology coverage.
