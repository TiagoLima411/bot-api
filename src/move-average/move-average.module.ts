import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoveAverageService } from './move-average.service';
import { HttpClientModule } from '../http-client/http-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    HttpClientModule,
  ],
  providers: [MoveAverageService],
  exports: [MoveAverageService],
})
export class MoveAverageModule {}
