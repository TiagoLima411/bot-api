import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto-js';
import { uuid } from 'uuidv4';

@Injectable()
export class HttpClientService {
  config = new ConfigService();
  constructor(private readonly client: HttpService) {}

  async fetch(op: any) {
    const basePath = this.config.get<string>('BASE_PATH');
    const path = `${op.url}${op.query_param}${op.query_string}`;
    const fullPath = `${basePath}${path}`;

    const headers = await this.buildHeaders(op);

    try {
      const result = await this.client.get(fullPath, headers).toPromise();
      return result.data;
    } catch (err) {
      throw new BadRequestException(err.response.data);
    }
  }

  async post(op: any) {
    const basePath = this.config.get<string>('BASE_PATH');
    const path = `${op.url}${op.query_param}${op.query_string}`;
    const fullPath = `${basePath}${path}`;

    const headers = await this.buildHeaders(op);

    try {
      const result = await this.client
        .post(fullPath, op.body, headers)
        .toPromise();

      return result;
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async getTickerHistory(queryString) {
    const basePath = 'https://api.foxbit.com.br:8443/AP/GetTickerHistory';
    const fullPath = `${basePath}${queryString}`;
    const result = await this.client.get(fullPath).toPromise();

    return result.data;
  }

  private async buildHeaders(options) {
    const timestamp = new Date().getTime();
    const signature = await this.buildSignature(options, timestamp);

    return {
      headers: {
        'x-fb-access-key': this.config.get<string>('API_KEY'),
        'x-fb-access-signature': signature,
        'x-fb-access-timestamp': timestamp,
        'x-idempotent': uuid(),
      },
    };
  }

  private async buildSignature(op, timestamp) {
    const secret = this.config.get<string>('API_SECRET');
    const body = op.body !== '' ? JSON.stringify(op.body) : '';
    const prehash = `${timestamp}${op.method}${op.url}${op.query_param}${op.query_string}${body}`;

    const result = await crypto.HmacSHA256(prehash, secret).toString();

    return result;
  }
}
