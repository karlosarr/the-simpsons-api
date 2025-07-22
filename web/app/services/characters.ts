import { CharacterPagination } from '@/app/types/api-the-simpsons/character'
import { ApiResponse, apis } from './api'

export async function getCharacters(): Promise<ApiResponse<CharacterPagination>> {
  const response = await fetch(apis.character.paginated)

  if (!response.ok) {
    return [new Error('Failed to fetch characters'), null]
  }

  const data = (await response.json()) as CharacterPagination

  return [null, data]
}
