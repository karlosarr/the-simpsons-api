'use client'

import { Copy, ExternalLink, Check } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useUrlActions } from '@/hooks/use-url-actions'

interface ExampleUrlDisplayProps {
  url: string
  description: string
}

export function ExampleUrlDisplay({ url, description }: ExampleUrlDisplayProps) {
  const { copied, copyToClipboard, openInNewTab } = useUrlActions(url)

  return (
    <div>
      <p className='text-sm text-gray-600 mb-1'>{description}:</p>
      <div className='bg-gray-50 p-3 rounded text-sm'>
        <div className='flex items-center justify-between gap-4'>
          <code className='flex-1 min-w-0'>{url}</code>
          <div className='flex gap-1 flex-shrink-0'>
            <Button
              size='sm'
              variant='ghost'
              onClick={copyToClipboard}
              className='h-6 w-6 p-0 text-gray-500 hover:text-gray-700'
              title='Copy URL'
            >
              {copied ? <Check className='h-3 w-3' /> : <Copy className='h-3 w-3' />}
            </Button>
            <Button
              size='sm'
              variant='ghost'
              onClick={openInNewTab}
              className='h-6 w-6 p-0 text-gray-500 hover:text-gray-700'
              title='Open in new tab'
            >
              <ExternalLink className='h-3 w-3' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
