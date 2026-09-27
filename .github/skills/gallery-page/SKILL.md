---
name: gallery-page
description: "Reference pattern for creating gallery pages (painting and ceramic). Use this skill when building a new gallery page to ensure all SEO, i18n, and component conventions are followed."
---

# Gallery Page Skill

This skill describes the exact pattern used for all painting and ceramic gallery pages in Atelier Libr'Émotions.

---

## Complete Page Template

Use this as the reference template. Replace all `{placeholders}` with actual values.

```vue
<template>
  <div class="gallery-page">
    <div class="page-header">
      <PageHeaderOrnament />
      <PageTitle
        :title="t('pages.{domain}.{technique_snake}.{category_snake}.title')"
        :subtitle="t('pages.{domain}.{technique_snake}.{category_snake}.subtitle')" />
    </div>

    <div class="gallery-container">
      <ImageGrid
        :images="images"
        :heights="{ xs: 120, sm: 160, md: 220, lg: 300 }" />
    </div>

    <PageNavigation :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = '{domain}/{technique-kebab}/{category-kebab}'
const ogImageEndPath = '{domain_plural}/{technique_snake}/{category}/{BestImageFilename}.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.{domain}.{technique_snake}.{category_snake}.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('pages.{domain}.{technique_snake}.{category_snake}.meta.content')
      ),
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
      hreflang: 'x-default',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `/${ogImageEndPath}`,
      key: 'apple-touch-icon',
    },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() =>
    t('pages.{domain}.{technique_snake}.{category_snake}.meta.content')
  ),
  ogDescription: computed(() =>
    t('pages.{domain}.{technique_snake}.{category_snake}.meta.content')
  ),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.{domain}.{technique_snake}.{category_snake}.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '600',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  articleTag: [
    computed(() => t('miscellaneous.{keyword1}')).value,
    computed(() => t('miscellaneous.{keyword2}')).value,
    computed(() => t('miscellaneous.art')).value,
    computed(() => t('miscellaneous.artist')).value,
    computed(() => t('miscellaneous.emotions')).value,
    computed(() => t('about.author')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

const images: ImageSource[] = [
  {
    src: '/{domain_plural}/{technique_snake}/{category}/{Filename1}.webp',
    title: t('pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key1}.title'),
    mobileTitle: t('pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key1}.mobile_title'),
    alt: t('pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key1}.alt'),
    // For paintings only — omit for ceramics:
    dimensions: t('pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key1}.dimensions'),
  },
  // ... repeat for each image
]

const previousPage = {
  path: '/wip',
  title: t('wip.previous_page_name'),
  description: t('wip.previous_page_description'),
}

const nextPage = {
  path: '/wip',
  title: t('wip.next_page_name'),
  description: t('wip.next_page_description'),
}
</script>

<style lang="scss" scoped>
.gallery-page {
  position: relative;
  width: 100%;

  .page-header {
    margin-bottom: 50px;
  }
}
</style>
```

---

## Placeholder Reference

| Placeholder | Example (Ceramic/Porcelain/Flowers) | Example (Painting/Acrylic/Abstracts) |
|---|---|---|
| `{domain}` | `ceramic` | `painting` |
| `{domain_plural}` | `ceramics` | `paintings` |
| `{technique_snake}` | `porcelain` | `acrylic` |
| `{technique-kebab}` | `porcelain` | `acrylic` |
| `{category_snake}` | `flowers` | `abstracts` |
| `{category-kebab}` | `flowers` | `abstracts` |
| `{image_key}` | `fp1` (lowercase filename without ext) | `automatic_painting_1` |

### Special cases for technique naming

| Technique (French) | snake_case (i18n) | kebab-case (URL) | Public folder |
|---|---|---|---|
| Four électrique | `electric_kiln` | `electric-kiln` | `electric_kiln` |
| Raku et enfumage | `raku_and_smouldering` | `raku-smouldering` | `raku_smouldering` |
| Porcelaine | `porcelain` | `porcelain` | `porcelain` |
| Acrylique | `acrylic` | `acrylic` | `acrylic` |
| Encres | `inks` | `inks` | `inks` |
| Huile | `oil` | `oil` | `oil` |
| Fusain | `charcoal` | `charcoal` | `charcoal` |
| Pastel | `pastel` | `pastel` | `pastel` |
| Technique mixte | `mixed_technique` | `mixed-technique` | `mixed_technique` |

---

## i18n Translation Template

### Page metadata (fr-FR.json)

```json
{
  "pages": {
    "{domain}": {
      "{technique_snake}": {
        "{category_snake}": {
          "tab_name": "{Technique FR} - {Category FR}",
          "meta": {
            "content": "Découvrez les {category} en {technique} de l'artiste de l'Atelier Libr'Émotions. {SEO description adapted from artist's input}."
          },
          "title": "{Technique FR} - {Category FR}",
          "subtitle": "{Artist's title for this category}"
        }
      }
    }
  }
}
```

### Image descriptions (fr-FR.json)

```json
{
  "pictures": {
    "{domain_plural}": {
      "{technique_snake}": {
        "{category_snake}": {
          "{image_key}": {
            "title": "{Descriptive title}",
            "mobile_title": "{Short code, e.g. FP1}",
            "alt": "{Accessible description of the artwork}",
            "dimensions": "{W x H cm}"
          }
        }
      }
    }
  }
}
```

> **Note:** `dimensions` is required for paintings. Omit it for ceramics.

---

## Choosing the OG Image

Select a representative image from the collection for `ogImageEndPath`. Prefer an image that:
- Is visually striking and representative of the category
- Works well as a social media preview (landscape orientation preferred)
- Is typically one from the middle of the collection (not the first one)
