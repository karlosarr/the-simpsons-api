import { ExecutionContext, UnauthorizedException } from '@nestjs/common'

import { ApiKeyGuard } from '@/src/common/guards/api-key.guard'

const makeContext = (authorization?: string): ExecutionContext => {
  const request = { headers: { authorization } }
  return {
    switchToHttp: () => ({ getRequest: () => request })
  } as unknown as ExecutionContext
}

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard
  const originalApiKey = process.env.API_KEY

  beforeEach(() => {
    guard = new ApiKeyGuard()
    process.env.API_KEY = 'test-api-key'
  })

  afterEach(() => {
    process.env.API_KEY = originalApiKey
  })

  it('should allow request with valid API key', () => {
    const ctx = makeContext('Bearer test-api-key')
    expect(guard.canActivate(ctx)).toBe(true)
  })

  it('should throw UnauthorizedException when Authorization header is missing', () => {
    const ctx = makeContext(undefined)
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException when Authorization header does not start with Bearer', () => {
    const ctx = makeContext('Basic test-api-key')
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException when API key is wrong', () => {
    const ctx = makeContext('Bearer wrong-key')
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException when Authorization header is empty string', () => {
    const ctx = makeContext('')
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException)
  })
})
