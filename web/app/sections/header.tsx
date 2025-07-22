import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Github } from 'lucide-react'

export function Header() {
  return (
    <header className='border-b backdrop-blur-sm sticky top-0 z-50'>
      <div className='container mx-auto px-2 py-2 sm:px-4 sm:py-4'>
        <nav className='flex items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <Image
              src='/logo.webp'
              alt='The Simpsons API Logo'
              width={200}
              height={24}
              className='w-36 h-8 sm:w-52 sm:h-10'
            />
          </Link>
          <div className='flex items-center space-x-2 sm:space-x-6'>
            <Link href='#docs' className='hover:text-gray-500 text-sm sm:text-base'>
              Documentation
            </Link>
            <Link href='#example' className='hover:text-gray-500 text-sm sm:text-base'>
              Example
            </Link>
            <Button variant='outline' asChild className='rounded-full border-black h-8 w-8 sm:h-10 sm:w-10'>
              <Link href='https://github.com/Facug03/the-simpsons-api' target='_blank'>
                <Github className='h-4 w-4' />
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
