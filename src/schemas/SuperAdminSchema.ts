import { z } from 'zod';
import { isValidName } from '../utils/zodHelper';

export const SuperAdminSchema = z.object({
    id: z.number().optional(),
    name: z.string().refine(isValidName, {
        message: "Name must only contain alphabets and spaces"
    }),
    primaryEmail: z.string().email(),
    secondaryEmail: z.string().email(),
    password: z.string().optional(),
    isActive: z.boolean().default(false),
    createdAt: z.date().default(new Date()), 
    updatedAt: z.date().default(new Date()), 
    role: z.string().default("SuperAdmin"),
    users: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })).optional()
}).strict();



export const SuperAdminUpdateSchema = z.object({
    name: z.string().optional(),
    primaryEmail: z.string().email().optional(),
    secondaryEmail: z.string().email().optional()
}).strict();