import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto, Orders } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    console.log(createOrderDto);
    const createdCat = new this.orderModel(createOrderDto);
    return createdCat.save();
  }

  async findAll(): Promise<Orders> {
    const result = await this.orderModel.find().exec();
    return { data: result };
  }
}
