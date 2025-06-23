import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './db/schema';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: (config: ConfigService): NodePgDatabase<typeof schema> => {
      const pool = new Pool({
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        database: config.get('DB_NAME'),
        user: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
      });

      pool
        .connect()
        .then((client) => {
          client.release();
          Logger.log('Database connection established', 'Drizzle');
        })
        .catch((err) => {
          Logger.error('❌ Failed to connect to the database', err, 'Drizzle');
          throw err;
        });

      return drizzle(pool, { schema });
    },
  },
];
