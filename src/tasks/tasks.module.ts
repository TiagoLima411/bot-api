import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { MoveAverageModule } from '../move-average/move-average.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [MoveAverageModule, OrdersModule],
  providers: [TasksService],
})
export class TasksModule {}
