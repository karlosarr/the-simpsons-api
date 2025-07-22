import { LocationPagination } from '@/app/types/api-the-simpsons/location'
import { ApiResponse, apis } from './api'

export async function getLocations(): Promise<ApiResponse<LocationPagination>> {
  const response = await fetch(apis.location.paginated)

  if (!response.ok) {
    return [new Error('Failed to fetch locations'), null]
  }

  const data = (await response.json()) as LocationPagination

  return [null, data]
}
