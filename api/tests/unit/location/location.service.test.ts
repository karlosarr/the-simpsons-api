import { Test } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

import { LocationService } from '@/src/modules/location/location.service'
import { DatabaseService } from '@/src/modules/database/database.service'
import { LocationObjectMother } from './location-mother'

describe('LocationService', () => {
  let locationService: LocationService

  const mockDatabaseService = {
    location: {
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
        LocationService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: ConfigService, useValue: mockConfigService }
      ]
    }).compile()

    locationService = moduleRef.get<LocationService>(LocationService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create locations and return them', async () => {
      const location = LocationObjectMother.create()
      mockDatabaseService.location.createManyAndReturn.mockResolvedValue([location])

      const result = await locationService.create(location)

      expect(result).toEqual([location])
      expect(mockDatabaseService.location.createManyAndReturn).toHaveBeenCalledWith({ data: location })
    })
  })

  describe('findOne', () => {
    it('should return a location when found', async () => {
      const location = LocationObjectMother.create()
      mockDatabaseService.location.findUnique.mockResolvedValue(location)

      const result = await locationService.findOne(location.id)

      expect(result).toEqual(location)
      expect(mockDatabaseService.location.findUnique).toHaveBeenCalledWith({
        where: { id: location.id },
        include: { first_appearance_sh: true, first_appearance_ep: true }
      })
    })

    it('should return null when location not found', async () => {
      mockDatabaseService.location.findUnique.mockResolvedValue(null)

      const result = await locationService.findOne(999)

      expect(result).toBeNull()
    })
  })

  describe('findPaginated', () => {
    it('should return paginated locations from DB when cache is empty', async () => {
      const location = LocationObjectMother.create()
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.location.count.mockResolvedValue(1)
      mockDatabaseService.location.findMany.mockResolvedValue([location])

      const result = await locationService.findPaginated(1)

      expect(result.count).toBe(1)
      expect(result.pages).toBe(1)
      expect(result.next).toBeNull()
      expect(result.prev).toBeNull()
      expect(result.results).toEqual([location])
    })

    it('should use cached count and skip DB count query', async () => {
      const location = LocationObjectMother.create()
      mockCacheManager.get.mockResolvedValue(20)
      mockDatabaseService.location.findMany.mockResolvedValue([location])

      await locationService.findPaginated(1)

      expect(mockDatabaseService.location.count).not.toHaveBeenCalled()
    })

    it('should cache the count after first DB query', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.location.count.mockResolvedValue(10)
      mockDatabaseService.location.findMany.mockResolvedValue([])

      await locationService.findPaginated(1)

      expect(mockCacheManager.set).toHaveBeenCalledWith('location-count', 10, expect.any(Number))
    })

    it('should return next page URL when more pages exist', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.location.count.mockResolvedValue(40)
      mockDatabaseService.location.findMany.mockResolvedValue([])

      const result = await locationService.findPaginated(1)

      expect(result.next).toBe('http://localhost:3000/locations?page=2')
      expect(result.prev).toBeNull()
    })

    it('should return prev page URL when not on first page', async () => {
      mockCacheManager.get.mockResolvedValue(null)
      mockDatabaseService.location.count.mockResolvedValue(40)
      mockDatabaseService.location.findMany.mockResolvedValue([])

      const result = await locationService.findPaginated(2)

      expect(result.prev).toBe('http://localhost:3000/locations?page=1')
      expect(result.next).toBeNull()
    })
  })
})
