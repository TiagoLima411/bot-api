import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';

const config = new ConfigService();

@Injectable()
export class OrderInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const timestamp = new Date().getTime();

    req.headers['X-FB-ACCESS-KEY'] = config.get<string>('API_KEY');
    req.headers['X-FB-ACCESS-SIGNATURE'] = await this.buildSignature(
      req,
      timestamp,
    );
    req.headers['X-FB-ACCESS-TIMESTAMP'] = timestamp;

    return next.handle();
  }

  private async buildSignature(req, timestamp) {
    const secret = config.get<string>('API_SECRET');
    const query = '';
    const body = JSON.stringify(req.body);
    const method = 'POST';
    const url = '/rest/v3/orders';

    const prehash = `${timestamp}${method}${url}${query}${body}`;

    const result = crypto.HmacSHA256(prehash, secret).toString();

    return result;
  }
}
