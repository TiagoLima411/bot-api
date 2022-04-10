import { Document } from 'mongoose';

export interface MoveAverage extends Document {
  readonly date: string;
  readonly avg_price: string;
}
