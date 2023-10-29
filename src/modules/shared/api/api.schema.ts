/**
 * This is for dummyjson API
 */

import { z } from 'zod';

export const errorApiResponseSchema = z.object({
  message: z.string(),
});

export const resourceParamsSchema = z.object({
  limit: z.number().optional(),
  skip: z.number().optional(),
  select: z.string().optional(),
});

export const resourceListSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ErrorApiResponseSchema = z.infer<typeof errorApiResponseSchema>;
export type ResourceParamsSchema = z.infer<typeof resourceParamsSchema>;
export type ResourceListSchema = z.infer<typeof resourceListSchema>;
