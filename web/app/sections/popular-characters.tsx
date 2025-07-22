import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CharacterPagination } from '@/types/api-the-simpsons/character'

export function PopularCharacters({ characters }: { characters: CharacterPagination }) {
  return (
    <section id='example' className='py-16 '>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Popular Characters</h2>
          <p className='text-gray-600'>Meet some of the most iconic characters from Springfield</p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {characters.results.map(({ id, name, portrait_path, age, status, phrases, occupation }) => (
            <Card key={id} className='text-center'>
              <CardHeader className='pb-2'>
                <div className='mx-auto mb-4 relative'>
                  <div className='w-32 h-32 mx-auto rounded-lg overflow-hidden shadow-lg'>
                    <Image
                      src={`https://cdn.thesimpsonsapi.com/500${portrait_path}`}
                      alt={name}
                      width={128}
                      height={128}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <CardTitle className='text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap'>
                  {name}
                </CardTitle>
                <CardDescription className='text-sm text-gray-600 min-h-[2.5rem] flex items-center justify-center line-clamp-2'>
                  {occupation}
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-0 space-y-2'>
                <div className='flex justify-center gap-2'>
                  {!!age && (
                    <Badge variant='outline' className='text-xs'>
                      Age: {age}
                    </Badge>
                  )}
                  {status === 'Alive' ? (
                    <Badge variant='outline' className='text-xs bg-green-50 text-green-700'>
                      {status}
                    </Badge>
                  ) : (
                    <Badge variant='outline' className='text-xs bg-red-50 text-red-700'>
                      {status}
                    </Badge>
                  )}
                </div>
                {phrases.length > 0 && (
                  <div className='text-xs text-gray-500 italic'>"{phrases.find((phrase) => phrase.length < 50)}"</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
