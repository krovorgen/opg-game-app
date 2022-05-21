import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { settings } from './helpers/settings';

async function start() {
  const app = await NestFactory.create(AppModule);
  await app.listen(settings.PORT);
}
start();
