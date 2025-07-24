import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import * as nock from 'nock'
import request from 'supertest'
import { Character } from '@prisma/client'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '@/src/app.module'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'

describe('App', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
    nock.disableNetConnect()
    nock.enableNetConnect('127.0.0.1')
  })

  afterEach(() => {
    nock.cleanAll()
  })

  afterAll(async () => {
    await app.close()
    nock.enableNetConnect()
  })

  describe('/health', () => {
    it('/GET - should return 200', async () => {
      const response = await request(app.getHttpServer()).get('/health')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ status: 'ok' })
    })
  })

  describe('/characters', () => {
    describe('GET', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/characters')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.results[0]).toHaveProperty('id')
        expect(body.count).toBeGreaterThan(0)
        expect(body.pages).toBeGreaterThan(0)
      })

      it('should return 200 with a query', async () => {
        const page = 2
        const response = await request(app.getHttpServer()).get(`/characters?page=${page}`)
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.next).toContain(`page=${page + 1}`)
        expect(body.prev).toContain(`page=${page - 1}`)
      })

      it('should return page 1 with a bad query', async () => {
        const response = await request(app.getHttpServer()).get('/characters?page=test')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.prev).toBeNull()
        expect(body.results[0]).toHaveProperty('id')
        expect(body.next).toContain('page=2')
      })
    })

    describe('GET/:id', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/characters/1')
        const body = response.body as Character

        expect(response.status).toBe(200)
        expect(body).toHaveProperty('id')
      })

      it('should return 404 if id does not exist', async () => {
        const response = await request(app.getHttpServer()).get('/characters/0')

        expect(response.status).toBe(404)
      })

      it('should return 400 if id is not a number', async () => {
        const response = await request(app.getHttpServer()).get('/characters/test')

        expect(response.status).toBe(400)
      })
    })

    describe('POST', () => {
      it('should return an error if api key is missing', async () => {
        const response = await request(app.getHttpServer()).post('/characters')

        expect(response.status).toBe(401)
      })

      it('should return an error if api key is invalid', async () => {
        const response = await request(app.getHttpServer()).post('/characters').set('Authorization', 'Bearer 123')

        expect(response.status).toBe(401)
      })
    })
  })

  describe('/locations', () => {
    describe('GET', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/locations')
        const body = response.body as PaginationResponse<Location[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.results[0]).toHaveProperty('id')
        expect(body.count).toBeGreaterThan(0)
        expect(body.pages).toBeGreaterThan(0)
      })

      it('should return 200 with a query', async () => {
        const page = 2
        const response = await request(app.getHttpServer()).get(`/locations?page=${page}`)
        const body = response.body as PaginationResponse<Location[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.next).toContain(`page=${page + 1}`)
        expect(body.prev).toContain(`page=${page - 1}`)
      })

      it('should return page 1 with a bad query', async () => {
        const response = await request(app.getHttpServer()).get('/locations?page=test')
        const body = response.body as PaginationResponse<Location[]>

        expect(response.status).toBe(200)
        expect(body.prev).toBeNull()
        expect(body.results[0]).toHaveProperty('id')
        expect(body.next).toContain('page=2')
      })
    })

    describe('GET/:id', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/locations/1')
        const body = response.body as Location

        expect(response.status).toBe(200)
        expect(body).toHaveProperty('id')
      })

      it('should return 404 if id does not exist', async () => {
        const response = await request(app.getHttpServer()).get('/locations/0')

        expect(response.status).toBe(404)
      })

      it('should return 400 if id is not a number', async () => {
        const response = await request(app.getHttpServer()).get('/locations/test')

        expect(response.status).toBe(400)
      })
    })

    describe('POST', () => {
      it('should return an error if api key is missing', async () => {
        const response = await request(app.getHttpServer()).post('/locations')

        expect(response.status).toBe(401)
      })

      it('should return an error if api key is invalid', async () => {
        const response = await request(app.getHttpServer()).post('/locations').set('Authorization', 'Bearer 123')

        expect(response.status).toBe(401)
      })
    })
  })

  describe('/episodes', () => {
    describe('GET', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/episodes')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.results[0]).toHaveProperty('id')
        expect(body.count).toBeGreaterThan(0)
        expect(body.pages).toBeGreaterThan(0)
      })

      it('should return 200 with a query', async () => {
        const page = 2
        const response = await request(app.getHttpServer()).get(`/episodes?page=${page}`)
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.next).toContain(`page=${page + 1}`)
        expect(body.prev).toContain(`page=${page - 1}`)
      })

      it('should return page 1 with a bad query', async () => {
        const response = await request(app.getHttpServer()).get('/episodes?page=test')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.prev).toBeNull()
        expect(body.results[0]).toHaveProperty('id')
        expect(body.next).toContain('page=2')
      })
    })

    describe('GET/:id', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/episodes/1')
        const body = response.body as Character

        expect(response.status).toBe(200)
        expect(body).toHaveProperty('id')
      })

      it('should return 404 if id does not exist', async () => {
        const response = await request(app.getHttpServer()).get('/episodes/0')

        expect(response.status).toBe(404)
      })

      it('should return 400 if id is not a number', async () => {
        const response = await request(app.getHttpServer()).get('/episodes/test')

        expect(response.status).toBe(400)
      })
    })

    describe('POST', () => {
      it('should return an error if api key is missing', async () => {
        const response = await request(app.getHttpServer()).post('/episodes')

        expect(response.status).toBe(401)
      })

      it('should return an error if api key is invalid', async () => {
        const response = await request(app.getHttpServer()).post('/episodes').set('Authorization', 'Bearer 123')

        expect(response.status).toBe(401)
      })
    })
  })
})
