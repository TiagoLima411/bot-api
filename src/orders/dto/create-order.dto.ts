import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  IOrder,
  SideEnum,
  TypeEnum,
  StateEnum,
} from '../interfaces/order.interface';

export class CreateOrderDto implements IOrder {
  @IsOptional()
  @IsString()
  readonly sn: string;

  @IsOptional()
  @IsString()
  readonly client_order_id: string;

  @IsOptional()
  @IsString()
  readonly market_symbol: string;

  @IsOptional()
  @IsEnum(SideEnum)
  readonly side: typeof SideEnum;

  @IsOptional()
  @IsEnum(TypeEnum)
  readonly type: typeof TypeEnum;

  @IsOptional()
  @IsEnum(StateEnum)
  readonly state: typeof StateEnum;

  @IsOptional()
  @IsString()
  readonly price: string;

  @IsOptional()
  @IsString()
  readonly price_avg: string;

  @IsOptional()
  @IsString()
  readonly quantity: string;

  @IsOptional()
  @IsString()
  readonly quantity_executed: string;

  @IsOptional()
  @IsString()
  readonly instant_amount: string;

  @IsOptional()
  @IsString()
  readonly instant_amount_executed: string;

  @IsOptional()
  @IsString()
  readonly created_at: string;

  @IsOptional()
  @IsNumber()
  readonly trades_count: number;
}
