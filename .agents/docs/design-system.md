# Atelier Libr'Émotions — Design system

This guide records the implemented visual vocabulary and the constraints for extending it.
It does not declare an unimplemented token system or a newly approved redesign.
Use [brand-context.md](brand-context.md) for identity and [ux-principles.md](ux-principles.md) for responsive journeys.

## Styling ownership

| Concern                                  | Current source                                    | Maintenance rule                                                    |
| ---------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| Sass tokens                              | [variables.scss](../../app/styles/variables.scss) | Reuse actual color, breakpoint, dimension and layer variables       |
| Shared animations                        | [keyframes.scss](../../app/styles/keyframes.scss) | Preserve animation names used by existing components                |
| Global anchor defaults                   | [default.scss](../../app/styles/default.scss)     | Currently imported by the default layout                            |
| Global typography, reset and scroll lock | [default.vue](../../app/layouts/default.vue)      | Global rules currently live alongside layout selectors              |
| Sass injection                           | [nuxt.config.ts](../../nuxt.config.ts)            | Currently injects both variables and emitted keyframes through Vite |
| Page and component appearance            | Scoped SCSS beside each Vue component             | Keep local rules local and reuse components for shared behavior     |

Use the stylesheets and ownership listed above; introduce another shared file only when demonstrated reuse justifies it.
Sass built-ins such as `sass:color` still require their own import when used.

The existing [style and layout review](../../STYLE_LAYOUT_REVIEW.md) proposes consolidating global rules and loading keyframes once.
Those recommendations are not implemented by adding this guide.
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

The default layout declares `Nunito`, `Inter`, `Manrope`, `Poppins`, `Sora`, Arial and sans-serif in that order.
`app/app.vue` separately includes a Google Fonts stylesheet for Roboto, while Nuxt Fonts is installed.
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

## Artwork and surfaces

Preserve original aspect ratios and show complete work in galleries and the viewer.
Use framing, spacing and restrained rounding to support the artwork.
Do not replace gallery presentation with decorative masks, aggressive cropping or generated substitutes during routine UI work.
Social platforms may crop sharing previews; that does not justify cropping the source assets.

Reuse the existing gallery and viewer contracts rather than creating a second image system.
The gallery uses justified rows with typical target heights of `120`, `160`, `220` and `300` pixels.
Those heights describe layout, not required optimized image widths.
Use [the artwork-assets skill](../skills/artwork-assets/SKILL.md) for original files and IPX delivery.

The code uses component-local radii and spacing rather than a complete shared spacing/radius scale.
Inspect the nearest component before choosing a new value and extract a shared token only when actual reuse justifies it.
Avoid presenting a proposed token name as an implemented API.

## Responsive structure and layers

| Token group              | Current values                                                         | Constraint                                                       |
| ------------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Breakpoints              | `$xs: 320px`, `$sm: 640px`, `$md: 768px`, `$lg: 1024px`, `$xl: 1280px` | Reuse the source values and test between them                    |
| Header/footer dimensions | Desktop header `88px`, mobile header `66px`, footer `44px`             | Existing height assumptions need testing at text enlargement     |
| Layers                   | Welcome `9999`, modal `100`, menu `50`, header/footer `30`             | Inspect stacking contexts before changing one layer in isolation |

The layout and CV page both consume the JavaScript-maintained `--vh` custom property.
Do not replace one consumer or remove its writer without checking the others.
Keep mobile browser toolbars, safe areas and short landscape viewports in the acceptance pass.
Use [accessibility.md](accessibility.md) for focus, contrast and reduced-motion acceptance.

## Motion and interaction

Use motion to clarify state or gently support the work; it must not delay essential content or actions.
The current welcome overlay, floating home artwork, timed image changes and Lenis scrolling require separate reduced-motion checks.
Do not describe reduced-motion support as implemented solely because this guide requires it for future changes.
Preserve the viewer's zoom geometry and scroll restoration when changing transitions.
Keep static presentation in SCSS and allow dynamic styles for measured grid and zoom geometry.

Verify affected pages in both locales, at mobile and desktop widths, with keyboard, touch, enlarged text and reduced motion.
Use the layout review for scoped structural improvements and record what was actually tested.
