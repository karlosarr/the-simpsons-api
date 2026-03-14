import { Test } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

import { EpisodeService } from '@/src/modules/episode/episode.service'
import { DatabaseService } from '@/src/modules/database/database.service'
import { EpisodeObjectMother } from './episode-mother'

describe('EpisodeService', () => {
  let episodeService: EpisodeService

  const mockDatabaseService = {
    episode: {
      createManyAndReturn: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn()
    }
  }

  const mockCacheManager = {
    get: vi.fn(),
    set: vi.fn()
  }

  const mockConfigService = {
    get: vi.fn().mockReturnValue('http://localhost:3000')
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EpisodeService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: ConfigService, useValue: mockConfigService }
      ]
    }).compile()

    episodeService = moduleRef.get<EpisodeService>(EpisodeService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create episodes and return them', async () => {
      const episode = EpisodeObjectMother.create()
      mockDatabaseService.episode.createManyAndReturn.mockResolvedValue([episode])

      const result = await episodeService.create(episode)

      expect(result).toEqual([episode])
      expect(mockDatabaseService.episode.createManyAndReturn).toHaveBeenCalledWith({ data: episode })
    })
  })

  describe('findOne', () => {
    it('should return an episode when found', async () => {
      const episode = EpisodeObjectMother.create()
      mockDatabaseService.episode.findUnique.mockResolvedValue(episode)

      const result = await episodeService.findOne(episode.id)

      expect(result).toEqual(episode)
      expect(mockDatabaseService.episode.findUnique).toHaveBeenCalledWith({ where: { id: episode.id } })
    })

    it('should return null when episode not found', async () => {
      mockDatabaseService.episode.findUnique.mockResolvedValue(null)

      const result = await episodeService.findOne(999)

      expect(result).toBeNull()
    })
  })

  describe('findPaginated', () => {
    it('should return paginated episodes from DB when cache is empty', async () => {
      const episode = EpisodeObjectMother.create()
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.episode.count.mockResolvedValue(1)
      mockDatabaseService.episode.findMany.mockResolvedValue([episode])

      const result = await episodeService.findPaginated(1)

      expect(result.count).toBe(1)
      expect(result.pages).toBe(1)
      expect(result.next).toBeNull()
      expect(result.prev).toBeNull()
      expect(result.results).toEqual([episode])
    })

    it('should use cached count and skip DB count query', async () => {
      const episode = EpisodeObjectMother.create()
      mockCacheManager.get.mockResolvedValue(40)
      mockDatabaseService.episode.findMany.mockResolvedValue([episode])

      await episodeService.findPaginated(1)

      expect(mockDatabaseService.episode.count).not.toHaveBeenCalled()
    })

    it('should cache the count after first DB query', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.episode.count.mockResolvedValue(20)
      mockDatabaseService.episode.findMany.mockResolvedValue([])

      await episodeService.findPaginated(1)

      expect(mockCacheManager.set).toHaveBeenCalledWith('episode-count', 20, expect.any(Number))
    })

    it('should return next page URL when more pages exist', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.episode.count.mockResolvedValue(40)
      mockDatabaseService.episode.findMany.mockResolvedValue([])

      const result = await episodeService.findPaginated(1)

      expect(result.next).toBe('http://localhost:3000/episodes?page=2')
      expect(result.prev).toBeNull()
    })

    it('should return prev page URL when not on first page', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.episode.count.mockResolvedValue(40)
      mockDatabaseService.episode.findMany.mockResolvedValue([])

      const result = await episodeService.findPaginated(2)

      expect(result.prev).toBe('http://localhost:3000/episodes?page=1')
      expect(result.next).toBeNull()
    })
  })
})
