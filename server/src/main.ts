import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function start() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configuration().PORT);
}
start();
