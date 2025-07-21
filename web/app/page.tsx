import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, MapPin, Film, ImageIcon, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='bg-sky-50 divide-y'>
      {/* Header */}
      <header className='border-b backdrop-blur-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4'>
          <nav className='flex items-center justify-between'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image src='/logo.webp' alt='The Simpsons API Logo' width={200} height={24} />
            </Link>
            <div className='hidden md:flex items-center space-x-6'>
              <Link href='#docs' className=' hover:text-gray-500'>
                Documentation
              </Link>
              <Link href='#example' className=' hover:text-gray-500'>
                Example
              </Link>
              <Button variant='outline' asChild className='rounded-full border-black h-10 w-10'>
                <Link href='https://github.com/Facug03/the-simpsons-api' target='_blank'>
                  <Github className='h-4 w-4' />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className='py-20 text-center'
        style={{ backgroundImage: 'url(/clouds-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='mb-8'>
              <Image src='/hero.webp' alt='The Simpsons API Hero' width={400} height={200} className='mx-auto mb-6' />
            </div>
            <h1 className='text-5xl font-bold text-gray-900 mb-6 sr-only'>The Simpsons API</h1>
            <p className='text-xl text-gray-800 mb-8 max-w-2xl mx-auto'>
              The RESTful API for The Simpsons universe. Access data about characters, episodes, and locations from
              Springfield and beyond.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' asChild>
                <Link href='#docs'>Get Started</Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link href='https://thesimpsonsapi.com/api' target='_blank'>
                  View API <ExternalLink className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* API Overview */}
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
                <CardDescription>1,182+ characters from the series</CardDescription>
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
                <CardDescription>768+ episodes documented</CardDescription>
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
                <CardDescription>477+ locations in Springfield</CardDescription>
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

      {/* Documentation */}
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
                      /api/character
                    </CardTitle>
                    <CardDescription>Get all characters (limited to 20 by default)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                      <pre>
                        <code>{'https://thesimpsonsapi.com/api/character'}</code>
                      </pre>
                    </div>
                    <div className='mt-4'>
                      <h4 className='font-semibold mb-2'>Response Example:</h4>
                      <div className='bg-gray-50 p-4 rounded-lg overflow-x-auto'>
                        <pre className='text-sm'>
                          <code>{`{
  "count": 1182,
  "next": "https://thesimpsonsapi.com/api/character?page=2",
  "prev": null,
  "pages": 60,
  "results": [
    {
      "id": 1,
      "name": "Homer Simpson",
      "age": 39,
      "occupation": "Safety Inspector",
      "portrait_path": "/character/1.webp",
      "status": "Alive",
      "phrases": ["Doh!", "Woo-hoo!"]
    }
  ]
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Badge variant='secondary'>GET</Badge>
                      /api/character/:id
                    </CardTitle>
                    <CardDescription>Get character by ID</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                      <pre>
                        <code>{'https://thesimpsonsapi.com/api/character/1'}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='episodes' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Badge variant='secondary'>GET</Badge>
                      /api/episode
                    </CardTitle>
                    <CardDescription>Get all episodes (limited to 20 by default)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                      <pre>
                        <code>{'https://thesimpsonsapi.com/api/episode'}</code>
                      </pre>
                    </div>
                    <div className='mt-4'>
                      <h4 className='font-semibold mb-2'>Response Example:</h4>
                      <div className='bg-gray-50 p-4 rounded-lg overflow-x-auto'>
                        <pre className='text-sm'>
                          <code>{`{
  "count": 768,
  "results": [
    {
      "id": 1,
      "name": "Simpsons Roasting on an Open Fire",
      "season": 1,
      "episode_number": 1,
      "airdate": "1989-12-17",
      "image_path": "/episode/1.webp",
      "synopsis": "When Mr. Burns announces..."
    }
  ]
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Badge variant='secondary'>GET</Badge>
                      /api/episode/:id
                    </CardTitle>
                    <CardDescription>Get episode by ID</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                      <pre>
                        <code>{'https://thesimpsonsapi.com/api/episode/1'}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='locations' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Badge variant='secondary'>GET</Badge>
                      /api/location
                    </CardTitle>
                    <CardDescription>Get all locations (limited to 20 by default)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                      <pre>
                        <code>{'https://thesimpsonsapi.com/api/location'}</code>
                      </pre>
                    </div>
                    <div className='mt-4'>
                      <h4 className='font-semibold mb-2'>Response Example:</h4>
                      <div className='bg-gray-50 p-4 rounded-lg overflow-x-auto'>
                        <pre className='text-sm'>
                          <code>{`{
  "count": 477,
  "results": [
    {
      "id": 1,
      "name": "742 Evergreen Terrace",
      "town": "Springfield",
      "use": "Residential",
      "image_path": "/location/1.webp"
    }
  ]
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Badge variant='secondary'>GET</Badge>
                      /api/location/:id
                    </CardTitle>
                    <CardDescription>Get location by ID</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                      <pre>
                        <code>{'https://thesimpsonsapi.com/api/location/1'}</code>
                      </pre>
                    </div>
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
                      <div className='bg-gray-900 text-gray-100 p-4 rounded-lg'>
                        <pre>
                          <code>{'https://cdn.thesimpsonsapi.com/{size}{image_path}'}</code>
                        </pre>
                      </div>
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
                        <div>
                          <p className='text-sm text-gray-600 mb-1'>Character Portrait (500px):</p>
                          <div className='bg-gray-50 p-3 rounded text-sm'>
                            <code>https://cdn.thesimpsonsapi.com/500/character/1.webp</code>
                          </div>
                        </div>
                        <div>
                          <p className='text-sm text-gray-600 mb-1'>Episode Image (200px):</p>
                          <div className='bg-gray-50 p-3 rounded text-sm'>
                            <code>https://cdn.thesimpsonsapi.com/200/episode/1.webp</code>
                          </div>
                        </div>
                        <div>
                          <p className='text-sm text-gray-600 mb-1'>Location Image (1280px):</p>
                          <div className='bg-gray-50 p-3 rounded text-sm'>
                            <code>https://cdn.thesimpsonsapi.com/1280/location/1.webp</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Popular Characters */}
      <section id='example' className='py-16 '>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Popular Characters</h2>
            <p className='text-gray-600'>Meet some of the most iconic characters from Springfield</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
            {[
              {
                id: 1,
                name: 'Homer Simpson',
                age: 39,
                occupation: 'Safety Inspector',
                status: 'Alive',
                portrait_path: '/character/1.webp',
                phrases: ['Doh!', 'Woo-hoo!', 'Mmm... beer...']
              },
              {
                id: 2,
                name: 'Marge Simpson',
                age: 39,
                occupation: 'Unemployed',
                status: 'Alive',
                portrait_path: '/character/2.webp',
                phrases: ['Hrmmm...', 'Oh, Homie!', "Now it's Marge's time to shine!"]
              },
              {
                id: 3,
                name: 'Bart Simpson',
                age: 10,
                occupation: 'Student at Springfield Elementary School',
                status: 'Alive',
                portrait_path: '/character/3.webp',
                phrases: ['¡Ay Caramba!', 'Eat my shorts!', "Don't have a cow, man."]
              },
              {
                id: 4,
                name: 'Lisa Simpson',
                age: 8,
                occupation: 'Student at Springfield Elementary School',
                status: 'Alive',
                portrait_path: '/character/4.webp',
                phrases: ['Bart!', "If anyone wants me, I'll be in my room.", 'The truth must be told.']
              }
            ].map((character) => (
              <Card key={character.id} className='text-center'>
                <CardHeader className='pb-2'>
                  <div className='mx-auto mb-4 relative'>
                    <div className='w-32 h-32 mx-auto rounded-lg overflow-hidden shadow-lg'>
                      <Image
                        src={`https://cdn.thesimpsonsapi.com/500${character.portrait_path}`}
                        alt={character.name}
                        width={128}
                        height={128}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                  <CardTitle className='text-lg font-bold '>{character.name}</CardTitle>
                  <CardDescription className='text-sm text-gray-600 min-h-[2.5rem] flex items-center justify-center'>
                    {character.occupation}
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-0 space-y-2'>
                  <div className='flex justify-center gap-2'>
                    <Badge variant='outline' className='text-xs'>
                      Age: {character.age}
                    </Badge>
                    <Badge variant='outline' className='text-xs bg-green-50 text-green-700'>
                      {character.status}
                    </Badge>
                  </div>
                  <div className='text-xs text-gray-500 italic'>"{character.phrases[0]}"</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=' py-12'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <div className='flex items-center justify-center  mb-4'>
              <Image src='/logo.webp' alt='The Simpsons API Logo' width={200} height={24} />
            </div>
            <p className='text-gray-600 mb-6'>The RESTful API for The Simpsons universe</p>
            <div className='flex justify-center space-x-6'>
              <Link href='https://thesimpsonsapi.com/api' className='text-gray-700 hover:text-gray-400'>
                API Endpoint
              </Link>
              <Link href='#docs' className='text-gray-700 hover:text-gray-400'>
                Documentation
              </Link>
              <Link href='#example' className='text-gray-700 hover:text-gray-400'>
                Example
              </Link>
            </div>
            <div className='pt-8'>
              <p className='text-gray-500 text-sm'>
                © 2024 The Simpsons API. Built by{' '}
                <Link
                  href='https://github.com/Facug03'
                  target='_blank'
                  className='text-gray-700 hover:text-gray-400 font-semibold underline'
                >
                  FacuG03
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
