export type ImageSource = {
  src: string
  title?: string
  alt?: string
}

export type Heights = {
  xs: number
  sm: number
  md: number
  lg: number
}

export type ItemInternal = {
  imageSource: ImageSource
  aspect: number
  renderWidth: number
}

export type Row = {
  items: ItemInternal[]
  rowHeight: number
}
