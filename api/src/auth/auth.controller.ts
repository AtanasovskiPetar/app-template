import { Controller, Get, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle.provider';

import * as schema from '../db/schema';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  @Get()
  async getUsers() {
    return await this.db.select().from(schema.asset);
  }
}
