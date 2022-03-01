import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto, Order, Orders } from './dto/create-order.dto';
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
