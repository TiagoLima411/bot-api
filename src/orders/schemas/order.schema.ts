import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { StateEnum, TypeEnum } from '../interfaces/order.interface';

export const SideEnum = new mongoose.Schema({
  buy: String,
  sell: String,
});

export const OrderSchema = new mongoose.Schema({
  sn: String,
  client_order_id: String,
  market_symbol: String,
  side: { type: String, enum: ['BUY', 'SELL'] },
  type: { type: String, enum: ['MARKET', 'LIMIT', 'STOP_MARKET', 'INSTANT'] },
  state: {
    type: String,
    enum: [
      'ACTIVE',
      'PARTIALLY_FILLED',
      'FILLED',
      'PARTIALLY_CANCELED',
      'CANCELED',
    ],
  },
  price: String,
  price_avg: String,
  quantity: String,
  quantity_executed: String,
  instant_amount: String,
  instant_amount_executed: String,
  created_at: String,
  trades_count: Number,
});
