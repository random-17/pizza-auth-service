import z from 'zod';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const envSchema = z.object({
  NODE_ENV: z.enum(['prod', 'dev', 'test']).default('dev'),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().trim().min(1),
});

export const env = Object.freeze(envSchema.parse(process.env));
