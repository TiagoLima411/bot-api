import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.get<number>('PORT') || 3000);

  console.log(`Aplication is running on: ${await app.getUrl()}`);
}
bootstrap();
