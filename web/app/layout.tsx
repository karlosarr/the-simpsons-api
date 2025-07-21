import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'

import './globals.css'

export const metadata: Metadata = {
  title: 'The Simpsons API',
  description: '',
  icons: {
    icon: '/icon/icon.webp',
    apple: '/icon/apple-icon.webp'
  }
}

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={ubuntu.className}>{children}</body>
    </html>
  )
}
