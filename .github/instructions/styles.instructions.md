---
description: 'Use when editing Atelier Vue presentation, shared SCSS, responsive layouts or Sass configuration.'
applyTo: 'app/**/*.vue,app/styles/**/*.scss,nuxt.config.ts'
---

# Styling And Responsive Design

Use [design system](../../.agents/docs/design-system.md) for the current visual vocabulary and stylesheet ownership.
Use [UX principles](../../.agents/docs/ux-principles.md) for mobile composition and affected visitor journeys.
Keep the artwork primary and reuse the actual palette, typography and component vocabulary.

## Source Ownership

| Concern             | Current owner                                                                               | Rule                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Tokens              | [variables.scss](../../app/styles/variables.scss)                                           | Reuse existing Sass variables injected by Vite                                    |
| Shared motion       | [keyframes.scss](../../app/styles/keyframes.scss)                                           | Preserve animation consumers when changing definitions or loading                 |
| Global defaults     | [default.scss](../../app/styles/default.scss)                                               | Reset, typography, custom scrollbar, focus and reduced motion; no shell selectors |
| Reusable controls   | [shared.scss](../../app/styles/shared.scss)                                                 | Shared classes used by multiple layout components                                 |
| Page shell          | [default.vue](../../app/layouts/default.vue)                                                | Scoped flex shell; header and footer size to content                              |
| Local appearance    | Scoped SCSS beside the component or page                                                    | Keep page-specific presentation local                                             |
| Injection and fonts | [nuxt.config.ts](../../nuxt.config.ts), [app.vue](../../app/app.vue) and the default layout | Check current output and resolved fonts before changing loading or ownership      |

The config's `css` array loads defaults, keyframes and shared classes once; Vite injects only Sass tokens.
Token groups follow the source's colors/shadows/fonts/spaces/layout/controls/focus/layers/motion/breakpoints sections.
Keep CSS-emitting sheets out of repeated component imports and keep the layout's rules scoped.
Introduce a shared stylesheet or token family only for demonstrated reuse within the task.
Allow dynamic styles for measured gallery and zoom geometry; keep static presentation in SCSS.
For style-only cleanup, preserve existing class names, appearance and interaction states.
Group rules by meaningful visual areas; nest descendants only when the ancestor relationship is intentional, since scoped styles retain selector dependencies and specificity.
Avoid mechanical class renaming, fixed nesting-depth rules or wholesale breakpoint conversion.

## Responsive Acceptance

- Compose for small touch screens, then enhance for wider viewports.
  Reflow crowded controls and longer English text instead of shrinking them or hiding essential actions.
- Preserve complete artwork and its proportions in galleries and the viewer.
  Use [artwork-assets](../../.agents/skills/artwork-assets/SKILL.md) when changing image consumers or delivery.
- Check short viewports, safe areas, browser zoom and enlarged text.
  Add safe-area insets to the normal gutter; do not let an inset consume the intended spacing.
  Distribute desktop footer controls across its width; retain centered, wrapping compact controls, symmetric side clearance and bottom home-indicator padding.
  Use the CSS-first `100svh` shell and the CV's bounded `svh` iframe; do not restore a JavaScript `--vh` writer.
  Header measurement supplies `--site-header-height` for anchor clearance and desktop panel bounds, not shell-height subtraction.
- Keep focus visible and measure contrast against actual surfaces, gradients and image overlays.
  Use [accessibility instructions](accessibility.instructions.md) for controls, motion and accessible states.
- Honor reduced motion in both SCSS and affected JavaScript animation or scrolling.
  Inspect menu/modal stacking contexts and shared overlay scroll leases before changing a layer in isolation.
  Keep the mobile menu modal and locked throughout its exit animation over the new page; never delay route navigation for the animation.
  Destination focus/scroll waits for overlay release; mode changes and unmount close immediately.
  Preserve the brief Welcome/typing introduction and custom scrollbar; do not remove presentation features during structural cleanup.
  Hide scrollbar presentation during Welcome without locking document scrolling.
  Render Welcome in the initial markup, with a scripting-disabled CSS fallback instead of showing it only after hydration.
  Size visible border frames independently of their hit areas: compact frames match the logo instead of outlining the full 44px target.
  Do not reserve empty scrollbar space on the resting page; temporarily preserve only existing scrollbar space during overlay locking.

Validate affected FR/EN journeys at the widths in [UX principles](../../.agents/docs/ux-principles.md#mobile-acceptance), including 320x568 and relevant landscape states.
Check open menus and dialogs as well as resting layouts, and fix the source of overflow instead of masking it at page level.
Use [AGENTS.md verification](../../AGENTS.md#verification) and record browser/device coverage actually performed.
