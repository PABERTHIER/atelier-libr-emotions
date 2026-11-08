import type { NavigationSection } from '~/types/navigation'

export const navigationSections: NavigationSection[] = [
  {
    id: 'painting',
    label: 'miscellaneous.painting',
    groups: [
      {
        label: 'miscellaneous.acrylic',
        links: [
          {
            label: 'miscellaneous.abstracts',
            path: '/painting/acrylic/abstracts',
          },
          { label: 'miscellaneous.faces', path: '/wip' },
          { label: 'miscellaneous.nature', path: '/wip' },
          { label: 'miscellaneous.miscellaneous', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.oil_painting',
        links: [
          { label: 'miscellaneous.abstracts', path: '/painting/oil/abstracts' },
          { label: 'miscellaneous.faces', path: '/wip' },
          { label: 'miscellaneous.nudes', path: '/wip' },
          { label: 'miscellaneous.nature', path: '/wip' },
          { label: 'miscellaneous.miscellaneous', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.inks',
        links: [
          { label: 'miscellaneous.abstracts', path: '/wip' },
          { label: 'miscellaneous.faces', path: '/wip' },
          { label: 'miscellaneous.nudes', path: '/wip' },
          { label: 'miscellaneous.nature', path: '/painting/inks/nature' },
          { label: 'miscellaneous.miscellaneous', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.charcoal',
        links: [
          { label: 'miscellaneous.faces', path: '/wip' },
          { label: 'miscellaneous.nudes', path: '/wip' },
          { label: 'miscellaneous.miscellaneous', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.pastel',
        links: [
          { label: 'miscellaneous.abstracts', path: '/wip' },
          { label: 'miscellaneous.faces', path: '/wip' },
          { label: 'miscellaneous.nudes', path: '/wip' },
          { label: 'miscellaneous.nature', path: '/wip' },
          { label: 'miscellaneous.miscellaneous', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.mixed_technique',
        links: [
          { label: 'miscellaneous.abstracts', path: '/wip' },
          { label: 'miscellaneous.faces', path: '/wip' },
          { label: 'miscellaneous.nudes', path: '/wip' },
          {
            label: 'miscellaneous.nature',
            path: '/painting/mixed-technique/nature',
          },
          { label: 'miscellaneous.miscellaneous', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.miscellaneous',
        links: [
          { label: 'miscellaneous.felt_pen', path: '/wip' },
          { label: 'miscellaneous.quick_work', path: '/wip' },
          { label: 'miscellaneous.christmas', path: '/wip' },
        ],
      },
    ],
  },
  {
    id: 'ceramic',
    label: 'miscellaneous.ceramic',
    groups: [
      {
        label: 'miscellaneous.electric_kiln',
        links: [
          {
            label: 'miscellaneous.nature',
            path: '/ceramic/electric-kiln/nature',
          },
          {
            label: 'miscellaneous.animals',
            path: '/ceramic/electric-kiln/animals',
          },
          { label: 'miscellaneous.person', path: '/wip' },
          {
            label: 'miscellaneous.vases_and_pots',
            path: '/ceramic/electric-kiln/vases-and-pots',
          },
          {
            label: 'miscellaneous.various_objects',
            path: '/ceramic/electric-kiln/various-objects',
          },
          { label: 'miscellaneous.easter', path: '/wip' },
          { label: 'miscellaneous.christmas', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.raku_and_smouldering',
        links: [
          {
            label: 'miscellaneous.nature',
            path: '/ceramic/raku-smouldering/nature',
          },
          { label: 'miscellaneous.animals', path: '/wip' },
          { label: 'miscellaneous.person', path: '/wip' },
          { label: 'miscellaneous.vases_and_pots', path: '/wip' },
          { label: 'miscellaneous.various_objects', path: '/wip' },
          { label: 'miscellaneous.easter', path: '/wip' },
          { label: 'miscellaneous.christmas', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.porcelain',
        links: [
          { label: 'miscellaneous.nature', path: '/ceramic/porcelain/nature' },
          { label: 'miscellaneous.candle_holders', path: '/wip' },
          { label: 'miscellaneous.vases_and_pots', path: '/wip' },
          { label: 'miscellaneous.miscellaneous', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.miscellaneous',
        links: [
          { label: 'miscellaneous.before_after', path: '/wip' },
          { label: 'miscellaneous.ceramics_in_context', path: '/wip' },
          { label: 'miscellaneous.raku_firing', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.wheel_pottery',
        links: [{ label: 'miscellaneous.first_creations', path: '/wip' }],
      },
    ],
  },
  {
    id: 'events',
    label: 'miscellaneous.events',
    groups: [
      {
        label: 'miscellaneous.exhibitions',
        links: [
          { label: 'miscellaneous.2011_2019', path: '/wip' },
          { label: 'miscellaneous.2020_2022', path: '/wip' },
          { label: 'miscellaneous.2023_2025', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.performances',
        links: [
          { label: 'miscellaneous.life_is_love', path: '/wip' },
          { label: 'miscellaneous.collaborative_painting', path: '/wip' },
        ],
      },
      {
        label: 'miscellaneous.miscellaneous_projects',
        links: [
          { label: 'miscellaneous.painting_while_dancing', path: '/wip' },
          { label: 'miscellaneous.collective_work', path: '/wip' },
          { label: 'miscellaneous.ceramic_courses', path: '/wip' },
        ],
      },
    ],
  },
  {
    id: 'artist',
    label: 'miscellaneous.the_artist',
    groups: [
      {
        label: 'miscellaneous.about_myself',
        links: [
          { label: 'miscellaneous.my_development', path: '/about/development' },
          { label: 'miscellaneous.my_artistic_approach', path: '/about' },
          { label: 'miscellaneous.my_cv', path: '/about/cv' },
        ],
      },
      {
        label: 'miscellaneous.in_action',
        links: [
          { label: 'miscellaneous.painting', path: '/wip' },
          { label: 'miscellaneous.ceramic', path: '/wip' },
        ],
      },
    ],
  },
]
