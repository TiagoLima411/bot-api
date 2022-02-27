import { IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
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
  @IsString()
  readonly side: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly state: string;

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
  @IsString()
  readonly trades_count: number;
}
