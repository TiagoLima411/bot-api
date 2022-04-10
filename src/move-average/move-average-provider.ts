import { Connection } from 'mongoose';
import { MoveAverageSchema } from './schemas/move-average.schema';

export const moveAverageProviders = [
  {
    provide: 'MOVE_AVERAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('MoveAverage', MoveAverageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
