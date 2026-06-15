import { z } from 'zod';
import { DEFAULT_LIMIT, MAX_LIMIT } from '../config';

export const paginationSchema = z.object({
  limit: z
    .string()
    .transform(val => (val ? Number(val) : DEFAULT_LIMIT))
    .refine(val => !isNaN(val) && val > 0, { message: 'limit must be a positive number' })
    .refine(val => val <= MAX_LIMIT, { message: `limit cannot exceed ${MAX_LIMIT}` })
    .default(String(DEFAULT_LIMIT))
    .transform(val => typeof val === 'string' ? Number(val) : val),

  offset: z
    .string()
    .transform(val => (val ? Number(val) : 0))
    .refine(val => !isNaN(val) && val >= 0, { message: 'offset must be a non-negative number' })
    .default('0')
    .transform(val => typeof val === 'string' ? Number(val) : val),

  page: z
    .string()
    .transform(val => (val ? Number(val) : 1))
    .refine(val => !isNaN(val) && val > 0, { message: 'page must be a positive number' })
    .default('1')
    .transform(val => typeof val === 'string' ? Number(val) : val),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
