import { Inject, Injectable } from '@nestjs/common';
import { HttpClientService } from '../http-client/http-client.service';
import { Model } from 'mongoose';
import { MoveAverage } from './interfaces/move-average.interface';

@Injectable()
export class MoveAverageService {
  constructor(
    @Inject('MOVE_AVERAGE_MODEL')
    private maModel: Model<MoveAverage>,
    private readonly httpClientService: HttpClientService,
  ) {}

  async create(queryString) {
    const result = await this.moveAverage(queryString);
    const createRecord = new this.maModel(result);

    try {
      await createRecord.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
    return;
  }

  async moveAverage(queryString) {
    const result = await this.httpClientService.getTickerHistory(queryString);

    return this.avgPrice(result);
  }

  private avgPrice(data) {
    let sumClosePrice = 0;

    data.forEach((item) => {
      sumClosePrice += item[4];
    });

    return {
      date: new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      avg_price: sumClosePrice / data.length,
    };
  }
}
