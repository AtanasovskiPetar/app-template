import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3010'],
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001, () => {
    Logger.log(
      `Server started on ${process.env.PORT ?? 3001}`,
      'NestApplication',
    );
  });
}

void bootstrap();
