import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  await app.listen(
    configService.get<number>('PORT') || 3000,
    configService.get<string>('SERVER_ADDR' || null),
  );

  console.log(`Aplication is running on: ${await app.getUrl()}`);
}
bootstrap();
