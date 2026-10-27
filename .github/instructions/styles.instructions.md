---
description: 'Use when editing Atelier Vue presentation, shared SCSS, responsive layouts or Sass configuration.'
applyTo: 'app/**/*.vue,app/styles/**/*.scss,nuxt.config.ts'
---

# Styling And Responsive Design

Use [design system](../../.agents/docs/design-system.md) for the current visual vocabulary and stylesheet ownership.
Use [UX principles](../../.agents/docs/ux-principles.md) for mobile composition and affected visitor journeys.
Keep the artwork primary and reuse the actual palette, typography and component vocabulary.

## Source Ownership

| Concern                    | Current owner                                                                               | Rule                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Tokens                     | [variables.scss](../../app/styles/variables.scss)                                           | Reuse existing Sass variables injected by Vite                               |
| Shared motion              | [keyframes.scss](../../app/styles/keyframes.scss)                                           | Preserve animation consumers when changing definitions or loading            |
| Global defaults and layout | [default.scss](../../app/styles/default.scss), [default.vue](../../app/layouts/default.vue) | Keep intentional global rules distinct from local component rules            |
| Local appearance           | Scoped SCSS beside the component or page                                                    | Keep page-specific presentation local                                        |
| Injection and fonts        | [nuxt.config.ts](../../nuxt.config.ts), [app.vue](../../app/app.vue) and the default layout | Check current output and resolved fonts before changing loading or ownership |

The current injection includes emitted keyframes as well as tokens.
Use the [style and layout review](../../STYLE_LAYOUT_REVIEW.md) when addressing that concern; its proposed extraction is not already implemented.
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
  The layout and CV page share `--vh`; inspect both before removing its writer or changing its meaning.
- Keep focus visible and measure contrast against actual surfaces, gradients and image overlays.
  Use [accessibility instructions](accessibility.instructions.md) for controls, motion and accessible states.
- Honor reduced motion in both SCSS and affected JavaScript animation or scrolling.
  Inspect menu, welcome and modal stacking contexts and scroll locks before changing a layer in isolation.

Validate affected FR/EN journeys at the widths in [UX principles](../../.agents/docs/ux-principles.md#mobile-acceptance), including 320x568 and relevant landscape states.
Check open menus and dialogs as well as resting layouts, and fix the source of overflow instead of masking it at page level.
Use [AGENTS.md verification](../../AGENTS.md#verification) and record browser/device coverage actually performed.
