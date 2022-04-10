import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoveAverageService } from './move-average.service';
import { HttpClientModule } from '../http-client/http-client.module';
import { moveAverageProviders } from './move-average-provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    HttpClientModule,
    DatabaseModule,
  ],
  providers: [MoveAverageService, ...moveAverageProviders],
  exports: [MoveAverageService],
})
export class MoveAverageModule {}
