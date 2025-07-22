import Image from 'next/image'

import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'

export function PopularCharacters() {
  return (
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
  )
}
