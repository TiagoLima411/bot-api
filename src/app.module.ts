import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [HealthModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
