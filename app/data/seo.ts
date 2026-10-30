import type { PageName, PageSeoDefinition } from '../types/seo'

// Shared by Nuxt Robots (HTTP/SSR), content pages and error recovery (client)
export const robotsContent = {
  indexable:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  blocked: 'noindex, nofollow',
} as const

const artKeywordKeys = [
  'miscellaneous.art',
  'miscellaneous.artist',
  'miscellaneous.emotions',
] as const

const paintingKeywordKeys = [
  ...artKeywordKeys,
  'miscellaneous.painting',
  'miscellaneous.painter',
] as const

const ceramicKeywordKeys = [
  ...artKeywordKeys,
  'miscellaneous.ceramic',
  'miscellaneous.ceramicist',
  'miscellaneous.pottery',
] as const

const studioKeywordKeys = [
  ...paintingKeywordKeys,
  ...ceramicKeywordKeys,
] as const

const numberedImages = (directory: string, prefix: string, count: number) =>
  Array.from(
    { length: count },
    (_, index) => `${directory}/${prefix}${index + 1}.webp`
  )

// Keep each selected artwork with its existing translated description
// Sitemap images describe content available on the page, including its viewer
export const pageSeo: Record<PageName, PageSeoDefinition> = {
  home: {
    path: '/',
    type: 'WebPage',
    image: '/paintings/celestial-collision.webp',
    imageAlt: 'pictures.carousel.celestial_collision.alt',
    keywordKeys: studioKeywordKeys,
    images: [
      '/paintings/celestial-collision.webp',
      '/paintings/abstract-autumn.webp',
      '/paintings/acrylic/abstracts/AutomaticPainting2.webp',
      '/paintings/inks/nature/EC10.webp',
      '/paintings/mixed_technique/nature/TMn9.webp',
      '/ceramics/electric_kiln/animals/cats/Cats14.webp',
      '/ceramics/electric_kiln/animals/snails/Snails5.webp',
      '/ceramics/electric_kiln/animals/birds/Birds5.webp',
      '/ceramics/electric_kiln/animals/tortoises/Tortoises8.webp',
      '/ceramics/electric_kiln/nature/flowers/F7.webp',
      '/ceramics/electric_kiln/nature/leaves/Feuilles8.webp',
      '/ceramics/electric_kiln/various_objects/boxes/Sgraffitto4.webp',
      '/ceramics/electric_kiln/vases_and_pots/intuitive_pots/PotsIntuitifs7.webp',
      '/ceramics/electric_kiln/vases_and_pots/single_flower_vases/Soliflores10.webp',
      '/ceramics/electric_kiln/vases_and_pots/round_vases/VasesRonds4.webp',
      '/ceramics/porcelain/nature/flowers/FP13.webp',
      '/ceramics/CeramicInProgress.webp',
      '/og-images/contact.webp',
      '/og-images/cv.webp',
      '/og-images/my_artistic_approach.webp',
      '/og-images/my_development.webp',
    ],
  },
  about: {
    path: '/about',
    type: 'AboutPage',
    image: '/og-images/my_artistic_approach.webp',
    imageAlt: 'pictures.carousel.my_artistic_approach.alt',
    keywordKeys: [
      ...studioKeywordKeys,
      'miscellaneous.my_artistic_approach',
      'miscellaneous.creation',
      'miscellaneous.activity_leader',
    ],
    images: [],
  },
  about_development: {
    path: '/about/development',
    type: 'AboutPage',
    image: '/og-images/my_development.webp',
    imageAlt: 'pictures.carousel.my_development.alt',
    keywordKeys: [
      ...studioKeywordKeys,
      'miscellaneous.my_development',
      'miscellaneous.development',
      'miscellaneous.artistic_journey',
    ],
    images: [],
  },
  about_cv: {
    path: '/about/cv',
    type: 'AboutPage',
    image: '/og-images/cv.webp',
    imageAlt: 'pictures.carousel.nature.alt',
    keywordKeys: [
      ...studioKeywordKeys,
      'miscellaneous.my_cv',
      'miscellaneous.cv',
      'miscellaneous.exhibitions',
      'miscellaneous.events',
      'miscellaneous.experiences',
      'miscellaneous.performances',
      'miscellaneous.activity_leader',
    ],
    images: ['/cv/page_1.webp', '/cv/page_2.webp'],
  },
  contact: {
    path: '/contact',
    type: 'ContactPage',
    image: '/og-images/contact.webp',
    imageAlt: 'pictures.carousel.creations.alt',
    keywordKeys: [
      ...studioKeywordKeys,
      'miscellaneous.contact',
      'app.meta.alt_name_1',
      'app.meta.alt_name_2',
      'app.meta.alt_name_3',
      'app.meta.alt_name_4',
      'app.meta.alt_name_5',
      'app.meta.alt_name_6',
      'app.meta.alt_name_7',
      'about.first_name',
      'about.last_name',
      'about.username',
    ],
    images: ['/misc/contact.webp'],
  },
  painting_acrylic_abstracts: {
    path: '/painting/acrylic/abstracts',
    type: 'CollectionPage',
    image: '/paintings/acrylic/abstracts/AutomaticPainting2.webp',
    imageAlt: 'pictures.paintings.acrylic.abstracts.automatic_painting_2.alt',
    keywordKeys: [
      ...paintingKeywordKeys,
      'miscellaneous.acrylic',
      'miscellaneous.abstracts',
      'miscellaneous.haphazardly',
      'miscellaneous.mish_mash',
      'miscellaneous.automatic_painting',
      'miscellaneous.abstract_art',
      'miscellaneous.nature',
      'miscellaneous.animals',
    ],
    images: numberedImages(
      '/paintings/acrylic/abstracts',
      'AutomaticPainting',
      10
    ),
  },
  painting_oil_abstracts: {
    path: '/painting/oil/abstracts',
    type: 'ItemPage',
    image: '/paintings/abstract-autumn.webp',
    imageAlt: 'pictures.paintings.abstract_autumn.alt',
    keywordKeys: [
      ...paintingKeywordKeys,
      'miscellaneous.abstracts',
      'miscellaneous.abstract_art',
    ],
    images: ['/paintings/abstract-autumn.webp'],
  },
  painting_inks_nature: {
    path: '/painting/inks/nature',
    type: 'CollectionPage',
    image: '/paintings/inks/nature/EC10.webp',
    imageAlt: 'pictures.paintings.inks.nature.ec10.alt',
    keywordKeys: [
      ...paintingKeywordKeys,
      'miscellaneous.inks',
      'miscellaneous.indian_inks',
      'miscellaneous.abstracts',
      'miscellaneous.abstract_art',
      'miscellaneous.nature',
      'miscellaneous.landscape',
      'miscellaneous.roots',
      'miscellaneous.trees',
      'miscellaneous.water',
      'miscellaneous.water_jet',
    ],
    images: numberedImages('/paintings/inks/nature', 'EC', 10),
  },
  painting_mixed_technique_nature: {
    path: '/painting/mixed-technique/nature',
    type: 'CollectionPage',
    image: '/paintings/mixed_technique/nature/TMn9.webp',
    imageAlt: 'pictures.paintings.mixed_technique.nature.tmn9.alt',
    keywordKeys: [
      ...paintingKeywordKeys,
      'miscellaneous.mixed_technique',
      'miscellaneous.nature',
      'miscellaneous.landscape',
      'miscellaneous.trees',
    ],
    images: numberedImages('/paintings/mixed_technique/nature', 'TMn', 14),
  },
  ceramic_electric_kiln_nature: {
    path: '/ceramic/electric-kiln/nature',
    type: 'CollectionPage',
    image: '/ceramics/electric_kiln/nature/flowers/F8.webp',
    imageAlt: 'pictures.ceramics.electric_kiln.nature.flowers.f8.alt',
    keywordKeys: [
      ...ceramicKeywordKeys,
      'miscellaneous.electric_kiln',
      'miscellaneous.nature',
      'miscellaneous.flowers',
      'miscellaneous.leaves',
    ],
    images: [
      ...numberedImages('/ceramics/electric_kiln/nature/flowers', 'F', 10),
      ...numberedImages('/ceramics/electric_kiln/nature/flowers', 'GF', 7),
      ...numberedImages(
        '/ceramics/electric_kiln/nature/leaves',
        'Feuilles',
        11
      ),
    ],
  },
  ceramic_electric_kiln_animals: {
    path: '/ceramic/electric-kiln/animals',
    type: 'CollectionPage',
    image: '/ceramics/electric_kiln/animals/tortoises/Tortoises8.webp',
    imageAlt:
      'pictures.ceramics.electric_kiln.animals.tortoises.tortoises8.alt',
    keywordKeys: [
      ...ceramicKeywordKeys,
      'miscellaneous.electric_kiln',
      'miscellaneous.animals',
      'miscellaneous.cats',
      'miscellaneous.snails',
      'miscellaneous.birds',
      'miscellaneous.tortoises',
    ],
    images: [
      ...numberedImages('/ceramics/electric_kiln/animals/cats', 'Cats', 15),
      ...numberedImages('/ceramics/electric_kiln/animals/snails', 'Snails', 8),
      ...numberedImages('/ceramics/electric_kiln/animals/birds', 'Birds', 14),
      ...numberedImages(
        '/ceramics/electric_kiln/animals/tortoises',
        'Tortoises',
        8
      ),
    ],
  },
  ceramic_electric_kiln_vases_and_pots: {
    path: '/ceramic/electric-kiln/vases-and-pots',
    type: 'CollectionPage',
    image:
      '/ceramics/electric_kiln/vases_and_pots/single_flower_vases/Soliflores10.webp',
    imageAlt:
      'pictures.ceramics.electric_kiln.vases_and_pots.single_flower_vases.soliflores10.alt',
    keywordKeys: [
      ...ceramicKeywordKeys,
      'miscellaneous.electric_kiln',
      'miscellaneous.vases_and_pots',
      'miscellaneous.intuitive_pots',
      'miscellaneous.single_flower_vases',
      'miscellaneous.round_vases',
    ],
    images: [
      ...numberedImages(
        '/ceramics/electric_kiln/vases_and_pots/intuitive_pots',
        'PotsIntuitifs',
        15
      ),
      ...numberedImages(
        '/ceramics/electric_kiln/vases_and_pots/single_flower_vases',
        'Soliflores',
        10
      ),
      ...numberedImages(
        '/ceramics/electric_kiln/vases_and_pots/round_vases',
        'VasesRonds',
        6
      ),
    ],
  },
  ceramic_electric_kiln_various_objects: {
    path: '/ceramic/electric-kiln/various-objects',
    type: 'CollectionPage',
    image: '/ceramics/electric_kiln/various_objects/boxes/Sgraffitto4.webp',
    imageAlt: 'pictures.ceramics.electric_kiln.various_objects.sgraffitto4.alt',
    keywordKeys: [
      ...ceramicKeywordKeys,
      'miscellaneous.electric_kiln',
      'miscellaneous.various_objects',
      'miscellaneous.boxes',
    ],
    images: [
      ...numberedImages(
        '/ceramics/electric_kiln/various_objects/boxes',
        'Boite',
        9
      ),
      '/ceramics/electric_kiln/various_objects/boxes/BoiteOeuf.webp',
      ...numberedImages(
        '/ceramics/electric_kiln/various_objects/boxes',
        'Sgraffitto',
        6
      ),
    ],
  },
  ceramic_porcelain_nature: {
    path: '/ceramic/porcelain/nature',
    type: 'CollectionPage',
    image: '/ceramics/porcelain/nature/flowers/FP13.webp',
    imageAlt: 'pictures.ceramics.porcelain.nature.fp13.alt',
    keywordKeys: [
      ...ceramicKeywordKeys,
      'miscellaneous.porcelain',
      'miscellaneous.nature',
      'miscellaneous.flowers',
    ],
    images: numberedImages('/ceramics/porcelain/nature/flowers', 'FP', 15),
  },
  ceramic_raku_smouldering_nature: {
    path: '/ceramic/raku-smouldering/nature',
    type: 'CollectionPage',
    image: '/ceramics/raku_smouldering/nature/FR1.webp',
    imageAlt: 'pictures.ceramics.raku_smouldering.nature.fr1.alt',
    keywordKeys: [
      ...ceramicKeywordKeys,
      'miscellaneous.raku_and_smouldering',
      'miscellaneous.nature',
      'miscellaneous.flowers',
    ],
    images: ['/ceramics/raku_smouldering/nature/FR1.webp'],
  },
  wip: {
    path: '/wip',
    type: 'WebPage',
    image: '/paintings/celestial-collision.webp',
    imageAlt: 'pictures.carousel.celestial_collision.alt',
    images: [],
    indexable: false,
  },
}
