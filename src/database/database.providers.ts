import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(configService.get('CONNECTION_STRING')),
  },
];
