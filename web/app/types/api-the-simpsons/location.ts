export interface Location {
  id: number
  name: string
  image_path: string
  town: string
  use: string
}

export interface LocationPagination {
  count: number
  next: string | null
  prev: string | null
  pages: number
  results: Location[]
}
