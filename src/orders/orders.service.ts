import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './dto/orders.dto';
import { HttpClientService } from '../http-client/http-client.service';
import { ConfigService } from '@nestjs/config';

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

    setTimeout(async () => {
      const order = await this.httpClientService.fetch({
        method: 'GET',
        url: '/rest/v3/orders',
        query_param: `/${result.data.sn}`,
        query_string: '',
        body: '',
      });

      const createdOrder = new this.orderModel(order);
      try {
        await createdOrder.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }, 1000);

    return { message: `${result.data.sn} order is being processed.` };
  }

  async findAll(): Promise<Orders> {
    const result = await this.orderModel.find().exec();
    return { data: result };
  }
}
