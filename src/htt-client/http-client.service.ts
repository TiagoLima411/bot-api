import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly client: HttpService) {}

  async fetch(url: string) {
    try {
      const result = await this.client.get(url).toPromise();
      return result.data;
    } catch (err) {
      throw err;
    }
  }
}
