import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { OrdersModule } from './orders/orders.module';
import { MoveAverageModule } from './move-average/move-average.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.test', '.env'],
    }),
    ScheduleModule.forRoot(),
    HealthModule,
    OrdersModule,
    MoveAverageModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
