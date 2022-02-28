import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdCat = new this.orderModel(createOrderDto);
    return createdCat.save();
  }

  async findAll(): Promise<any> {
    const result = await this.orderModel.find().exec();
    return { data: result };
  }
}
