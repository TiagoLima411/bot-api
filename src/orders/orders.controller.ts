import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
  ): Promise<any> {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Orders> {
    return this.ordersService.findAll();
  }
}
