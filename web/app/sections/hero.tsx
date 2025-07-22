import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { Button } from '@/app/components/ui/button'

export function Hero() {
  return (
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
  )
}
