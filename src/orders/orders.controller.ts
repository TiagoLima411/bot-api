import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: any): Promise<any> {
    return await this.ordersService.create(createPlayerDto);
  }

  @Get()
  async getPlayers(): Promise<any> {
    return this.ordersService.findAll();
  }
}
