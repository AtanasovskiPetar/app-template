import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '../db/schema';
import { DrizzleAsyncProvider } from '../drizzle.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.db
      .select()
      .from(schema.UsersTable)
      .where(eq(schema.UsersTable.email, email))
      .then((res) => res[0]);

    if (user && user.password && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  login(user: any) {
    const payload = {
      email: user.email,
      role: user.role,
      name: user.name,
      provider: user.provider,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
