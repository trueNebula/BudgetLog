import { env } from '@/env.ts';
import postgres from 'postgres';
import * as schema from './schema.ts';
import { drizzle } from 'drizzle-orm/postgres-js';

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const url = env.DATABASE_URL;

const conn = globalForDb.conn ?? postgres(url, { prepare: false });
if (env.NODE_ENV !== 'production') {
  globalForDb.conn = conn;
}

export const db = drizzle(conn, { schema });
