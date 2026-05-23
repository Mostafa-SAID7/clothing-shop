import { z } from 'zod';
import { DEFAULT_LIMIT, MAX_LIMIT } from '../config';

export const paginationSchema = z.object({
  limit: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : DEFAULT_LIMIT))
    .refine(val => !isNaN(val) && val > 0, { message: 'limit must be a positive number' })
    .refine(val => val <= MAX_LIMIT, { message: `limit cannot exceed ${MAX_LIMIT}` })
    .optional()
    .default(DEFAULT_LIMIT),

  offset: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : 0))
    .refine(val => !isNaN(val) && val >= 0, { message: 'offset must be a non-negative number' })
    .optional()
    .default(0),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
