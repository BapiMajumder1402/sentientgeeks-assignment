import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }).min(1, 'Name is required'),

        email: z.string({
            required_error: 'Email is required',
        }).email('Invalid email'),

        password: z.string({
            required_error: 'Password is required',
        }).min(6, 'Password must be at least 6 characters'),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }).email('Invalid email'),

        password: z.string({
            required_error: 'Password is required',
        }).min(6, 'Password must be at least 6 characters'),
    }),
});
