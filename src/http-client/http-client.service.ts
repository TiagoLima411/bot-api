import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto-js';
import { uuid } from 'uuidv4';

@Injectable()
export class HttpClientService {
  config = new ConfigService();
  constructor(private readonly client: HttpService) {}

  async fetch(url: string) {
    try {
      const result = await this.client.get(url).toPromise();
      return result.data;
    } catch (err) {
      throw err;
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
    const body = JSON.stringify(op.body);
    const prehash = `${timestamp}${op.method}${op.url}${op.query_param}${op.query_string}${body}`;

    const result = await crypto.HmacSHA256(prehash, secret).toString();

    return result;
  }
}
