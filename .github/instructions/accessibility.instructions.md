---
description: 'Use when editing Atelier semantics, controls, navigation focus, overlays, image alternatives, readability or reduced-motion behavior.'
applyTo: 'app/**/*.vue,app/plugins/**/*.ts,app/composables/**/*.ts,app/styles/**/*.scss'
---

# Accessible Interaction

Apply these requirements when the change affects semantics, interaction, presentation or motion.
Every rendered image, including a logo or placeholder, needs nonempty localized alt text; use CSS backgrounds or hidden interface icons for decoration instead of empty-alt images.
Use [accessibility maintenance](../../.agents/docs/accessibility.md) for current source findings and [the accessibility skill](../../.agents/skills/accessibility/SKILL.md) for the scoped workflow.
An instruction's presence does not require an unrelated site-wide audit or prove existing conformance.

| Area                  | Required behavior for the affected change                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| Controls              | Native links for destinations, buttons for actions, meaningful translated names and visible focus             |
| Artwork               | Informative localized alt text, decorative imagery marked appropriately and operable artwork-opening controls |
| Menus                 | Keyboard/touch operation, expanded state, reachable dismissal and no focus in hidden content                  |
| Viewer                | Named dialog, focus entry/containment/return, Escape, reachable zoom/fit/close and preserved scroll position  |
| Navigation            | Logical reading order, one main landmark, page H1 and useful focus/viewport behavior after navigation         |
| Appearance and motion | Readable contrast and text enlargement, comfortable touch targets, and CSS/JavaScript reduced-motion behavior |

Reuse the native artwork button and the viewer's native modal dialog rather than introducing click-only containers or a competing focus trap.
Preserve native zoom range arrows, same-group previous/next artwork navigation and the image region's distinct zoomed keyboard-pan behavior.
Every drag/pinch/swipe action needs a single-pointer alternative.
The viewer uses zoom/fit and previous/next buttons plus click-to-center panning, without a separate pan toolbar.
Check shared menu/modal scroll locking and cleanup when changing overlays.
Use [i18n](../../.agents/skills/i18n/SKILL.md) for FR/EN labels and avoid tooltip-only or hover-only explanations of essential actions.
For new-tab destinations, use `rel="noopener noreferrer"` alongside `target="_blank"` and verify the rendered link.

Exercise affected journeys by keyboard, touch where available, enlarged text and reduced motion in both locales.
Use the guide's manual audit matrix for release coverage and report untested devices or assistive technology.
Automated checks and builds are supporting evidence, not a conformance certificate.
