---
name: i18n
description: Add, update or review Atelier Libr'Émotions French and English messages, artwork keys, interpolation, reactive translated UI and locale-aware navigation. Use for localization work; translation-only requests do not require a new page.
---

# Atelier Internationalization

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints.
Read the affected messages and their consumers before editing.
Keep translation-only work within that scope rather than creating routes or changing navigation without a request.
For new or revised prose, read [content direction](../../docs/content-direction.md); use [brand context](../../docs/brand-context.md) when identity or factual positioning is involved.

## Locale And Message Map

| Route code | Language                                       | Source                                         |
| ---------- | ---------------------------------------------- | ---------------------------------------------- |
| `fr`       | French, source language and configured default | [fr-FR.json](../../../i18n/locales/fr-FR.json) |
| `en`       | English                                        | [en-US.json](../../../i18n/locales/en-US.json) |

The `prefix` strategy includes `/fr` and `/en`.
Read [nuxt.config.ts](../../../nuxt.config.ts) before changing routing or locale detection.
Use [artwork naming](references/artwork-naming.md) when resolving gallery route segments, picture namespaces and filesystem directories.

| Namespace                                     | Ownership                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| `app.*`                                       | Visible site identity and logo alternative                                      |
| `seo.*`, `error.*`                            | Full search titles/descriptions and standalone error messages                   |
| `components.*`                                | Component labels, language controls and viewer messages                         |
| `pages.*`                                     | Visible page titles, live navigation labels, subtitles and authored copy        |
| `pictures.paintings.*`, `pictures.ceramics.*` | Artwork titles, compact identifiers, descriptions and known painting dimensions |
| `miscellaneous.*`                             | Shared technique/category labels                                                |
| `about.*`                                     | Confirmed artist identity and contact information                               |
| `wip.*`                                       | Placeholder page and previous/next fallback labels                              |

Search existing namespaces before adding a shared message.
SEO page IDs are route-qualified, such as `painting_inks_nature` and `ceramic_porcelain_nature`, and match `PageName` in `app/types/seo.ts`.
Keep `tab_name` for page navigation; do not retain superseded metadata/profile keys as unused translations.
Use snake_case for new multiword keys and preserve existing identities unless a rename is requested.
Gallery pages use `pages.{domain}.{technique}.{category}` with singular `painting` or `ceramic`.
Picture keys use plural `paintings` or `ceramics` and may include a group below the category.

## Edit Messages Together

Add, rename and remove key paths in both locales within the same change.
Keep their nesting, value types and interpolation names aligned, and update affected consumers when changing a key.
A correction to wording in one language does not require an artificial edit to the other language when its meaning is already correct.
Search generated key families as well as literal `t()` calls before removing messages.
Fallback French can hide missing English keys, so visible output is not sufficient evidence of parity.

Preserve confirmed names, work titles and supplied French artistic subtitles, and adapt their meaning naturally into English.
Follow the content guide's factual boundaries; missing artwork details or measurements must not be invented to fill a field.

| Field          | Guidance                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `tab_name`     | Concise visible navigation label, usually technique and category                                     |
| `seo.*`        | Full search title and specific description; use [seo](../seo/SKILL.md) for metadata guidance         |
| `title`        | Page heading, usually matching the technique/category label                                          |
| `subtitle`     | Artist's category title in French and a natural English adaptation                                   |
| Image `title`  | Confirmed work title or the collection's descriptive label and number; keep dimensions separate      |
| `mobile_title` | Compact artwork code, such as `FP1` or `TMn9`, consistent across locales                             |
| `alt`          | Concise description of relevant visible content; avoid keyword lists and arbitrary word-count limits |
| `dimensions`   | Known physical painting measurements, such as `40 x 50 cm`; not image pixel dimensions               |

Keep locale JSON valid, with two-space indentation and no trailing commas.
Preserve unrelated ordering and content.
Vue I18n treats `|` as plural syntax and `@` as linked-message syntax; inspect existing literal handling before adding either to prose or email strings.
Keep translated copy as text and avoid introducing `v-html` to render it.

## Keep UI And Routes Reactive

Call `t()` in templates or inside a tracked getter.
For translated arrays, labels and navigation objects created in script, use `computed()` rather than evaluating translations once during setup.
Use the shared `usePageSeo()` helper for reactive metadata instead of page-level head blocks.
Reading `computed(() => t(key)).value` once while constructing a static object still produces a stale string.

```ts
const { t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const galleryTitle = computed(() => t('pages.painting.acrylic.abstracts.title'))
```

Use `localePath('/painting/acrylic/abstracts')` for internal page links.
Use `switchLocalePath(code)` for a language change on the current page, following [LangSwitcher.vue](../../../app/components/common/LangSwitcher.vue).
Pass unprefixed paths to `PageNavigation`, which calls `localePath()` internally.
Do not localize asset URLs or external destinations.

Browser-language detection at `/` uses the `i18n_redirected` cookie.
`LangSwitcher.vue` uses corresponding-route links from `useSwitchLocalePath()` and closes shared navigation before following a locale link.
I18n owns root language detection and root head data owns HTML language/direction.
The existing FR/EN link controls preserve the corresponding route and strip fragment-dependent destinations.
When changing language behavior, test the URL, cookie and stored preference together; directly changing `locale` is not proof that the URL changed.
Keep `/` detection separate from the French `x-default` metadata convention.

## Verification

Parse both JSON files and compare the affected leaf key paths and interpolation names.
Check every generated image key against the corresponding filename and consumer.
If a full parity check finds pre-existing differences, distinguish them from the edited subtree rather than expanding the task silently.
Run `yarn lint` and, when messages or their consumers change, the relevant build or generation check to catch message-compilation errors.
Switch FR/EN without reloading and inspect headings, captions, navigation, viewer text, accessible names and metadata affected by the change.
Check both direct localized URLs and longer translated labels at small widths.
