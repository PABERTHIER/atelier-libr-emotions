import type { imageDimensions } from '~/data/imageDimensions'

export type PageName =
  | 'home'
  | 'about'
  | 'about_development'
  | 'about_cv'
  | 'contact'
  | 'painting_acrylic_abstracts'
  | 'painting_oil_abstracts'
  | 'painting_inks_nature'
  | 'painting_mixed_technique_nature'
  | 'ceramic_electric_kiln_nature'
  | 'ceramic_electric_kiln_animals'
  | 'ceramic_electric_kiln_vases_and_pots'
  | 'ceramic_electric_kiln_various_objects'
  | 'ceramic_porcelain_nature'
  | 'ceramic_raku_smouldering_nature'
  | 'wip'

export interface PageSeoDefinition {
  path: string
  type: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'ContactPage' | 'ItemPage'
  image: keyof typeof imageDimensions
  imageAlt: string
  images: readonly string[]
  keywordKeys?: readonly string[]
  indexable?: boolean
}
