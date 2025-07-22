import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
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
  )
}
