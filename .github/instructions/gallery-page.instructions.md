---
applyTo: "app/pages/painting/**/*.vue,app/pages/ceramic/**/*.vue"
---

# Gallery Page Instructions

## Overview

All painting and ceramic gallery pages follow the same template. When creating or modifying a gallery page, adhere strictly to the patterns described below.

---

## Template Requirements

Every gallery page MUST include these components in this order:

1. **PageHeaderOrnament** — decorative header element
2. **PageTitle** — with `:title` and `:subtitle` bound to i18n keys
3. **ImageGrid** — with `:images` and `:heights="{ xs: 120, sm: 160, md: 220, lg: 300 }"`
4. **PageNavigation** — with `:previous-page` and/or `:next-page`

Wrap everything in `<div class="gallery-page">` with the page header in `<div class="page-header">` and the gallery in `<div class="gallery-container">`.

---

## Script Requirements

### Imports and composables
```typescript
import type { ImageSource } from '~/types/image'

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
```

### URL configuration
```typescript
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = '{domain}/{technique-kebab}/{category-kebab}'
const ogImageEndPath = '{domain_plural}/{technique_snake}/{category}/{BestImage}.webp'
const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

### SEO — useHead()
- `title`: use `tab_name` i18n key
- `meta description`: use `meta.content` i18n key
- `keywords`: relevant `miscellaneous.*` keys, always include `art`, `artist`, `emotions`, `about.author`, `app.name`
- `link`: canonical + hreflang alternates (en-US, fr-FR, x-default pointing to fr)

### SEO — useSeoMeta()
- `ogTitle`, `twitterTitle`, `appleMobileWebAppTitle`: `'%s %separator %siteName'`
- `description`, `ogDescription`, `twitterDescription`: `meta.content` i18n key
- `ogImage`, `twitterImage`, `msapplicationTileImage`: full URL to a representative image
- `ogType`: `'article'`
- `articleTag`: array of keyword values matching the `keywords` meta

### Images array
```typescript
const images: ImageSource[] = [
  {
    src: '/{domain_plural}/{technique_snake}/{category}/{Filename}.webp',
    title: t('pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.title'),
    mobileTitle: t('pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.mobile_title'),
    alt: t('pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.alt'),
  },
  // ... one entry per image
]
```

### Navigation
```typescript
const previousPage = {
  path: '/{adjacent_page_path}',
  title: t('{adjacent_page_i18n}.tab_name'),
  description: t('{adjacent_page_i18n}.meta.content'),
}
```
Use `/wip` with `wip.*` keys for pages that don't exist yet.

---

## Style Block

Always use this exact style block:
```scss
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

## i18n Key Conventions

- **Page keys**: `pages.{domain}.{technique_snake}.{category_snake}.*`
- **Picture keys**: `pictures.{domain_plural}.{technique_snake}.{category_snake}.{image_key}.*`
- Technique names: snake_case in keys (e.g., `electric_kiln`), kebab-case in URLs (e.g., `electric-kiln`)
- Image keys: lowercase of the filename without extension (e.g., `fp1` for `FP1.webp`)

---

## Checklist

- [ ] Images placed in correct `public/` subfolder (WebP format)
- [ ] i18n translations added to both `fr-FR.json` and `en-US.json`
- [ ] Page Vue file created at correct path
- [ ] Menu.vue link updated from `/wip` to new page path
- [ ] Navigation links updated (new page + adjacent pages)
- [ ] `yarn lint` passes
