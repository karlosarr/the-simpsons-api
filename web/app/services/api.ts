export const baseUrl = 'https://thesimpsonsapi.com/api'

export type ApiResponse<Response> = [null, Response] | [Error, null]

export const apis = {
  character: {
    paginated: `${baseUrl}/character`,
    detail: `${baseUrl}/character/`
  },
  episode: {
    paginated: `${baseUrl}/episode`,
    detail: `${baseUrl}/episode/`
  },
  location: {
    paginated: `${baseUrl}/location`,
    detail: `${baseUrl}/location/`
  }
}
