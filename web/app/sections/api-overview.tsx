import { Users, MapPin, Film } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CharacterPagination } from '@/types/api-the-simpsons/character'
import { EpisodePagination } from '@/types/api-the-simpsons/episode'
import { LocationPagination } from '@/types/api-the-simpsons/location'

export function ApiOverview({
  characters,
  episodes,
  locations
}: {
  characters: CharacterPagination
  episodes: EpisodePagination
  locations: LocationPagination
}) {
  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>API Overview</h2>
          <p className='text-gray-700 max-w-2xl mx-auto'>
            Access comprehensive data about The Simpsons universe through our RESTful API endpoints.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          <Card>
            <CardHeader>
              <Users className='h-8 w-8 mb-2' />
              <CardTitle>Characters</CardTitle>
              <CardDescription>{characters.count}+ characters from the series</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600'>
                Get detailed information about every character including their age, occupation, phrases, and portrait
                images.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Film className='h-8 w-8 mb-2' />
              <CardTitle>Episodes</CardTitle>
              <CardDescription>{episodes.count}+ episodes documented</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600'>
                Access episode data including air dates, synopses, season information, and episode images.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className='h-8 w-8 mb-2' />
              <CardTitle>Locations</CardTitle>
              <CardDescription>{locations.count}+ locations in Springfield</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600'>
                Explore iconic locations from Springfield including homes, businesses, and landmarks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
