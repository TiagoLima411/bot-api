import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  sn: String,
  client_order_id: String,
  market_symbol: String,
  side: String,
  type: String,
  state: String,
  price: String,
  price_avg: String,
  quantity: String,
  quantity_executed: String,
  instant_amount: String,
  instant_amount_executed: String,
  created_at: String,
  trades_count: Number,
});
