import { BadRequestException } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '@/src/common/pipes/zod-validation.pipe'

const testSchema = z.object({
  name: z.string(),
  age: z.number().int().positive()
})

describe('ZodValidationPipe', () => {
  let pipe: ZodValidationPipe

  beforeEach(() => {
    pipe = new ZodValidationPipe(testSchema)
  })

  it('should return parsed value when input is valid', () => {
    const input = { name: 'Homer', age: 39 }
    expect(pipe.transform(input)).toEqual(input)
  })

  it('should throw BadRequestException when input fails Zod validation', () => {
    const input = { name: 'Homer', age: -1 }
    expect(() => pipe.transform(input)).toThrow(BadRequestException)
  })

  it('should throw BadRequestException when required field is missing', () => {
    const input = { age: 39 }
    expect(() => pipe.transform(input)).toThrow(BadRequestException)
  })

  it('should throw BadRequestException when field has wrong type', () => {
    const input = { name: 'Homer', age: 'thirty-nine' }
    expect(() => pipe.transform(input)).toThrow(BadRequestException)
  })

  it('should throw BadRequestException with Zod issues when schema fails', () => {
    try {
      pipe.transform({ name: 123, age: 'bad' })
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException)
    }
  })
})
