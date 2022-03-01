import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto-js';

const configService = new ConfigService();
@Injectable()
export class SignatureService {
  async create(req: any) {
    const secret = configService.get<string>('API_SECRET');
    const timestamp = Date.now();

    const prehash = `${timestamp}${req.method}${req.url}${req.query}${req.body}`;

    return await crypto.HmacSHA256(prehash, secret).toString();
  }
}
