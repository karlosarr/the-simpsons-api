import { Short as ShortModel } from '@prisma/client'
import { faker } from '@faker-js/faker'

export class ShortObjectMother {
  static create(overrides: Partial<ShortModel> = {}): ShortModel {
    return {
      id: faker.number.int(),
      airdate: faker.date.past().toISOString(),
      description: faker.lorem.paragraph(),
      episode_number: faker.number.int({ min: 1, max: 9999 }),
      image_path: faker.image.url(),
      name: faker.lorem.words(3),
      season: faker.number.int({ min: 1, max: 35 }),
      synopsis: faker.lorem.paragraph(),
      ...overrides
    }
  }
}
