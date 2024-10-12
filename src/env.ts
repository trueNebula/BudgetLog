import { z } from 'zod';

type TEnvSchema = {
  [key: string]: z.ZodType;
};

type TEnv = {
  NODE_ENV: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  DATABASE_URL: string;

  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
};

function validateEnv(env: { server: TEnvSchema; client: TEnvSchema }) {
  const { server } = env;
  const { client } = env;
  const exposedVars = {} as TEnv;

  const serverVars = Object.keys(server);
  const clientVars = Object.keys(client);

  const isServer = typeof window === 'undefined';

  if (isServer) {
    serverVars.forEach((key) => {
      const zodSchema = server[key as keyof TEnv];
      const value = process.env[key];

      if (!value) {
        throw new Error(`Missing environment variable "${key}"`);
      }

      if (!zodSchema) {
        throw new Error(`Invalid environment variable "${key}"`);
      }

      if (zodSchema.safeParse(value).success === false) {
        throw new Error(
          `Invalid environment variable "${key}": ${value} does not match ${zodSchema.description}`,
        );
      }

      exposedVars[key as keyof TEnv] = value;
    });
  } else {
    clientVars.forEach((key) => {
      const zodSchema = client[key];
      const value = process.env[key];

      if (!value) {
        throw new Error(`Missing environment variable "${key}"`);
      }

      if (zodSchema.safeParse(value).success === false) {
        throw new Error(
          `Invalid environment variable "${key}": ${value} does not match ${zodSchema.description}`,
        );
      }

      exposedVars[key as keyof TEnv] = value;
    });
  }

  return exposedVars as TEnv;
}

export const env = validateEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    DATABASE_URL: z.string().url(),

    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
  },
  client: {},
});
