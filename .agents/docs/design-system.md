# Atelier Libr'Émotions — Design system

This guide records the implemented visual vocabulary and the constraints for extending it.
It does not declare an unimplemented token system or a newly approved redesign.
Use [brand-context.md](brand-context.md) for identity and [ux-principles.md](ux-principles.md) for responsive journeys.

## Styling ownership

| Concern                               | Current source                                                                   | Maintenance rule                                                   |
| ------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Sass tokens                           | [variables.scss](../../app/styles/variables.scss)                                | Reuse actual color, breakpoint, dimension and layer variables      |
| Shared animations                     | [keyframes.scss](../../app/styles/keyframes.scss)                                | Preserve animation names used by existing components               |
| Global defaults, typography and focus | [default.scss](../../app/styles/default.scss)                                    | Reset, base rules, custom scrollbar and reduced motion loaded once |
| Reusable control classes              | [shared.scss](../../app/styles/shared.scss)                                      | Shared icon-button sizing and appearance                           |
| Shell structure                       | [default.vue](../../app/layouts/default.vue)                                     | Scoped content-driven flex shell and focusable main                |
| Header bypass                         | [Header.vue](../../app/components/layout/Header.vue)                             | Focus-visible skip link positioned over the logo inside the header |
| Overlay scroll behavior               | [overlay-scroll-lock.client.ts](../../app/plugins/overlay-scroll-lock.client.ts) | Shared leases preserve prior styles, scroll position and Lenis     |
| Sass injection                        | [nuxt.config.ts](../../nuxt.config.ts)                                           | Injects only variables; shared keyframes load through `css`        |
| Page and component appearance         | Scoped SCSS beside each Vue component                                            | Keep local rules local and reuse components for shared behavior    |

Use the stylesheets and ownership listed above; introduce another shared file only when demonstrated reuse justifies it.
Sass built-ins such as `sass:color` still require their own import when used.
The token sheet groups colors, shadows, fonts, spaces, layout, controls, borders/focus/corners, layers, motion and breakpoints without renaming existing tokens.

Shared defaults, keyframes and reusable classes load once through the Nuxt config's `css` array.
The [style and layout review](../../STYLE_LAYOUT_REVIEW.md) retains the historical findings and a migration-status section.
Inspect all animation consumers and compare compiled output before changing injection or stylesheet ordering.

## Palette

These values come from the current token source; read that file before using or changing them.
Their presence does not establish accessible contrast in every combination.

| Token                           | Current value | Intended use in the existing vocabulary      |
| ------------------------------- | ------------- | -------------------------------------------- |
| `$background-color`             | `#F7F5F2`     | Warm page background                         |
| `$white-color`                  | `#FFFFFF`     | Content surfaces and contrasting foregrounds |
| `$primary-text-color`           | `#2C1810`     | Main dark text                               |
| `$grey-color-2`                 | `#5A6C7D`     | Secondary text and captions                  |
| `$gold-color`                   | `#D4AF37`     | Restrained ornamental accent                 |
| `$copper-color`                 | `#B87333`     | Warm accent and selected treatments          |
| `$warm-beige`                   | `#F5F1E8`     | Soft secondary surfaces                      |
| `$grey-blue-color`              | `#7A9FF0`     | Existing gradient and decorative accents     |
| `$dark-red-color`               | `#A00000`     | Existing gradient accents                    |
| `$mobile-menu-background-color` | `#2D3748`     | Dark mobile navigation surface               |

Let neutral surfaces and the artwork dominate.
Use accents to support hierarchy rather than competing with painting colors or ceramic form.
Measure text, focus and control contrast on their actual backgrounds, especially gradients and translucent image overlays.
Treat any additional palette as a proposal until it is part of the requested design work.

## Typography and hierarchy

The `$body-font` token declares `Nunito`, `Inter`, `Manrope`, `Poppins`, `Sora`, Arial and sans-serif in that order; `default.scss` applies it.
Nuxt Fonts is installed; inspect its generated CSS and the active family declarations when checking font delivery.
This source configuration does not prove which font resolves in each browser or that all requests are self-hosted.
Inspect computed styles and network requests before adding a family, removing a request or documenting a font optimization as complete.

| Role                  | Current example                                                                      | Extension rule                                                               |
| --------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Page H1               | [PageTitle.vue](../../app/components/common/PageTitle.vue), using fluid sizing       | Reuse the page-title hierarchy without adding a second H1                    |
| Artistic subtitle     | `PageTitle` subtitle with a quieter treatment                                        | Preserve artist wording and readable wrapping                                |
| Collection groups     | H2 headings above the relevant grids                                                 | Keep a logical outline and distinguish groups without oversized decoration   |
| Captions and metadata | Gallery titles, mobile identifiers and viewer information                            | Keep identifiers legible instead of shrinking them to force a desktop layout |
| Controls              | [Button.vue](../../app/components/common/Button.vue), navigation and viewer controls | Preserve a clear action label and visible keyboard focus                     |

Do not introduce a fixed desktop type scale as if it were an existing token contract.
Check narrow screens, longer English strings and enlarged text before changing sizes or fixed heights.

Desktop header navigation buttons and the Contact link use weight `700`, retaining inherited text sizing below `$xl` (1280px) and increasing to `1.125rem` from that breakpoint.
Opened-panel links and mobile navigation retain their own typography.

## Artwork and surfaces

Preserve original aspect ratios and show complete work in galleries and the viewer.
Use framing, spacing and restrained rounding to support the artwork.
Do not replace gallery presentation with decorative masks, aggressive cropping or generated substitutes during routine UI work.
Social platforms may crop sharing previews; that does not justify cropping the source assets.

Reuse the existing gallery and viewer contracts rather than creating a second image system.
The gallery uses justified rows with typical target heights of `120`, `160`, `220` and `300` pixels.
Those heights describe layout, not required optimized image widths.
Use [the artwork-assets skill](../skills/artwork-assets/SKILL.md) for original files and IPX delivery.

Pages retain component-local radii and spacing; the shared shell uses a small spacing/control token set.
Inspect the nearest component before choosing a new value and extract a shared token only when actual reuse justifies it.
Avoid presenting a proposed token name as an implemented API.

## Responsive structure and layers

| Token group        | Current values                                                              | Constraint                                                               |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Breakpoints        | `$xs: 320px`, `$sm: 640px`, `$md: 768px`, `$lg: 1024px`, `$xl: 1280px`      | Reuse the source values and test between them                            |
| Shell dimensions   | Gutter `20px`, desktop bar minimum `68px`, footer minimum `44px`            | Content may grow; no fixed shell-height subtraction                      |
| Controls and focus | Target `44px`, outline `3px`, offset `3px`                                  | Focus uses dark blue on light surfaces and light blue in the mobile menu |
| Layers             | Header `30`, desktop menu `50` within header, viewer `100`, skip link `200` | Native mobile dialog uses the browser top layer                          |

The layout uses `min-height: 100svh` with a growing main and naturally sized header/footer.
The CV iframe uses a bounded `svh` height; there is no JavaScript `--vh` writer.
The header retains its 20px top gutter and measures `--site-header-height` with a cleaned-up ResizeObserver.
This measurement clears navigation destinations and bounds desktop panels; it does not calculate the shell height.
At viewport heights of 480px or less the header is non-sticky, leaving more room for content.
The footer remains the white language/copyright row, wrapping at enlarged text.
Desktop distributes the two controls with `space-between` inside the safe-area gutters instead of clustering them at the center.
Compact screens retain centered controls with a 24px gap and wrap naturally when needed.
Header/main/menu safe-area insets add to their normal spacing; footer side padding uses the larger horizontal inset on both sides to remain centered.
Footer bottom padding adds the home-indicator inset rather than replacing the normal breathing room.
Desktop menu panels use a responsive grid, independent vertical scrolling and explicit close controls.
Their close header is outside the scrolling content, so focused links cannot slip underneath it.
The mobile native dialog separates its persistent close header from scrollable accordion content.
The dialog is also used at viewport heights up to 400px, even at desktop widths.
Menu mode follows the actual CSS-visible toggle through ResizeObserver; JavaScript does not duplicate breakpoint values.
Do not add a page-level overflow mask to conceal a local sizing problem.
Keep mobile browser toolbars, safe areas and short landscape viewports in the acceptance pass.
Use [accessibility.md](accessibility.md) for focus, contrast and reduced-motion acceptance.

## Motion and interaction

Use motion to clarify state or gently support the work; it must not delay essential content or actions.
`Welcome` and `TextTyping` preserve the two-second layout-mount introduction and its soft fade.
The decorative surface is inert and hidden from assistive technology; pointer, keyboard and focus interaction dismiss it immediately without consuming the action.
It never takes focus or acquires a scroll lock.
Its surface is present in the server markup so refresh starts with Welcome, not a flash of the loading page.
Typing and the two-second dismissal timer begin after mount; `scripting: none` hides the decoration and leaves normal scrollbar presentation available without JavaScript.
The standalone typing component exposes the full text once to assistive technology while visually revealing characters; reduced motion shows the complete string immediately.
Welcome's logo and text share one flex row, with text allowed to wrap when enlarged rather than clipping.
Scrollbar presentation is hidden only while the welcome surface exists; document scrolling is not locked.
Both components clean up timers and listeners on unmount.
Desktop menu panels fade/slide over 0.2s; the mobile surface slides horizontally over 0.3s.
The mobile native dialog retains its scroll lease and focus containment until the leave transition finishes.
Normal menu-link activation navigates immediately; the route change starts the closing animation over the destination.
The shared overlay release promise coordinates destination focus and scrolling so neither runs against a still-modal or scroll-locked page.
Modified clicks retain native behavior, current-page links dismiss the menu, and mode changes/unmount close immediately.
The slide uses an opaque menu surface over a transparent native backdrop.
Menu border frames match the logo at 25px up to 640px and 30px above that width; compact glyphs are 18px/20px.
Desktop close controls use a 30px border frame and 20px glyph; link arrows remain 16px.
The frame and hover treatment are drawn inside the independently usable 44px touch target.
Global CSS reduces animation/transition duration and iteration count; Lenis and route scrolling check the motion preference.
The unchanged home artwork rotation is separate page behavior and still needs its own pause/stop review.
Preserve the viewer's zoom geometry and scroll restoration when changing transitions.
Keep static presentation in SCSS and allow dynamic styles for measured grid and zoom geometry.

## Common-component maintenance

Common controls retain the current palette, gradient borders, pill language switcher and white artwork-viewer surface.
The update is not a dropdown, tooltip, theme or page redesign.
Component props and events are typed; heading components preserve their existing defaults while allowing explicit hierarchy in future page work.
Static appearance stays in scoped SCSS; gesture geometry belongs in [useImageViewerGestures.ts](../../app/composables/useImageViewerGestures.ts), not in template expressions or global shell styles.
Transitions name the properties they animate instead of using `transition: all`.
Noninteractive card hover movement is disabled for touch and reduced motion.
Text uses rem-based sizing, normal flow, minimum-width guards and long-word wrapping.
Original gold/copper ornament and badge surfaces are retained.
Text accents use hue-specific `$gold-text-color` and `$copper-text-color`, rather than replacing both with a generic navigation brown.
The copper date badge keeps its original background with darker contrasting text.
Dark text is retained on light gold/orange/purple badges, while dark-red badges use white text.
Focus is never removed by a generic button/range reset.
Artwork triggers draw a 4px-per-color inset white/dark-blue ring so gallery clipping cannot hide it.
Mobile/coarse-pointer captions sit below the image with no overlay; desktop captions use a shallow feathered gradient only on hover/focus.
Artwork hover scale is 1.04, with a 0.65s cubic-bezier transition; reduced motion removes it.
The native width binding remains an HTML image width attribute, not an IPX transform.
Fixed image frames use the existing row-height CSS variable while captions grow in natural button flow; the engine's mathematical output is unchanged.
Interface arrows and quotation/ornament decoration are hidden from assistive technology.
The viewer's native dialog occupies the browser top layer; its child scrim and panel share the fade while the native backdrop stays transparent.
Header, flexible image stage, previous/zoom/next toolbar and concise information share one grid panel.
The image stage hides scrollbar presentation and supports drag, click-to-center and keyboard pan; ordinary content does not require a panel scrollbar.
Only short or enlarged content falls back to one panel scroll region with a sticky close header.
The loader intentionally uses a scoped plum gradient and the separate `viewerSkeleton` keyframe; it does not replace or reuse the gallery skeleton.
The stage preserves complete contain geometry at fit size; zoom dimensions are measured and bounded rather than inferred from viewport writers.
Native range presentation keeps its focus outline and a 44px interaction height.
The language switcher retains compact pill framing, with its transparent native hit areas sized separately from that visible frame.
Use component-qualified block/element classes for new internal structure, shallow intentional relationships, blank lines between visual areas and existing spacing/border/motion tokens.
Retain established public class/variant contracts when cleanup alone does not justify renaming them.
System-color keywords in forced-colors rules are valid CSS and must not be replaced with fixed palette values to silence an editor decoration.
See [accessibility maintenance](accessibility.md#common-component-contracts) for behavior, exclusions and audit boundaries.

Verify affected pages in both locales, at mobile and desktop widths, with keyboard, touch, enlarged text and reduced motion.
Use the layout review for scoped structural improvements and record what was actually tested.

## Scrollbar presentation

The global defaults preserve the blue/red gradient thumb and rounded light track.
The thumb has a dark boundary and 7px width.
Browsers without WebKit scrollbar selectors receive standard scrollbar colors.
Forced-colors mode restores native scrollbar presentation.
The root uses the native automatic gutter, so no blank strip is reserved when a page does not scroll.
Before an overlay hides an existing scrollbar, the shared lock temporarily reserves that actual gutter to prevent horizontal shifting; the last release restores the previous style.
The lock also preserves the document's minimum height while fixing the body, so the actual scroll offset remains available to router history.
This temporary document-height preservation is removed with the last lease; it is not a viewport resize writer or part of the resting layout.
