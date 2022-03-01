import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto-js';

const configService = new ConfigService();
@Injectable()
export class SignatureService {
  async create(req: any) {
    const secret = configService.get<string>('API_SECRET') || 'API_SECRET';
    const timestamp = Date.now();
    const query = req.query || '';
    const body = req.body || '';

    const prehash = `${timestamp}${req.method}${req.url}${query}${body}`;
    console.log(prehash);
    console.log(secret);

    const result = await crypto.HmacSHA256(prehash, secret).toString();

    return result;
  }
}
