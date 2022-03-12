import { Document } from 'mongoose';

export const SideEnum = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export const TypeEnum = {
  MARKET: 'MARKET',
  LIMIT: 'LIMIT',
  STOP_MARKET: 'STOP_MARKET',
  INSTANT: 'INSTANT',
};

export const StateEnum = {
  ACTIVE: 'ACTIVE',
  PARTIALLY_FILLED: 'PARTIALLY_FILLED',
  FILLED: 'FILLED',
  PARTIALLY_CANCELED: 'PARTIALLY_CANCELED',
  CANCELED: 'CANCELED',
};

export interface Order extends Document {
  readonly sn: string;
  readonly client_order_id: string;
  readonly market_symbol: string;
  readonly side: typeof SideEnum;
  readonly type: typeof TypeEnum;
  readonly state: typeof StateEnum;
  readonly price: string;
  readonly price_avg: string;
  readonly quantity: string;
  readonly quantity_executed: string;
  readonly instant_amount: string;
  readonly instant_amount_executed: string;
  readonly created_at: string;
  readonly trades_count: number;
}
