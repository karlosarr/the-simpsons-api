import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import Script from 'next/script'

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
      <Script src='https://cloud.umami.is/script.js' data-website-id='a8de3e62-e698-4ac0-84ab-fad69aaeb376' defer />
    </html>
  )
}
