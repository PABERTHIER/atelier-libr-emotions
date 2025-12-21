export type ImageSource = {
  src: string
  title?: string
  mobileTitle?: string
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
  isOnError: boolean
}

export type Row = {
  items: ItemInternal[]
  rowHeight: number
}
