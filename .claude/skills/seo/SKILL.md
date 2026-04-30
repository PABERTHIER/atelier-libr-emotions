---
name: seo
description: >
  Reference and checklist for SEO metadata on gallery pages.
  Use when writing, reviewing, or debugging useHead() and useSeoMeta() on any page.
disable-model-invocation: true
argument-hint: "<page path to review or write SEO for>"
---

You are writing or reviewing SEO metadata for: $ARGUMENTS

The project uses `@nuxtjs/seo` v3. Every gallery page needs both `useHead()` and `useSeoMeta()`.

---

## URL Setup (always comes first)

```typescript
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
// Path segment without locale prefix and without leading slash
const urlEndPath = '{domain}/{technique-kebab}/{category-kebab}'
// Path to OG image inside public/ (no leading slash)
const ogImageEndPath = '{domain_plural}/{technique_snake}/{category}/{Image}.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

`route.path` includes the locale prefix (`/fr/...` or `/en/...`) so `canonicalUrl` is always locale-correct.

---

## useHead() — Complete Pattern

```typescript
useHead({
  title: computed(() => t('pages.{domain}.{technique}.{category}.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.{kw1}')).value},
        ${computed(() => t('miscellaneous.{kw2}')).value},
        ${computed(() => t('miscellaneous.art')).value},
        ${computed(() => t('miscellaneous.artist')).value},
        ${computed(() => t('miscellaneous.emotions')).value},
        ${computed(() => t('about.author')).value},
        ${computed(() => t('app.name')).value},
      `,
    },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/en/${urlEndPath}`),
      hreflang: 'en-US',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'fr-FR',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'x-default',
    },
    // iOS home screen: overrides app.vue global apple-icon.jpg with this page's gallery artwork.
    // `key` is required so Unhead deduplicates — page-level entry wins over app.vue.
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `/${ogImageEndPath}`,
      key: 'apple-touch-icon',
    },
  ],
})
```

### Hreflang rules (NON-NEGOTIABLE)

- Always include **all 3**: `en-US`, `fr-FR`, `x-default`
- `x-default` **always** points to `/fr/` — French is the default locale
- Use `urlEndPath` (no locale prefix) and prepend `/en/` or `/fr/` manually
- **Do NOT** use `route.path` for hreflang alternates — it carries the current locale

---

## useSeoMeta() — Complete Pattern

```typescript
useSeoMeta({
  ogTitle: '%s %separator %siteName',
  twitterTitle: '%s %separator %siteName',
  appleMobileWebAppTitle: '%s %separator %siteName',

  description: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  ogDescription: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  twitterDescription: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),

  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',

  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  twitterImageType: 'image/jpeg',

  ogUrl: canonicalUrl.value,
  ogType: 'article',

  articleTag: [
    computed(() => t('miscellaneous.{kw1}')).value,
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ],

  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
```

`articleTag` values use `.value` directly (resolved strings, not reactive). All other i18n values must be `computed(() => t(...))`.

---

## Commented OgImageComponent (NON-NEGOTIABLE: always keep)

```typescript
// defineOgImageComponent('NuxtSeo', {
//   theme: '#4A7C59',
//   colorMode: 'dark',
//   title: computed(() => t('pages.{domain}.{technique}.{category}.tab_name')),
//   description: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
// })
```

Do not remove this block from any page — it is kept for future activation.

---

## Keyword Reference by Domain

**Base keywords (every gallery page):**
`art`, `artist`, `emotions`, `about.author`, `app.name`

| Domain | Additional keywords |
|---|---|
| Any painting page | `painting`, `painter` |
| Acrylic | + `acrylic`, `abstracts`, `automatic_painting`, `abstract_art`, `mish_mash` |
| Inks | + `inks`, `indian_inks`, `landscape`, `roots`, `trees`, `water`, `water_jet` |
| Oil | + `oil_painting` |
| Any ceramic page | `ceramic`, `ceramicist` |
| Electric kiln | + `electric_kiln`, `nature`, `flowers` |
| Porcelain | + `porcelain`, `nature`, `flowers` |
| Raku/smouldering | + `raku_and_smouldering` |

Keywords must match identically between `meta[name=keywords]` and `articleTag`.

---

## meta.content Quality Rules (NON-NEGOTIABLE)

- **≤160 characters** — Google truncates at 160, check char count
- Include artist name **"Véronique Berthier"**
- Include technique and category names
- FR: start with `"Galerie de…"`, `"Collection de…"`, or `"Découvrez…"`
- EN: start with `"Gallery of…"`, `"Collection of…"`, or `"Discover…"`
- Do NOT copy the artist's description verbatim

**Correct FR example (137 chars):**
> "Collection de fleurs en porcelaine de Véronique Berthier : pièces délicates pour décoration murale ou sur meuble, seules ou associées à un élément naturel."

---

## OG Image Selection

Choose a **visually striking** image from the gallery — not necessarily the first:
- Prefer landscape or square orientation
- Representative of the overall category style
- Mid-to-end of the collection often works better than the first image
