import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './dto/order.dto';
import { Orders } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createPlayer(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async getPlayers(): Promise<Orders> {
    return this.ordersService.findAll();
  }
}
