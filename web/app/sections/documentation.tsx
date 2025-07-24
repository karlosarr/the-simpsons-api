import { ImageIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { CharacterPagination } from '@/types/api-the-simpsons/character'
import { EpisodePagination } from '@/types/api-the-simpsons/episode'
import { LocationPagination } from '@/types/api-the-simpsons/location'
import { ApiUrlDisplay } from '@/components/api-url-display'
import { ExampleUrlDisplay } from '@/components/example-url-display'
import { JsonDisplay } from '@/components/json-display'

export function Documentation({
  characters,
  episodes,
  locations
}: {
  characters: CharacterPagination
  episodes: EpisodePagination
  locations: LocationPagination
}) {
  return (
    <section id='docs' className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>API Documentation</h2>
          <p className='text-gray-600'>Learn how to use The Simpsons API endpoints</p>
        </div>

        <div className='max-w-4xl mx-auto'>
          <Tabs defaultValue='characters' className='w-full'>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='characters'>Characters</TabsTrigger>
              <TabsTrigger value='episodes'>Episodes</TabsTrigger>
              <TabsTrigger value='locations'>Locations</TabsTrigger>
              <TabsTrigger value='images'>Images</TabsTrigger>
            </TabsList>

            <TabsContent value='characters' className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Badge variant='secondary'>GET</Badge>
                    /api/characters
                  </CardTitle>
                  <CardDescription>Get all characters (limited to 20 by default)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiUrlDisplay url='https://thesimpsonsapi.com/api/characters' />
                  <div className='mt-4'>
                    <h4 className='font-semibold mb-2'>Response Example:</h4>
                    <JsonDisplay data={{ ...characters, results: characters.results.slice(0, 1) }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Badge variant='secondary'>GET</Badge>
                    /api/characters/:id
                  </CardTitle>
                  <CardDescription>Get character by ID</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiUrlDisplay url='https://thesimpsonsapi.com/api/characters/1' />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='episodes' className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Badge variant='secondary'>GET</Badge>
                    /api/episodes
                  </CardTitle>
                  <CardDescription>Get all episodes (limited to 20 by default)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiUrlDisplay url='https://thesimpsonsapi.com/api/episodes' />
                  <div className='mt-4'>
                    <h4 className='font-semibold mb-2'>Response Example:</h4>
                    <JsonDisplay data={{ ...episodes, results: episodes.results.slice(0, 1) }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Badge variant='secondary'>GET</Badge>
                    /api/episodes/:id
                  </CardTitle>
                  <CardDescription>Get episodes by ID</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiUrlDisplay url='https://thesimpsonsapi.com/api/episodes/1' />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='locations' className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Badge variant='secondary'>GET</Badge>
                    /api/locations
                  </CardTitle>
                  <CardDescription>Get all locations (limited to 20 by default)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiUrlDisplay url='https://thesimpsonsapi.com/api/locations' />
                  <div className='mt-4'>
                    <h4 className='font-semibold mb-2'>Response Example:</h4>
                    <JsonDisplay data={{ ...locations, results: locations.results.slice(0, 1) }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Badge variant='secondary'>GET</Badge>
                    /api/locations/:id
                  </CardTitle>
                  <CardDescription>Get locations by ID</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiUrlDisplay url='https://thesimpsonsapi.com/api/locations/1' />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='images' className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <ImageIcon className='h-5 w-5' />
                    CDN Images
                  </CardTitle>
                  <CardDescription>How to use images from the CDN</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <h4 className='font-semibold mb-2'>Image URL Pattern:</h4>
                    <ApiUrlDisplay url='https://cdn.thesimpsonsapi.com/{size}{image_path}' showButtons={false} />
                  </div>

                  <div>
                    <h4 className='font-semibold mb-2'>Available Sizes:</h4>
                    <div className='flex gap-2'>
                      <Badge variant='outline'>200px</Badge>
                      <Badge variant='outline'>500px</Badge>
                      <Badge variant='outline'>1280px</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className='font-semibold mb-2'>Examples:</h4>
                    <div className='space-y-3'>
                      <ExampleUrlDisplay
                        url='https://cdn.thesimpsonsapi.com/500/character/1.webp'
                        description='Character Portrait (500px)'
                      />
                      <ExampleUrlDisplay
                        url='https://cdn.thesimpsonsapi.com/200/episode/1.webp'
                        description='Episode Image (200px)'
                      />
                      <ExampleUrlDisplay
                        url='https://cdn.thesimpsonsapi.com/1280/location/1.webp'
                        description='Location Image (1280px)'
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
