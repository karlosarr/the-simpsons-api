import { EpisodePagination } from '@/app/types/api-the-simpsons/episode'
import { ApiResponse, apis } from './api'

export async function getEpisodes(): Promise<ApiResponse<EpisodePagination>> {
  const response = await fetch(apis.episode.paginated)

  if (!response.ok) {
    return [new Error('Failed to fetch episodes'), null]
  }

  const data = (await response.json()) as EpisodePagination

  return [null, data]
}
