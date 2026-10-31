export interface NavigationLink {
  label: string
  path: string
}

export interface NavigationGroup {
  label: string
  links: NavigationLink[]
}

export interface NavigationSection {
  id: string
  label: string
  groups: NavigationGroup[]
}
