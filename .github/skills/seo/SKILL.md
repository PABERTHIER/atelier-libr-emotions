---
name: seo
description: "Full SEO implementation pattern for gallery pages: useHead, useSeoMeta, canonical URL, hreflang, Open Graph, Twitter cards, and article tags. Use this skill when writing or reviewing SEO metadata on any page."
---

# SEO Skill

Every gallery page in Atelier Libr'Émotions uses the `@nuxtjs/seo` module (`@nuxt/seo` v3).
This skill documents the complete SEO pattern used consistently across all pages.

---

## Architecture Overview

SEO metadata is split across two composables and i18n:

| Concern | Where |
|---|---|
| Browser tab title | `useHead({ title })` |
| Meta description + keywords | `useHead({ meta: [...] })` |
| Canonical URL + hreflang + apple-touch-icon | `useHead({ link: [...] })` |
| Open Graph + Twitter | `useSeoMeta({...})` |
| Translations | `i18n/locales/*.json` → `pages.{domain}.{technique}.{category}.meta.content` |
| Site-level config | `nuxt.config.ts` → `site: { url, name }` |

---

## URL Setup (required on every page)

```typescript
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
// URL path segment without leading slash, without locale prefix
const urlEndPath = '{domain}/{technique-kebab}/{category-kebab}'
// Path to the representative OG image inside public/
const ogImageEndPath = '{domain_plural}/{technique_snake}/{category}/{RepresentativeImage}.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

**Why `route.path`?** The i18n prefix strategy adds `/fr/` or `/en/` to routes.
`route.path` includes the locale prefix, so `canonicalUrl` is always locale-aware.

---

## useHead() — Full Pattern

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
      content: `${computed(() => t('miscellaneous.{keyword1}')).value},
        ${computed(() => t('miscellaneous.{keyword2}')).value},
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
      hreflang: 'x-default',  // French is the default locale
    },
    // iOS home screen: overrides the global apple-icon.jpg with the gallery's artwork image.
    // `key` is required so Unhead deduplicates against the app.vue global entry (page wins).
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `/${ogImageEndPath}`,
      key: 'apple-touch-icon',
    },
  ],
})
```

### Hreflang rules
- Always include all 3 hreflang entries: `en-US`, `fr-FR`, and `x-default`
- `x-default` always points to the **French** URL (French is the default locale)
- Use `urlEndPath` (without locale prefix) — prepend `/en/` or `/fr/` manually

---

## useSeoMeta() — Full Pattern

```typescript
useSeoMeta({
  // Title format: "Page Name - Atelier Libr'Émotions"
  ogTitle: '%s %separator %siteName',
  twitterTitle: '%s %separator %siteName',
  appleMobileWebAppTitle: '%s %separator %siteName',

  // Description — same content as meta description
  description: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  ogDescription: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  twitterDescription: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),

  // OG image — full absolute URL to a representative image from the gallery
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',

  // Twitter card
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.{domain}.{technique}.{category}.meta.content')),
  twitterImageType: 'image/jpeg',

  // Page type and URL
  ogUrl: canonicalUrl.value,
  ogType: 'article',

  // Article tags = same keywords as meta keywords, as an array of strings
  articleTag: [
    computed(() => t('miscellaneous.{keyword1}')).value,
    computed(() => t('miscellaneous.{keyword2}')).value,
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ],

  // PWA tile
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
```

---

## Choosing Keywords

Keywords appear in both `meta[name=keywords]` and `articleTag`. They must match.

**Always include these base keywords on every gallery page:**
- `miscellaneous.art`
- `miscellaneous.artist`
- `miscellaneous.emotions`
- `about.author` (= "Véronique Berthier")
- `app.name` (= "Atelier Libr'Émotions")

**Add domain-specific keywords from `miscellaneous.*`:**

| Domain | Add these keys |
|---|---|
| Any painting page | `painting`, `painter` |
| Acrylic | `acrylic`, `abstracts`, `automatic_painting`, `abstract_art`, `mish_mash`, `haphazardly` |
| Inks | `inks`, `indian_inks`, `abstract_art`, `landscape`, `roots`, `trees`, `water`, `water_jet` |
| Oil | `oil_painting` |
| Any ceramic page | `ceramic`, `ceramicist` |
| Electric kiln | `electric_kiln`, `nature`, `flowers` |
| Porcelain | `porcelain`, `nature`, `flowers` |
| Raku/smouldering | `raku_and_smouldering` |

---

## Choosing the OG Image

Pick a **visually striking** image from the gallery — not necessarily the first one.
Prefer:
- Landscape orientation (or square — avoid portrait crops)
- A representative/recognisable piece from the collection
- Typically the last or second-to-last image in the series works well

---

## meta.content Quality Rules

The `meta.content` translation key powers the description, OG description, and Twitter description.

**Do:**
- ≤160 characters
- Start with "Galerie de…" / "Collection de…" / "Découvrez…" (FR) or "Gallery of…" / "Discover…" (EN)
- Include the artist's name "Véronique Berthier"
- Include the technique and category names
- Mention 2–3 descriptive attributes of the artworks

**Do not:**
- Copy the artist's raw description verbatim
- Exceed 160 characters
- Use generic filler like "beautiful artworks"

**Example (FR):**
> "Collection de fleurs en porcelaine de Véronique Berthier : pièces délicates et dentelées pour décoration murale ou sur meuble, seules ou associées à un élément naturel."

**Example (EN):**
> "Collection of porcelain flowers by Véronique Berthier: delicate lace-like pieces for wall or furniture display, alone or paired with natural elements or other ceramics."
