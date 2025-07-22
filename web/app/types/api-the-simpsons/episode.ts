export interface Episode {
  id: number
  airdate: string
  episode_number: number
  image_path: string
  name: string
  season: number
  synopsis: string
}

export interface EpisodePagination {
  count: number
  next: string | null
  prev: string | null
  pages: number
  results: Episode[]
}
