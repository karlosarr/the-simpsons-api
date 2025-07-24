export const baseUrl = 'https://thesimpsonsapi.com/api'

export type ApiResponse<Response> = [null, Response] | [Error, null]

export const apis = {
  character: {
    paginated: `${baseUrl}/characters`,
    detail: `${baseUrl}/characters/`
  },
  episode: {
    paginated: `${baseUrl}/episodes`,
    detail: `${baseUrl}/episodes/`
  },
  location: {
    paginated: `${baseUrl}/locations`,
    detail: `${baseUrl}/locations/`
  }
}
