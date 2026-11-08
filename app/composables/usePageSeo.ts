import { imageDimensions } from '~/data/imageDimensions'
import { pageSeo, robotsContent } from '~/data/seo'
import { siteName } from '~/data/site'
import type { PageName, PageSeoDefinition } from '~/types/seo'

export function usePageSeo(page: PageName) {
  const { t, localeProperties } = useI18n()
  const localePath = useLocalePath()
  const site = useSiteConfig()

  const pageData: PageSeoDefinition = pageSeo[page]
  const dimensions = imageDimensions[pageData.image]

  if (!dimensions) {
    throw new Error(`Missing image dimensions: ${pageData.image}`)
  }

  const [imageWidth, imageHeight] = dimensions

  const path = computed(() => localePath(pageData.path))
  const url = computed(() => new URL(path.value, site.url).href)
  const image = computed(() => new URL(pageData.image, site.url).href)
  const imageAlt = computed(() => t(pageData.imageAlt))
  const title = computed(() => t(`seo.${page}.title`))
  const description = computed(() => t(`seo.${page}.description`))
  const keywords = computed(() => [
    ...new Set((pageData.keywordKeys ?? []).map(key => t(key))),
  ])
  const identity = { '@id': new URL('/#identity', site.url).href }

  useSeoMeta({
    // Nuxt Robots supplies SSR tags; also restore the policy after a client recovery from an error, where the error component's tag is disposed
    robots: () =>
      pageData.indexable !== false && String(site.indexable) === 'true'
        ? robotsContent.indexable
        : robotsContent.blocked,
    description,
    ogTitle: title,
    ogSiteName: siteName,
    ogDescription: description,
    ogUrl: url,
    ogType: 'website',
    ogImage: image,
    ogImageAlt: imageAlt,
    ogImageType: 'image/webp',
    ogImageWidth: imageWidth,
    ogImageHeight: imageHeight,
    twitterCard: 'summary_large_image',
  })

  useSchemaOrg([
    defineWebSite({
      name: siteName,
      description: computed(() => t('seo.site.description')),
      url: computed(() => new URL(localePath('/'), site.url).href),
      inLanguage: computed(() => localeProperties.value.language),
    }),
    defineWebPage(
      computed(() => ({
        '@type': pageData.type,
        name: title.value,
        description: description.value,
        ...(pageData.keywordKeys?.length ? { keywords: keywords.value } : {}),
        author: identity,
        url: url.value,
        inLanguage: localeProperties.value.language,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: image.value,
          caption: imageAlt.value,
          width: imageWidth,
          height: imageHeight,
        },
        ...(['about', 'about_development', 'about_cv'].includes(page)
          ? { mainEntity: identity }
          : {}),
      }))
    ),
  ])

  return computed(() => ({
    title: title.value,
    titleTemplate: '%s',
    // The module initializes these on first load; keep the graph's default node IDs and actions aligned with the page during client navigation
    templateParams: {
      schemaOrg: {
        url: url.value,
        path: path.value,
      },
    },
  }))
}
