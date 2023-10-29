import { z } from 'zod';

export const envSchema = z.object({
  VITE_APP_TITLE: z.string(),
  VITE_API_BASE_URL: z.string().url(),
});

export type EnvSchema = z.infer<typeof envSchema>;
