import { Test } from '@nestjs/testing'

import { ShortService } from '@/src/modules/short/short.service'
import { DatabaseService } from '@/src/modules/database/database.service'
import { ShortObjectMother } from './short-mother'

describe('ShortService', () => {
  let shortService: ShortService

  const mockDatabaseService = {
    short: {
      createManyAndReturn: vi.fn()
    }
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ShortService,
        { provide: DatabaseService, useValue: mockDatabaseService }
      ]
    }).compile()

    shortService = moduleRef.get<ShortService>(ShortService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create shorts and return them', async () => {
      const short = ShortObjectMother.create()
      mockDatabaseService.short.createManyAndReturn.mockResolvedValue([short])

      const result = await shortService.create(short)

      expect(result).toEqual([short])
      expect(mockDatabaseService.short.createManyAndReturn).toHaveBeenCalledWith({ data: short })
    })

    it('should return empty array when no shorts provided', async () => {
      mockDatabaseService.short.createManyAndReturn.mockResolvedValue([])

      const result = await shortService.create([])

      expect(result).toEqual([])
    })
  })
})
