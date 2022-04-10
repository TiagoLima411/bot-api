import { Module } from '@nestjs/common';
import { MoveAverageModule } from '../move-average/move-average.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [MoveAverageModule],
  providers: [TasksService],
})
export class TasksModule {}
