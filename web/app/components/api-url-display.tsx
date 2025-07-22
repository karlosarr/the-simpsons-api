'use client'

import { Copy, ExternalLink, Check } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useUrlActions } from '@/hooks/use-url-actions'

interface ApiUrlDisplayProps {
  url: string
  showButtons?: boolean
}

export function ApiUrlDisplay({ url, showButtons = true }: ApiUrlDisplayProps) {
  const { copied, copyToClipboard, openInNewTab } = useUrlActions(url)

  return (
    <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <pre className='flex-1 min-w-0 overflow-x-auto'>
          <code className='text-sm'>{url}</code>
        </pre>
        {showButtons && (
          <div className='flex gap-2 flex-shrink-0 self-end sm:self-auto'>
            <Button
              size='sm'
              variant='ghost'
              onClick={copyToClipboard}
              className='text-gray-300 hover:text-white hover:bg-gray-700'
              title='Copy URL'
            >
              {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
            </Button>
            <Button
              size='sm'
              variant='ghost'
              onClick={openInNewTab}
              className='text-gray-300 hover:text-white hover:bg-gray-700'
              title='Open in new tab'
            >
              <ExternalLink className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
