import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  role: text('role').default('user'),
  provider: text('provider').default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});
