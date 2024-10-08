/* eslint-disable import/no-extraneous-dependencies */
import { env } from './src/env';
import { defineConfig } from 'drizzle-kit';

const url = env.DATABASE_URL;

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url,
  },
});
