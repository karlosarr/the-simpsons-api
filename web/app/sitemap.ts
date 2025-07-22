import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://thesimpsonsapi.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    }
  ]
}
