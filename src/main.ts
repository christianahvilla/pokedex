import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const API_PREFIX = 'api'
const VERSION_PREFIX = 'v2'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${API_PREFIX}/${VERSION_PREFIX}`);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
