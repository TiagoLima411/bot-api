import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../http-client/http-client.service';

@Injectable()
export class MoveAverageService {
  constructor(private readonly httpClientService: HttpClientService) {}

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
