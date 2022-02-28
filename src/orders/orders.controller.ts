import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createPlayer(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async getPlayers(): Promise<any> {
    return this.ordersService.findAll();
  }
}
