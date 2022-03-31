import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MoveAverageService } from '../move-average/move-average.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly averageService: MoveAverageService) {}

  @Cron('0 59 23 * * 0-6')
  async handleCron() {
    this.logger.debug(`Time the job was called: ${new Date().toISOString()}`);

    const endTime = `${new Date().toISOString().slice(0, 11)}00:00:00`;
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);
    const startTime = `${fromDate.toISOString().slice(0, 11)}00:00:00`;

    const result = await this.averageService.moveAverage(
      `?InstrumentId=1&Interval=86400&FromDate=${startTime}&ToDate=${endTime}`,
    );

    this.logger.log('startTime: ', startTime);
    this.logger.log('endTime', endTime);
    this.logger.log(result);
    this.logger.debug(`Time the job ended: ${new Date().toISOString()}`);
  }
}
