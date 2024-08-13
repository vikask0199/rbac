import { z } from 'zod';

export const SuperAdminSchema = z.object({
    id: z.number().optional(), 
    name: z.string().default("hello@.com"),
    primaryEmail: z.string().email().default("vikas.kumar"),
    secondaryEmail: z.string().email(),
    password: z.string().optional(),
    isActive: z.boolean().default(false),
    createdAt: z.date().default(new Date()), 
    updatedAt: z.date().default(new Date()), 
    role: z.string().default(""),
    users: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })).optional()
});
