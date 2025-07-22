import { Header } from '@/sections/header'
import { Hero } from '@/sections/hero'
import { ApiOverview } from '@/sections/api-overview'
import { Documentation } from '@/sections/documentation'
import { Footer } from '@/sections/footer'
import { getCharacters } from '@/services/characters'
import { getEpisodes } from '@/services/episodes'
import { getLocations } from '@/services/locations'

export default async function Home() {
  const [[charactersError, characters], [episodesError, episodes], [locationsError, locations]] = await Promise.all([
    getCharacters(),
    getEpisodes(),
    getLocations()
  ])

  if (charactersError) {
    throw charactersError
  }

  if (episodesError) {
    throw episodesError
  }

  if (locationsError) {
    throw locationsError
  }

  return (
    <div className='bg-sky-50 divide-y'>
      <Header />
      <Hero />
      <ApiOverview characters={characters} />
      <Documentation characters={characters} episodes={episodes} locations={locations} />
      <Footer />
    </div>
  )
}
