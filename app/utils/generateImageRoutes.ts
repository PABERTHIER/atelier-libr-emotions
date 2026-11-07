export function generateImageRoutes() {
  const routes = []

  for (const image of imagesConfig) {
    for (const size of image.sizes) {
      routes.push(`/_ipx/w_${size}${image.imagePath}`)
      routes.push(`/_ipx/w_${size}&dpr_2${image.imagePath}`) // For retina displays
    }

    routes.push(`/_ipx/q_50&blur_3&s_10x10/${image.imagePath}`)
  }

  return routes
}

const imagesConfig: { imagePath: string; sizes: number[] }[] = []
