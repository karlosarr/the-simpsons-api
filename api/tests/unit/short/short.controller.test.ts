import { Test } from '@nestjs/testing'
import { Short as ShortModel } from '@prisma/client'

import { ShortController } from '@/src/modules/short/short.controller'
import { ShortService } from '@/src/modules/short/short.service'
import { ShortObjectMother } from './short-mother'

describe('ShortController', () => {
  let shortController: ShortController

  const mockShortService = {
    create: vi.fn()
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ShortController],
      providers: [
        {
          provide: ShortService,
          useValue: mockShortService
        }
      ]
    }).compile()

    shortController = moduleRef.get<ShortController>(ShortController)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('createMany', () => {
    it('should call the service to create shorts', async () => {
      const short = ShortObjectMother.create()
      const result: ShortModel[] = [short]

      mockShortService.create.mockResolvedValue(result)

      const response = await shortController.createMany(short)
      expect(response).toEqual(result)
      expect(mockShortService.create).toHaveBeenCalledWith(short)
    })

    it('should return empty array when no shorts created', async () => {
      mockShortService.create.mockResolvedValue([])

      const response = await shortController.createMany([])
      expect(response).toEqual([])
    })
  })
})
