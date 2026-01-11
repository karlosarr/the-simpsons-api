import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import helmet from '@fastify/helmet'
import { AppModule } from './app.module.js'

let app: NestFastifyApplication

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

    app.enableCors({
      origin: '*',
      preflightContinue: false,
      optionsSuccessStatus: 200,
      methods: ['GET', 'HEAD', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    })

    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.setGlobalPrefix('api')

    await app.register(helmet, {
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginEmbedderPolicy: false
    })

    await app.init()
  }
  return app
}

export default async (req: any, res: any) => {
  const app = await bootstrap()
  const instance = app.getHttpAdapter().getInstance()

  await instance.ready()
  instance.server.emit('request', req, res)
}
