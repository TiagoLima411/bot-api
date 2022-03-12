import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SideEnum, TypeEnum } from '../interfaces/order.interface';

export class CreateOrderDto {
  @IsEnum(SideEnum)
  readonly side: typeof SideEnum;

  @IsEnum(TypeEnum)
  readonly type: typeof TypeEnum;

  @IsString()
  readonly market_symbol: string;

  @IsOptional()
  @IsString()
  readonly client_order_id: string;

  @IsOptional()
  @IsString()
  readonly remark: string;

  @IsString()
  readonly quantity: string;

  @IsOptional()
  @IsString()
  readonly price: string;
}
