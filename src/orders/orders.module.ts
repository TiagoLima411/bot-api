import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ordersProviders } from './orders.provider';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HttpClientModule } from '../http-client/http-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    HttpClientModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders],
  exports: [OrdersService],
})
export class OrdersModule {}
