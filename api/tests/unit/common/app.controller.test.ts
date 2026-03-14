import { Test } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

import { AppControler } from '@/src/app.controler'
import { ROUTES } from '@/src/common/consts/routes.consts'

describe('AppControler', () => {
  let appController: AppControler

  const mockConfigService = {
    get: vi.fn().mockReturnValue('http://localhost:3000')
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppControler],
      providers: [{ provide: ConfigService, useValue: mockConfigService }]
    }).compile()

    appController = moduleRef.get<AppControler>(AppControler)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllRoutes', () => {
    it('should return all routes with full URLs', () => {
      const result = appController.getAllRoutes()

      for (const route of ROUTES) {
        expect(result[route]).toBe(`http://localhost:3000/${route}`)
      }
    })

    it('should use APP_URL from config service', () => {
      mockConfigService.get.mockReturnValue('https://thesimpsonsapi.com')

      const result = appController.getAllRoutes()

      expect(mockConfigService.get).toHaveBeenCalledWith('APP_URL')
      for (const route of ROUTES) {
        expect(result[route]).toContain('https://thesimpsonsapi.com')
      }
    })

    it('should return an object with the same number of keys as ROUTES', () => {
      const result = appController.getAllRoutes()
      expect(Object.keys(result)).toHaveLength(ROUTES.length)
    })
  })
})
