import { Document } from 'mongoose';

export interface Order extends Document {
  readonly sn: string;
  readonly client_order_id: string;
  readonly market_symbol: string;
  readonly side: string;
  readonly type: string;
  readonly state: string;
  readonly price: string;
  readonly price_avg: string;
  readonly quantity: string;
  readonly quantity_executed: string;
  readonly instant_amount: string;
  readonly instant_amount_executed: string;
  readonly created_at: string;
  readonly trades_count: number;
}
