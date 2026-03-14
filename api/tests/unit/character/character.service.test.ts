import { Test } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'
import { NotFoundException } from '@nestjs/common'

import { CharacterService } from '@/src/modules/character/character.service'
import { DatabaseService } from '@/src/modules/database/database.service'
import { CharacterObjectMother } from './character-mother'

describe('CharacterService', () => {
  let characterService: CharacterService

  const mockDatabaseService = {
    character: {
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
        CharacterService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: ConfigService, useValue: mockConfigService }
      ]
    }).compile()

    characterService = moduleRef.get<CharacterService>(CharacterService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create characters and return them', async () => {
      const character = CharacterObjectMother.create()
      mockDatabaseService.character.createManyAndReturn.mockResolvedValue([character])

      const result = await characterService.create(character)

      expect(result).toEqual([character])
      expect(mockDatabaseService.character.createManyAndReturn).toHaveBeenCalledWith({ data: character })
    })
  })

  describe('findOne', () => {
    it('should return a character when found', async () => {
      const character = CharacterObjectMother.create()
      mockDatabaseService.character.findUnique.mockResolvedValue(character)

      const result = await characterService.findOne(character.id)

      expect(result).toEqual(character)
      expect(mockDatabaseService.character.findUnique).toHaveBeenCalledWith({
        where: { id: character.id },
        include: { first_appearance_ep: true, first_appearance_sh: true }
      })
    })

    it('should return null when character not found', async () => {
      mockDatabaseService.character.findUnique.mockResolvedValue(null)

      const result = await characterService.findOne(999)

      expect(result).toBeNull()
    })
  })

  describe('findPaginated', () => {
    it('should return paginated characters from DB when cache is empty', async () => {
      const character = CharacterObjectMother.create()
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.character.count.mockResolvedValue(1)
      mockDatabaseService.character.findMany.mockResolvedValue([character])

      const result = await characterService.findPaginated(1)

      expect(result.count).toBe(1)
      expect(result.pages).toBe(1)
      expect(result.next).toBeNull()
      expect(result.prev).toBeNull()
      expect(result.results).toEqual([character])
    })

    it('should return cached count when available', async () => {
      const character = CharacterObjectMother.create()
      mockCacheManager.get.mockImplementation((key: string) => {
        if (key === 'character-count') return Promise.resolve(40)
        return Promise.resolve(null)
      })
      mockDatabaseService.character.findMany.mockResolvedValue([character])

      await characterService.findPaginated(1)

      expect(mockDatabaseService.character.count).not.toHaveBeenCalled()
    })

    it('should return next page URL when more pages exist', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.character.count.mockResolvedValue(40)
      mockDatabaseService.character.findMany.mockResolvedValue([])

      const result = await characterService.findPaginated(1)

      expect(result.next).toBe('http://localhost:3000/characters?page=2')
      expect(result.prev).toBeNull()
    })

    it('should return prev page URL when not on first page', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.character.count.mockResolvedValue(40)
      mockDatabaseService.character.findMany.mockResolvedValue([])

      const result = await characterService.findPaginated(2)

      expect(result.prev).toBe('http://localhost:3000/characters?page=1')
      expect(result.next).toBeNull()
    })

    it('should return empty results when page exceeds total pages', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.character.count.mockResolvedValue(20)

      const result = await characterService.findPaginated(99)

      expect(result.results).toEqual([])
      expect(result.next).toBeNull()
      expect(result.prev).toBeNull()
    })

    it('should use cached first page results', async () => {
      const character = CharacterObjectMother.create()
      mockCacheManager.get.mockImplementation((key: string) => {
        if (key === 'character-count') return Promise.resolve(20)
        if (key === 'character-first-page') return Promise.resolve([character])
        return Promise.resolve(null)
      })

      const result = await characterService.findPaginated(1)

      expect(result.results).toEqual([character])
      expect(mockDatabaseService.character.findMany).not.toHaveBeenCalled()
    })
  })
})
