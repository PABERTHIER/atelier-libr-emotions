export function generateImageRoutes() {
  const routes = []

  for (const image of imagesConfig) {
    for (const size of image.sizes) {
      routes.push(`/_ipx/w_${size}${image.imagePath}`)
      routes.push(`/_ipx/w_${size}&dpr_2${image.imagePath}`) // For retina displays
    }
  }

  return routes
}

const imagesConfig = [
  {
    imagePath: '/paintings/celestial-collision.webp',
    sizes: [
      20, 30, 35, 40, 80, 100, 125, 130, 150, 160, 175, 180, 200, 250, 260, 300,
      350, 360, 400,
    ],
  },
  {
    imagePath: '/paintings/entangled-echoes.webp',
    sizes: [
      80, 100, 125, 130, 150, 160, 175, 180, 200, 250, 260, 300, 350, 360, 400,
    ],
  },
  {
    imagePath: '/paintings/abstract-autumn.webp',
    sizes: [
      80, 100, 125, 130, 150, 160, 175, 180, 200, 250, 260, 300, 350, 360, 400,
    ],
  },
  {
    imagePath: '/paintings/some-paintings.webp',
    sizes: [150, 200, 250, 300, 400],
  },
  {
    imagePath: '/cv/page_1.webp',
    sizes: [600, 900, 1200],
  },
  {
    imagePath: '/cv/page_2.webp',
    sizes: [600, 900, 1200],
  },
  {
    imagePath: '/wip.gif',
    sizes: [400, 700, 1000],
  },
]
