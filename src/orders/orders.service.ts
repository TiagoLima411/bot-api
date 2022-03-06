import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './dto/orders.dto';
import { HttpClientService } from '../http-client/http-client.service';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {
  configService = new ConfigService();
  basePath = this.configService.get<string>('BASE_PATH');
  url = `${this.basePath}/orders`;

  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
    private readonly httpClientService: HttpClientService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    const result = await this.httpClientService.post({
      method: 'POST',
      url: '/rest/v3/orders',
      query_param: '',
      query_string: '',
      body: createOrderDto,
    });

    const createdCat = new this.orderModel(createOrderDto);
    return createdCat.save();
  }

  async findAll(): Promise<Orders> {
    const result = await this.orderModel.find().exec();
    return { data: result };
  }
}
