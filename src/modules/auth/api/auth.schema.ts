import { z } from 'zod';

// #region SCHEMAS
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  expiresInMins: z.number().optional(),
});
export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// for dummyjson
export const loginApiResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.union([z.literal('male'), z.literal('female')]),
  image: z.string().url(),
  token: z.string(),
});
// #endregion

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type LoginApiResponseSchema = z.infer<typeof loginApiResponseSchema>;
