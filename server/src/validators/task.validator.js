import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId format',
});

export const CreateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
  }),
});

export const UpdateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
});

export const CompleteTaskSchema = z.object({
  body: z.object({
    completed: z.boolean(),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
});

export const TaskListSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional(),
  }),
});
