import * as mongoose from 'mongoose';

export const MoveAverageSchema = new mongoose.Schema({
  date: String,
  avg_price: String,
});
