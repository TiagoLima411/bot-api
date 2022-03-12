import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.test', '.env'],
    }),
    HealthModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
