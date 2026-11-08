# Atelier Libr'Émotions — Content direction

French is the source language; English should communicate the same meaning naturally.
Use [brand-context.md](brand-context.md) for confirmed identity and [the i18n skill](../skills/i18n/SKILL.md) for message structure and reactive consumers.
This guide owns editorial choices, not route creation or translation-key mechanics.

## Voice and point of view

Keep copy warm, direct, specific and attentive to the artwork.
Use poetic language where it belongs to the artist's expression and plain language for actions, errors and navigation.
Preserve first-person passages in the artistic approach instead of converting them into generic promotional copy.
Use third-person descriptions where the current page introduces the artist or summarizes a collection.

| Context                        | Preferred treatment                                    | Avoid                                                              |
| ------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------ |
| Navigation                     | Short technique, category or destination labels        | Abstract slogans that conceal the destination                      |
| Collection heading             | Established technique and category                     | Invented series names presented as artist-approved titles          |
| Artistic subtitle              | Supplied French wording and natural English adaptation | Replacing an artist-authored title to satisfy a marketing formula  |
| Supporting prose               | One clear idea followed by useful detail               | Generic praise, keyword lists and exaggerated claims               |
| Calls to action                | A verb that states the destination or action           | Ambiguous labels such as “Click here”                              |
| Errors and unavailable content | What happened and what the visitor can do next         | Blame, unexplained codes or playful text that obscures the problem |

Short interface copy should remain understandable out of context, including in a screen reader's links list.
Avoid excessive capitalization, exclamation marks and decorative punctuation in utility labels.
Retain meaningful capitalization and punctuation in confirmed names and artwork titles.

## Artwork descriptions

| Field                 | Editorial purpose                                        | Evidence required                                 |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| `title`               | Identify the work or established collection item         | Supplied title or existing series convention      |
| `mobile_title`        | Identify the same work in a compact caption              | Confirmed short code or filename convention       |
| `alt`                 | Convey relevant visible subject, form, color or material | Supplied description or inspection of the artwork |
| Painting `dimensions` | State the physical measurement separately from the title | Artist-supplied or existing confirmed measurement |
| Collection subtitle   | Express the artist's theme for the group                 | Artist-authored source text                       |

Do not invent materials, firing methods, dimensions, availability, prices or meanings to make an entry look complete.
Keep a missing optional measurement absent rather than writing a placeholder or estimating it from pixels.
Physical dimensions and raster image dimensions serve different purposes.
Write informative artwork alt text without repeating an entire page description or stuffing technique keywords into every image.
Require nonempty localized alt text on every rendered image; use CSS backgrounds or hidden interface icons for decoration, following [accessibility.md](accessibility.md).

## Page copy

| Page area          | Content goal                                                      | Current source                                                                                                |
| ------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Home               | Introduce painting and ceramics and invite exploration            | `pages.main.*` in [fr-FR.json](../../i18n/locales/fr-FR.json) and [en-US.json](../../i18n/locales/en-US.json) |
| Gallery            | Identify the technique, category, groups and individual works     | `pages.painting.*`, `pages.ceramic.*` and `pictures.*`                                                        |
| Artistic approach  | Preserve the artist's account of intuition, materials and emotion | `pages.about.*`                                                                                               |
| Development and CV | Present supplied history and the actual document                  | `pages.development.*`, `pages.cv.*` and the CV assets                                                         |
| Contact            | Explain the available contact actions                             | `pages.contact.*`, `about.*` and verified external destinations                                               |
| Work in progress   | State that content is unavailable and offer an existing next step | `wip.*`                                                                                                       |

Workshop copy can describe the supplied creative practice and the artist's experience.
Do not promise health outcomes, credentials, recurring dates, eligibility, pricing or booking availability without a confirmed source.
Keep personal claims in the artist's voice instead of turning them into guarantees for visitors.
Do not advertise a store, event-registration flow or contact form that is absent from the implementation.

## Metadata and translation

Adapt an artist's optional description into a concise, page-specific metadata summary.
Keep artist, technique and category references natural; do not impose a fixed opening phrase.
Use [SEO.md](SEO.md) for metadata ownership and [the SEO skill](../skills/seo/SKILL.md) for implementation.

Translate meaning, rhythm and usefulness rather than French word order.
Preserve proper names, work identifiers and confirmed measurements across locales.
French copy corrections do not require artificial English edits when the existing English is already accurate.
When changing message identities, add, rename or remove the corresponding keys in both locales and preserve interpolation names.
Keep ordinary copy as text and follow the i18n skill for characters with message syntax such as `|` and `@`.

## Editorial verification

Read the final copy in its page and component context, including longer English labels on small screens.
Check that titles, captions, alt text, accessible names and metadata still describe the same work or action.
Distinguish confirmed source information from proposed wording when reporting unresolved facts.
For copy-only work, verify affected locale paths and compilation as appropriate without creating unrelated pages or features.
